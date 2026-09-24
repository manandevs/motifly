import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/landing/container";

const navLinks = [
  { label: "Compressor", href: "/tools/compressor" },
  { label: "Cropper", href: "/tools/cropper" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

/** Faint dot grid that fades out away from the bracket beside it. */
function DotGrid({ side }: { side: "left" | "right" }) {
  const fade = `linear-gradient(to ${side === "left" ? "right" : "left"}, transparent, #000 70%)`;
  return (
    <div
      aria-hidden
      className="h-56.25 w-37.5"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(74,58,255,0.35) 1px, transparent 1.6px)",
        backgroundSize: "14px 14px",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}

/** "]" or "[" shaped line with a connector reaching toward the button. */
function Bracket({ side }: { side: "left" | "right" }) {
  return (
    <div aria-hidden className={cn("flex items-center", side === "right" && "flex-row-reverse")}>
      <div
        className={cn(
          "h-56.25 w-4 border-y border-[#b9b2ff]",
          side === "left" ? "rounded-r-[12px] border-r" : "rounded-l-[12px] border-l",
        )}
      />
      <div className="h-px w-12 bg-[#b9b2ff]" />
    </div>
  );
}

export function Footer() {
  return (
    <footer
      data-section="footer"
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f6f6f8 0%, #eceaff 38%, #c9c3ff 72%, #9d93ff 100%)" }}
    >
      <Container className="relative pt-22.5">
        {/* Top row: brand · call to action · navigation */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-75">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="" width={40} height={40} className="h-10 w-10" />
              <span className="font-(family-name:--font-estiana) text-[28px] leading-none text-[#0e0e10]">Motifly</span>
            </Link>
            <p className="mt-8 text-[17px] leading-relaxed text-[#5b5b66]">
              Free image tools that run in your browser. Compress and crop photos without uploading them anywhere.
            </p>
          </div>

          <div className="flex items-center justify-center lg:self-center">
            <div className="hidden items-center xl:flex">
              <DotGrid side="left" />
              <Bracket side="left" />
            </div>
            <Link
              href="/tools/compressor"
              className={cn(
                buttonVariants({ variant: "dark", size: "lg" }),
                "h-12 gap-3 rounded-[12px] px-5 text-base",
              )}
            >
              Start Compressing
              <span className="rounded-[5px] bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-[#c9c3ff]">
                FREE
              </span>
            </Link>
            <div className="hidden items-center xl:flex">
              <Bracket side="right" />
              <DotGrid side="right" />
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-4 lg:flex-col lg:items-end lg:gap-6.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[22px] leading-none text-[#0e0e10] transition-colors hover:text-[#4a3aff]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row: legal · copyright · legal */}
        <div className="mt-20 flex flex-col items-center gap-3 text-sm text-[#4b4b56] md:flex-row md:justify-between">
          <Link href="/legal/terms-and-conditions" className="underline underline-offset-4 hover:text-[#0e0e10]">
            Terms and Conditions
          </Link>
          <p>© {new Date().getFullYear()} Motifly. All Rights Reserved</p>
          <Link href="/legal/privacy-policy" className="underline underline-offset-4 hover:text-[#0e0e10]">
            Privacy Policy
          </Link>
        </div>
      </Container>

      {/* Giant wordmark, cut off by the bottom edge */}
      <p
        aria-hidden
        className="wordmark -mb-16 text-center font-(family-name:--font-estiana) text-[27.5vw] leading-[0.85] tracking-[-0.02em] whitespace-nowrap text-white/45 select-none"
      >
        motifly
      </p>
    </footer>
  );
}
