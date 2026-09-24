import { cn } from "@/lib/utils";

/** 1280px content width with 80px side padding at the 1440px design size. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-360 px-5 md:px-10 xl:px-20", className)}>{children}</div>;
}
