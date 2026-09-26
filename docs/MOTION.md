# Motion — what the reference does, what this port does, and what it costs

The first delivery shipped the page *visually* but with no motion: the port rendered
the captured DOM and nothing moved. A screenshot diff of a settled page cannot see
motion at all, which is why it did not show up as a defect. This document records the
motion pass: where each effect was read from, how it is implemented, how it is
verified, and the one place where turning motion on makes exact pixel parity
impossible **by design**.

## 1. Where the specs come from

None of this is approximated. Every constant was read out of the reference's own
shipped bundle (`reference/assets/next/*.js`, module 9763), and the offline copy is
JS-free, so the *initial* markup state is the reference's own pre-hydration markup.

| Effect | Reference implementation (verbatim) |
|---|---|
| Damped scroll | `new Lenis({duration: 1.1, easing: t => 1 - Math.pow(1 - t, 3), smoothWheel: true})` + rAF loop, skipped entirely under `prefers-reduced-motion`. Version pinned in the bundle: **lenis 1.3.26**. In-page `#anchor` clicks are routed through `lenis.scrollTo(el, {offset: -headerHeight})` using `--site-header-height`. |
| Text line reveal | `[data-animated-text-mask]` → first child set to `translateY(110%)` / `opacity 0`; stagger = `70ms × index within the closest [data-text] group`; on intersect `transition: transform 900ms cubic-bezier(0.16,1,0.3,1) {delay}ms, opacity 450ms linear {delay}ms` → `translateY(0)` / `opacity 1`; `will-change` cleared after `900 + delay`; observer options `{rootMargin: '0px 0px -12% 0px', threshold: 0.1}`. |
| Counter roll | Rollers are `span.relative.inline-block.overflow-hidden`; the column is set to digit 0 on mount and animated to its real value with `transform 1400ms cubic-bezier(0.16,1,0.3,1) {delay}ms` when it intersects (`{rootMargin: '0px 0px -10% 0px', threshold: 0.4}`), delay = `90ms × sibling index`. Clock / `#clients` / `#testimonials` rollers are excluded — they have their own drivers. |
| Hero coin | The markup carries one frame of the rotation; the reference clears the inline transform and lets `animate-hero-logo-coin 20s infinite` run. `initHeroCoin` does the same for **every** `.transform-3d.origin-center` (so the header brand mark spins too). |
| Marquee | pure CSS `marqyL 12.8s`. |
| `#clients` panel | Active step follows the viewport centre: `best = argmin |centre(button) - innerHeight/2|`, sets `text-theme-bg` / `scale-y-100` on the active one, translates the caption strip `translateY(-N em)` and rolls its counters. |
| Mobile menu | Hamburger to two rotated bars, label roller `translateY(-1em)` → "Close", scroll lock via `lenis-stopped`, links staggered `120ms` / `190ms`. |
| Theme toggle | `document.startViewTransition` with a `theme-sweep-ltr` class. |

## 2. Implementation

`app/src/lib/motion.ts`, installed per route by `initRouteMotion()` (called from
`App.tsx`), in the reference's own order: smooth scroll → masks → counters →
`#clients` stages → testimonial gating → hero coin. Each installer returns a cleanup,
so route changes rebuild exactly the state a fresh reference page load would have.

Two deliberate derivations, both documented in `docs/PORT.md`:

- **Mobile menu open state** is derived from the closed markup (the capture only ever
  holds it closed). Not verified against the reference — declared as such.
- **`remember` / `restore`**: the pristine (pre-JS) inline style is snapshotted and
  written back once a transition finishes, so the settled DOM holds *the reference's
  own settled markup* rather than a lingering `translateY(0px)`. For the text masks
  this makes the end state byte-equal to the frozen baseline.

## 3. Verification — behaviour, not screenshots

Two behavioural harnesses, both committed, both reporting raw values:

```
python3 tools/verify_motion.py --root app/dist      # 22 checks
python3 tools/verify_counters.py --root app/dist    # 6 checks (1440 + 375)
```

`verify_motion.py` asserts the wheel is damped (≥34 distinct scroll positions, not an
instant jump), `html.lenis-*` classes appear while scrolling, below-fold lines start at
`translateY(110%)`/`opacity 0` with none hidden in view, the reveal transition string
is the reference's, the stagger is a 70ms multiple, the scrolled-to line settles
visible, the hero coin runs `20s infinite` with its inline rotation cleared, the
marquee runs `marqyL 12.8s`, the `#clients` stage tracks the viewport centre and
responds to clicks, the theme sweep runs, the menu rolls/rotates/locks, and
`prefers-reduced-motion` short-circuits all of it.

