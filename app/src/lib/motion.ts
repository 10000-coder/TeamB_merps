/**
 * Motion: a verbatim port of the reference's own client-side animation module.
 *
 * Everything here was recovered from the site's shipped bundle (Turbopack chunk
 * `0h3b5g8_u9es3.js`, module 9763 + the header's menu module 65617) rather than
 * invented. The reference drives all of it imperatively -- it mutates inline
 * styles from `useEffect`s -- so this module does the same, in the same order,
 * with the same numbers. Behaviour verified against the live site:
 *
 *   [data-animated-text-mask] 108 elements, 70ms stagger within a [data-text] group
 *   html.lenis                present on the live page  -> Lenis 1.3.26 smooth scroll
 *   hero coin                 class `animate-hero-logo-coin`, inline transform cleared
 *   #clients stage            index 0 at scroll top, nearest-to-viewport-centre
 *
 * One deliberate difference, and only in the SETTLED state: when a transition
 * finishes we restore the element's original inline style instead of leaving the
 * reference's `translateY(0)` / `transition: ...` behind. `translateY(0)` is the
 * identity transform, so this is visually identical, and it makes the settled DOM
 * byte-equal to the reference's own pre-animation markup (`transform:none`) --
 * which is what the offline reference copy, and therefore every measurement, sees.
 */
import Lenis from 'lenis';

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const TRANSFORM_700 = `transform 700ms ${EASE}`;

function prefersReduced(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * The inline style each element had BEFORE we touched it. The reference never
 * cleans up after itself; we restore this once a transition ends so the settled
 * DOM equals the reference's own server-rendered markup. A WeakMap (rather than a
 * closure) keeps this correct if an effect re-runs -- React's StrictMode invokes
 * effects twice in development, and the second pass must not capture the hidden
 * state written by the first.
 */
const pristine = new WeakMap<HTMLElement, string>();
function remember(el: HTMLElement) {
  if (!pristine.has(el)) pristine.set(el, el.getAttribute('style') ?? '');
}
function restore(el: HTMLElement) {
  el.setAttribute('style', pristine.get(el) ?? '');
}

/* ------------------------------------------------------------------ *
 * 1. Lenis smooth scroll + in-page anchors
 *    Reference: new Lenis({duration:1.1, easing:t=>1-(1-t)**3, smoothWheel:true})
 * ------------------------------------------------------------------ */
export function initSmoothScroll(): () => void {
  if (prefersReduced()) return () => {};

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
  });
  let raf = 0;
  const loop = (time: number) => {
    lenis.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  // The reference routes `#...` and `/#...` clicks through Lenis, offset by the
  // sticky header height so the target is not hidden underneath it.
  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element | null)?.closest?.('a[href]');
    const href = a?.getAttribute('href');
    if (!href) return;
    const hash = href.startsWith('#') ? href : href.startsWith('/#') ? href.slice(1) : null;
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target as HTMLElement, {
      offset: -(
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
        ) || 0
      ),
    });
  };
  document.addEventListener('click', onClick);

  return () => {
    document.removeEventListener('click', onClick);
    cancelAnimationFrame(raf);
    lenis.destroy();
  };
}

/* ------------------------------------------------------------------ *
 * 2. Masked line reveal -- the scroll-in text fade
 *    hidden: translateY(110%) / opacity 0
 *    shown:  transform 900ms EASE [delay]ms, opacity 450ms linear [delay]ms
 *    delay:  70ms x line index within the nearest [data-text] group
 *    IO:     rootMargin '0px 0px -12% 0px', threshold 0.1, unobserved after firing
 * ------------------------------------------------------------------ */
export function initTextMaskReveal(): () => void {
  const masks = Array.from(document.querySelectorAll<HTMLElement>('[data-animated-text-mask]'));
  if (!masks.length) return () => {};

  if (prefersReduced()) {
    masks.forEach((m) => {
      const line = m.firstElementChild as HTMLElement | null;
      if (!line) return;
      remember(m);
      line.style.transform = 'none';
      line.style.opacity = '1';
    });
    return () => {};
  }

  const seen = new Map<Element, number>();
  const info = new Map<HTMLElement, { line: HTMLElement; delay: number }>();

  masks.forEach((mask) => {
    const line = mask.firstElementChild as HTMLElement | null;
    if (!line) return;
    const group = mask.closest('[data-text]') ?? mask.parentElement ?? mask;
    const n = seen.get(group) ?? 0;
    seen.set(group, n + 1);

    remember(line);
    info.set(mask, { line, delay: n * 70 });
    line.style.transform = 'translateY(110%)';
    line.style.opacity = '0';
    line.style.willChange = 'transform, opacity';
  });

  const reveal = (target: Element) => {
    const rec = info.get(target as HTMLElement);
    if (!rec) return;
    const { line, delay } = rec;
    line.style.transition = `transform 900ms ${EASE} ${delay}ms, opacity 450ms linear ${delay}ms`;
    line.style.transform = 'translateY(0)';
    line.style.opacity = '1';
    window.setTimeout(() => {
      line.style.willChange = '';
      restore(line);          // identity transform == the reference's settled markup
    }, 900 + delay + 60);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
  );
  masks.forEach((m) => io.observe(m));
  return () => io.disconnect();
}

