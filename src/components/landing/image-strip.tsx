import Image from "next/image";
import { landingImages } from "@/components/landing/images";

// All clip paths use objectBoundingBox units (0–1), so they scale with the tile.
type Corner = "tl" | "tr" | "br" | "bl";

/** Path for a rectangle with only one rounded corner (radius r). */
function quadrant(x: number, y: number, w: number, h: number, corner: Corner, r: number) {
  const [x2, y2] = [x + w, y + h];
  const round = (c: Corner, from: string, arc: string, fallback: string) =>
    corner === c ? `${from} ${arc}` : fallback;
  return [
    `M ${corner === "tl" ? x + r : x} ${y}`,
    round("tr", `L ${x2 - r} ${y}`, `A ${r} ${r} 0 0 1 ${x2} ${y + r}`, `L ${x2} ${y}`),
    round("br", `L ${x2} ${y2 - r}`, `A ${r} ${r} 0 0 1 ${x2 - r} ${y2}`, `L ${x2} ${y2}`),
    round("bl", `L ${x + r} ${y2}`, `A ${r} ${r} 0 0 1 ${x} ${y2 - r}`, `L ${x} ${y2}`),
    round("tl", `L ${x} ${y + r}`, `A ${r} ${r} 0 0 1 ${x + r} ${y}`, `L ${x} ${y}`),
    "Z",
  ].join(" ");
}

const gap = 0.004;
const half = 0.5 - gap / 2;
const bauhausPaths = [
  quadrant(0, 0, half, half, "tr", 0.25),
  quadrant(0.5 + gap / 2, 0, half, half, "br", 0.25),
  quadrant(0, 0.5 + gap / 2, half, half, "tl", 0.25),
  quadrant(0.5 + gap / 2, 0.5 + gap / 2, half, half, "bl", 0.25),
];

const shapes: React.CSSProperties[] = [
  { borderRadius: "9999px" },
  { clipPath: "url(#strip-bauhaus)" },
  { clipPath: "url(#strip-stadiums)" },
  { borderRadius: "0px" },
];

export function ImageStrip() {
  return (
    <section data-section="strip" className="mt-20 overflow-hidden">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <clipPath id="strip-bauhaus" clipPathUnits="objectBoundingBox">
            {bauhausPaths.map((d) => (
              <path key={d} d={d} />
            ))}
          </clipPath>
          <clipPath id="strip-stadiums" clipPathUnits="objectBoundingBox">
            {[0, 1, 2].map((i) => (
              <rect key={i} x="0" y={i / 3} width="1" height={1 / 3 + 0.002} rx="0.1667" ry="0.1667" />
            ))}
          </clipPath>
        </defs>
      </svg>

      {/* Full-width row so justify-center can center the tiles (w-max shrank it to the tiles' width) */}
      <div data-anchor="strip" className="flex w-full items-center justify-center">
        {landingImages.strip.map((image, i) => (
          <div
            key={image.src}
            className="relative h-[min(358px,24.86vw)] w-[min(358px,24.86vw)] shrink-0 overflow-hidden"
            style={shapes[i]}
          >
            <Image src={image.src} alt={image.alt} fill sizes="358px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
