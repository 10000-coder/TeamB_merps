import { sx, onImgError, onImgErrorHide } from '../../lib/dom';

export function extra_2() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-1 flex h-svh items-center justify-center pr-(--sbw)">
        <div className="perspective-[1000px]">
          <div className="vt-exclude transform-3d origin-center" style={sx("transform:translateZ(1px) rotateY(380.764deg)")}>
            <span role="img" aria-label="MERPS" className="w-[min(72vw,44rem)] max-w-full text-grey" style={sx("display:block;aspect-ratio:1201 / 751;background-color:currentColor;-webkit-mask-image:url(/logo.png);mask-image:url(/logo.png);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:contain;mask-size:contain;-webkit-mask-position:center;mask-position:center")}>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