/* ------------------------------------------------------------------ *
 * 3. Digit rollers (the counters that roll up in the stats section)
 *    Each digit is a span holding a 0-9 column; animating = translateY(-Nem).
 *    IO: rootMargin '0px 0px -10% 0px', threshold 0.4
 *    transition: transform 1400ms EASE [90ms x sibling index]ms
 * ------------------------------------------------------------------ */
const ROLLER_SEL = 'span.relative.inline-block.overflow-hidden';

type Roller = { column: HTMLElement; value: string };

function buildRoller(el: HTMLElement): Roller | null {
  const column = el.querySelector<HTMLElement>(':scope > .absolute.top-0.flex.flex-col');
  if (!column) return null;
  const invisible = el.querySelector<HTMLElement>(':scope > .invisible');
  return { column, value: (invisible?.textContent ?? '').trim() };
}

function setRoller(r: Roller, value: string, transition?: string) {
  const n = Number.parseInt(value, 10);
  r.column.style.transition = transition ?? '';
  r.column.style.transform = Number.isNaN(n) ? 'none' : `translateY(-${n}em)`;
}

export function initCounters(): () => void {
  // The reference's count-up module skips rollers owned by the clock, the
  // "How it works" panel and the testimonials: those have their own drivers.
  const els = Array.from(document.querySelectorAll<HTMLElement>(ROLLER_SEL)).filter(
    (el) => !el.closest('time') && !el.closest('#clients') && !el.closest('#testimonials'),
  );
  if (!els.length) return () => {};

  const list = els
    .map((el) => ({ el, roller: buildRoller(el) }))
    .filter((r): r is { el: HTMLElement; roller: Roller } => r.roller !== null);
  if (!list.length || prefersReduced()) return () => {};

  const perParent = new Map<Element, number>();
  list.forEach(({ el, roller }) => {
    const parent = el.parentElement ?? el;
    const n = perParent.get(parent) ?? 0;
    perParent.set(parent, n + 1);
    roller.column.dataset.rollDelay = String(90 * n);
    // Snapshot the PRISTINE style BEFORE the counter is forced to zero. The
    // restore below writes this snapshot back, so capturing the zeroed state
    // would make the counter animate up and then snap back to 0. (The reference
    // never restores, so its settled markup keeps the value; restoring ours to
    // the pristine value keeps both the shown digit and the markup identical.)
    remember(roller.column);
    setRoller(roller, '0');
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const rec = list.find((r) => r.el === entry.target);
        if (!rec) return;
        const delay = rec.roller.column.dataset.rollDelay ?? '0';
        setRoller(rec.roller, rec.roller.value, `transform 1400ms ${EASE} ${delay}ms`);
        window.setTimeout(() => restore(rec.roller.column), 1400 + Number(delay) + 60);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.4 },
  );
  list.forEach(({ el }) => io.observe(el));
  return () => io.disconnect();
}

/* ------------------------------------------------------------------ *
 * 4. "How it works" panel: active stage follows the viewport centre
 *    and can be clicked. Rolls its own counters, swaps the stacked
 *    caption (translateY(-Nem)) and highlights the active button.
 * ------------------------------------------------------------------ */
