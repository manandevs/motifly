import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-medium transition-colors cursor-pointer active:translate-y-px disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-black/10 bg-primary text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_0_rgba(16,24,40,0.08),0_1px_3px_rgba(16,24,40,0.12)] hover:bg-primary/90",
        dark: "border border-neutral-950 bg-neutral-950 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_0_rgba(16,24,40,0.1),0_1px_3px_rgba(16,24,40,0.2)] hover:bg-neutral-800",
        destructive:
          "border border-[#b42318] bg-destructive text-white shadow-[0_2px_0_rgba(180,35,24,0.2),0_1px_3px_rgba(180,35,24,0.25)] hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-neutral-200 bg-white text-neutral-900 shadow-[0_2px_0_rgba(16,24,40,0.06),0_1px_3px_rgba(16,24,40,0.08)] hover:bg-neutral-50",
        secondary:
          "border border-neutral-200 bg-secondary text-secondary-foreground shadow-[0_2px_0_rgba(16,24,40,0.05),0_1px_2px_rgba(16,24,40,0.06)] hover:bg-neutral-200/70",
        ghost: "hover:bg-secondary active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-[10px] px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-6 text-[15px] has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
