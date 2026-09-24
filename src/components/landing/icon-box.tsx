import { cn } from "@/lib/utils";

type Icon = React.ComponentType<{ className?: string; strokeWidth?: number }>;

/** White tile with a violet outline icon, violet border and soft violet shadow. */
export function IconBox({ icon: Icon, size = 64, className }: { icon: Icon; size?: 64 | 72; className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center border-2 border-[#8479ff] bg-white text-[#4a3aff] shadow-[0_6px_14px_rgba(74,58,255,0.18)]",
        size === 72 ? "h-18 w-18 rounded-2xl" : "h-16 w-16 rounded-[14px]",
        className,
      )}
    >
      <Icon className={size === 72 ? "h-9 w-9" : "h-8 w-8"} strokeWidth={1.25} />
    </div>
  );
}