export function initClientsStages(): () => void {
  const ul = document.querySelector('ul[aria-label="How it works"]');
  if (!ul) return () => {};
  const container = ul.closest('#clients') ?? document.body;
  const buttons = Array.from(ul.querySelectorAll<HTMLButtonElement>('li > button'));
  if (!buttons.length) return () => {};

  const pct = container.querySelector<HTMLElement>('[style*="600%"]');
  const total = pct?.childElementCount ?? buttons.length;

  const counters = Array.from(container.querySelectorAll<HTMLElement>('.font-mono.tabular-nums')).map(
    (el) => {
      el.dataset.stageCounter = '';
      return buildRoller(el);
    },
  );

  const stacks = Array.from(container.querySelectorAll<HTMLElement>('.relative.overflow-hidden'))
    .map((stack) => ({
      stack: stack.querySelector<HTMLElement>(':scope > .flex.flex-col'),
      srOnly: stack.querySelector<HTMLElement>(':scope > .sr-only'),
    }))
    .filter(
      (s): s is { stack: HTMLElement; srOnly: HTMLElement | null } =>
        s.stack !== null && s.stack.childElementCount === buttons.length,
    );
  stacks.forEach(({ stack }) => remember(stack));

  let current = -1;
  const setStage = (t: number) => {
    if (t === current) return;
    current = t;

    buttons.forEach((btn, i) => {
      const active = i === t;
      const first = btn.firstElementChild as HTMLElement | null;
      btn.classList.toggle('text-theme-bg', active);
      btn.classList.toggle('text-theme-fg', !active);
      first?.classList.toggle('scale-y-100', active);
      first?.classList.toggle('scale-y-0', !active);
    });

    if (pct) {
      pct.style.transition = `transform 800ms ${EASE}`;
      pct.style.transform = `translateY(-${(100 * t) / total}%)`;
    }

    counters.forEach((roller) => {
      if (roller) setRoller(roller, String(t + 1).padStart(roller.value.length, '0'), TRANSFORM_700);
    });

    const label = buttons[t]?.querySelector('h3')?.textContent?.trim() ?? '';
    stacks.forEach(({ stack, srOnly }) => {
      stack.style.transition = TRANSFORM_700;
      stack.style.transform = `translateY(-${t}em)`;
      if (srOnly) srOnly.textContent = label;
    });
  };

  const onScroll = () => {
    const mid = window.innerHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    buttons.forEach((btn, i) => {
      const r = btn.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setStage(best);
  };

  const onClick = buttons.map((btn, i) => {
    const fn = () => setStage(i);
    btn.addEventListener('click', fn);
    return () => btn.removeEventListener('click', fn);
  });

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  return () => {
    onClick.forEach((off) => off());
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

/* ------------------------------------------------------------------ *
 * 5. Hero logo coin: the inline rotation in the markup is one frame of a
 *    running animation, so it is cleared and the class animates it instead.
 * ------------------------------------------------------------------ */
export function initHeroCoin(): void {
  if (prefersReduced()) return;
  document.querySelectorAll<HTMLElement>('.transform-3d.origin-center').forEach((el) => {
    el.style.transform = '';
    el.classList.add('animate-hero-logo-coin');
  });
}

/* ------------------------------------------------------------------ *
 * 6. Testimonial arrows: disabled while there is only one slide.
 * ------------------------------------------------------------------ */
export function initTestimonialGating(): () => void {
  if (document.querySelectorAll('[data-testimonial]').length <= 1) {
    document.querySelectorAll<HTMLButtonElement>('button[aria-label$="testimonial"]').forEach((b) => {
      b.disabled = true;
    });
  }
  return () => {};
}

/* ------------------------------------------------------------------ *
 * 7. Mobile menu: the reference mutates the hamburger imperatively, and
 *    locks scrolling through the `lenis-stopped` class.
 * ------------------------------------------------------------------ */
export function applyMenuState(open: boolean): void {
  const btn = document.querySelector<HTMLElement>('header button[aria-controls]');
  if (btn) {
    btn.setAttribute('aria-controls', 'site-mobile-menu');
    btn.setAttribute('aria-expanded', String(open));

    const roller = btn.querySelector<HTMLElement>('.flex.flex-col.transition-transform');
    if (roller) roller.style.transform = open ? 'translateY(-1em)' : 'translateY(0)';

    Array.from(btn.querySelectorAll<HTMLElement>('span.absolute.origin-center')).forEach((span, i) => {
      span.style.transition = `transform 400ms ${EASE}`;
      span.style.transform = open
        ? `translateY(-1px) rotate(${i === 0 ? 45 : -45}deg)`
        : `translateY(${i === 0 ? -4 : 2}px)`;
    });
  }
  document.documentElement.classList.toggle('lenis-stopped', open);
}

/** Everything that must be (re)installed per route, in the reference's order. */
export function initRouteMotion(): () => void {
  const cleanups = [
    initSmoothScroll(),
    initTextMaskReveal(),
    initCounters(),
    initClientsStages(),
    initTestimonialGating(),
  ];
  initHeroCoin();
  return () => cleanups.forEach((fn) => fn());
}
