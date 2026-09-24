import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft, Crop, FileImage, ImageDown, Sparkles } from "lucide-react";

import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { IconBox } from "@/components/landing/icon-box";
import { SectionLabel } from "@/components/landing/section-label";
import { landingImages } from "@/components/landing/images";

const rows = [
  {
    icon: Crop,
    title: ["Crop to Any Shape", "or Exact Pixel Size"],
    description:
      "Drag the handles for a free crop, or lock the box to 1:1, 4:3 or 16:9. Need something exact? Type the width, height and position in pixels, and rotate the image first.",
  },
  {
    icon: FileImage,
    title: ["Pick the Right Format", "for Every Use"],
    description:
      "Save as WebP for the smallest files, JPEG for photos that open everywhere, or PNG when you need transparency. You can also resize by percentage or to an exact width.",
  },
];

export function Features() {
  return (
    <section id="features" data-section="features" className="scroll-mt-8 pt-31">
      <Container>
        {/* Header */}
        <SectionLabel data-anchor="features">Features</SectionLabel>
        <div className="mt-3.5 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <h2 className="text-[clamp(2.25rem,4.03vw,3.625rem)] leading-[1.05] font-medium tracking-[-0.015em] text-[#0e0e10]">
            Everything You Need
            <br />
            for Your <Accent>Photos</Accent>
          </h2>
          <p className="max-w-95.25 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4] text-[#7a7a85] lg:-mt-0.75">
            Two focused tools for the jobs you do most often, with nothing to install and nothing to learn.
          </p>
        </div>

        {/* Highlight card */}
        <div className="mt-8 flex flex-col overflow-hidden rounded-3xl bg-white p-2 lg:h-141 lg:flex-row">
          <div className="flex items-center px-4 lg:w-146.25 lg:shrink-0">
            <div>
              <IconBox icon={ImageDown} size={72} />
              <h3 className="mt-4.5 text-[clamp(2rem,3.5vw,3.125rem)] leading-[1.16] font-medium tracking-[-0.015em] text-[#0e0e10] lg:whitespace-nowrap">
                Shrink File Size
                <br />
                Without Losing Quality
              </h3>
              <p className="mt-3.75 max-w-112.5 text-[17px] leading-6 text-[#7a7a85]">
                Pick a quality level and compare the original and compressed image side by side. Smaller files load
                faster on websites, send quicker by email and take up less space.
              </p>
            </div>
          </div>

          <div className="relative h-full flex-1 overflow-hidden rounded-3xl">
            <Image
              src={landingImages.featureCard.src}
              alt={landingImages.featureCard.alt}
              fill
              sizes="(min-width: 1024px) 694px, 100vw"
              className="object-cover object-[22%_center]"
            />

            {/* Mini compressor panel; the button opens the real tool */}
            <div className="absolute bottom-8.25 left-4 w-104.75 max-w-[calc(100%-32px)] rounded-[22px] bg-white/25 p-1.5 ring-1 ring-white/40 lg:left-6.5">
              <div className="rounded-2xl bg-white p-4.25 shadow-[0_12px_32px_rgba(14,14,16,0.16)]">
                <p className="text-xl leading-7 font-medium text-[#0e0e10]">Compress Your Image</p>
                <div className="mt-3.25 flex h-28.75 gap-3 rounded-[10px] border border-[#e6e6eb] bg-[#f6f6f8] px-5.25 pt-3.5">
                  <ChevronLeft className="mt-0.75 h-4 w-4 shrink-0 text-[#0e0e10]" strokeWidth={2} />
                  <p className="text-base leading-5.75 text-[#0e0e10]">
                    Set the quality to 80%, save as WebP and resize to 1920px wide.
                  </p>
                </div>
                <Link
                  href="/tools/compressor"
                  className={cn(buttonVariants({ variant: "default" }), "mt-4.5 h-10.5 w-full text-[17px] font-normal")}
                >
                  Try the Compressor <Sparkles className="h-5 w-5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature rows */}
        <div className="mt-15.75">
          {rows.map((row) => (
            <div key={row.title[0]} className="border-t border-[#e6e6eb] pt-12.25 pb-11.75 last:border-b">
              <IconBox icon={row.icon} />
              <div className="mt-4.25 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <h3 className="text-[clamp(2rem,3.35vw,3rem)] leading-[1.19] font-medium tracking-[-0.015em] text-[#0e0e10]">
                  {row.title[0]}
                  <br />
                  {row.title[1]}
                </h3>
                <p className="max-w-117 text-[17px] leading-6 text-[#7a7a85] lg:w-117">{row.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
