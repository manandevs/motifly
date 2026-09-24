import { cn } from "@/lib/utils";

export function SectionLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-8 w-fit items-center rounded-[10px] bg-[#eceaff] px-3 text-base leading-none text-[#4a3aff]",
        className,
      )}
      {...props}
    />
  );
}