`verify_counters.py` walks the whole document and then asserts that every rendered
counter column shows the digit its `.invisible` sibling declares (and *rolled* through
intermediate frames to get there), and that no rendered `[data-animated-text-mask]`
line is still hidden.

### The defect this caught

The counters were **animating up and snapping back to 0**. Our port snapshotted each
column's inline style *after* forcing it to digit 0, and a `setTimeout(…, 1460ms)`
restored that snapshot — so the stats animated `0 → 5` and then jumped back to `0`.
The reference never restores anything.

Nothing else caught it. The pixel baseline is a pre-hydration render, so it holds the
correct digit; the difference simply looked like generic "drift". It was found by
classifying which elements were off, then probing the live state after a full scroll:
`4 countered, 0 wrong` before the fix read `shifted by 5em` after it. The fix is one
moved line — snapshot the pristine style *before* zeroing:

```ts
remember(roller.column);   // pristine state, BEFORE the counter is forced to zero
setRoller(roller, '0');
```

## 4. The parity boundary (the honest part)

The frozen reference copy has **no JavaScript**: it is a pre-hydration render. Once the
port hydrates, three things can no longer match it, and they are all cases where the
port is *more* correct than the baseline:

1. **The rotating brand marks.** The reference's own code clears the markup's baked
   rotation frame and animates it. The baseline therefore holds one frozen frame.
2. **The `#clients` panel.** The reference's server markup holds a pre-hydration
   default (`translateY(-5em)` caption, last step highlighted); its own `onScroll`
   sets stage 0 at the top. The port reproduces the live behaviour.
3. **Masks inside `display:none` responsive variants.** These can never intersect —
   in the reference either. Parity, not a defect; `verify_counters.py` restricts its
   check to *rendered* lines (`93/93` at 1440, `74/74` at 375).

Re-measured after the motion pass
(`python3 tools/replkit/sweep.py --config replkit.json --mode pixel <specs>`):

| Route | Viewport | Theme | differing px | identical | attribution |
|---|---|---|---|---|---|
| `/` | 1440 | light | 120 508 | 98.608% | 119 009 px = `#clients` panel (rows 6021–6860); ~1 480 px = header brand mark; 0 elsewhere |
| `/` | 375 | light | 39 429 | 98.739% | same causes |
| `/` | 1440 | dark | 120 531 | 98.634% | same |
| `/` | 375 | dark | 39 453 | 98.262% | same |
| `/portfolio` | 1440 | light | **296** | 99.959% | 148 px × 2 stitched bands = header brand mark only |
| `/list-token` | 1440 | light | **296** | 99.959% | identical count, same cause |

Two independent cross-checks pin the coin attribution: 148 px per stitched band × band
count reproduces both 296 (`/portfolio`, 1801 px tall → 2 bands) and ~1 480 (`/`, 9381
px tall → ~10 bands); and the residual pixels sit at x 12–180 / y 16–43, the header
mark's box. 95% of the `/` residual is on *flat* areas (gradient < 2), i.e. a solid
panel changing colour — not glyph anti-aliasing.

Geometry and computed styles move for the same declared reasons: 12 of 1403 elements
(`99.14%` at 1440, `99.57%` at 375, docHeight still identical at 9381 / 10207). After
the counter fix those 12 are exactly 4 hero-coin elements + 8 `#clients` caption
elements. Classify any run with:

```
python3 tools/classify_drift.py <ref.json> <cand.json>
```

**So the earlier "100.000% (0 px)" claim in `docs/VERIFICATION.md` is superseded.** It
was measured on a build with no motion. Exact parity against a pre-hydration baseline
and a working hero animation are mutually exclusive; the port chose parity of
*behaviour* plus a fully attributed, bounded pixel residual.

## 5. Not verified

- The **mobile menu open state** is derived, not captured.
- The `#clients` panel is verified at the scroll-top state and on click; its
  in-between states during a slow scroll are not sampled.
- Reveal *timing* is asserted structurally (transition string, delay multiples,
  intermediate counter frames) — not compared frame-by-frame against the live site.
- The `prefers-reduced-motion` path is verified to leave nothing hidden; it is not
  verified to be pixel-identical to the baseline (it should be, since it is the
  reference's own "do nothing" branch).
