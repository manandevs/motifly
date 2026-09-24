import { cn } from "@/lib/utils";

/**
 * Blue→violet "fluted glass" light streaks: repeating vertical bars over a colour gradient,
 * faded out with two intersecting masks. `fade` picks which way the glow dissolves.
 */
export function StreakGlow({ className, fade = "down-left" }: { className?: string; fade?: "down-left" | "up" }) {
  const mask =
    fade === "down-left"
      ? "linear-gradient(to bottom, #000 30%, transparent 95%), linear-gradient(to right, transparent 0%, #000 40%)"
      : "linear-gradient(to top, #000 15%, transparent 100%), radial-gradient(ellipse 50% 100% at 40% 100%, #000 30%, transparent 100%)";

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
      style={{
        background: [
          "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0.28) 20px, rgba(255,255,255,0) 38px, rgba(20,20,120,0.12) 56px, rgba(255,255,255,0) 76px)",
          "linear-gradient(90deg, rgba(123,97,255,0) 0%, rgba(123,97,255,0.7) 22%, #4a3aff 55%, #3b3bff 100%)",
        ].join(", "),
        filter: "blur(6px)",
        maskImage: mask,
        WebkitMaskImage: mask,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}
