import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { SectionLabel } from "@/components/landing/section-label";

const plans = [
  {
    badge: "Compressor",
    accent: false,
    href: "/tools/compressor",
    benefits: [
      "Quality control from 5% to 100%",
      "Resize by percentage or exact width",
      "Save as JPEG, PNG or WebP",
      "Original and compressed side by side",
      "Work on several images at once",
    ],
  },
  {
    badge: "Cropper",
    accent: true,
    href: "/tools/cropper",
    benefits: [
      "Free crop or fixed aspect ratios",
      "Exact width, height and position in pixels",
      "Rotate by 90° or any angle",
      "Save as JPEG, PNG or WebP",
      "Work on several images at once",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      data-section="pricing"
      className="mt-18 scroll-mt-8 rounded-[40px] bg-white pt-18 pb-8.5 lg:rounded-[60px]"
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionLabel data-anchor="pricing">Pricing</SectionLabel>
          <h2 className="mt-3.25 text-[clamp(2.25rem,4.03vw,3.625rem)] leading-[1.07] font-medium tracking-[-0.015em] text-[#0e0e10]">
            Simple Pricing: <Accent>It&apos;s Free</Accent>
          </h2>
          <p className="mt-4.75 max-w-136.25 text-[17px] leading-6 text-[#7a7a85]">
            Every tool is free to use as often as you like. No account, no credit card and no watermark on your images.
          </p>
        </div>

        <div className="mt-16 grid gap-6.5 lg:grid-cols-2">
          {plans.map((plan) => (
            <div key={plan.badge} className="rounded-[20px] border border-[#e6e6eb] bg-white px-7 pt-7.25 pb-7.75">
              <div className="flex items-start justify-between">
                <p className="text-[52px] leading-15.5 font-medium tracking-[-0.02em] text-[#0e0e10]">$0</p>
                <span
                  className={cn(
                    "mt-0.75 flex h-8 items-center rounded-[10px] px-3 text-base font-medium",
                    plan.accent ? "bg-[#eceaff] text-[#4a3aff]" : "bg-[#efeff2] text-[#1e1e20]",
                  )}
                >
                  {plan.badge}
                </span>
              </div>
              <p className="mt-0.75 max-w-82.5 text-[17px] leading-6 text-[#7a7a85]">
                Free forever. No sign-up needed, and your images never leave your device.
              </p>

              <p className="mt-8 text-[17px] leading-6 font-semibold text-[#0e0e10]">Included Benefits</p>
              <ul className="mt-4.25 flex flex-col gap-5.5">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3.5 text-[17px] leading-5.5 text-[#1e1e20]">
                    <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#eceaff] text-[#4a3aff]">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "mt-8.25 h-12 w-full rounded-full text-[17px]",
                )}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
