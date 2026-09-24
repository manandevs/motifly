import { cn } from "@/lib/utils";

/** Highlighted word(s) inside a heading, set in the Jaguar display serif. */
export function Accent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "font-accent text-[1.08em] leading-0 font-normal tracking-[0.005em] text-[#4a3aff] [word-spacing:-0.14em]",
        className,
      )}
    >
      {children}
    </span>
  );
}
