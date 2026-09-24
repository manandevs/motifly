import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { StreakGlow } from "@/components/landing/streak-glow";
import { landingImages } from "@/components/landing/images";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

export function Hero() {
  return (
    <section data-section="hero" className="relative">
      {/* Sits behind the navbar too, so pull it up by the navbar's height */}
      <StreakGlow className="-top-18.5 right-0 h-160 w-[45%]" />

      <Container className="relative flex flex-col items-center pt-15 text-center">
        <span
          data-anchor="hero"
          className="inline-flex h-8 items-center rounded-full bg-[#e7e5fb] px-3.5 leading-none text-[#4a3aff]"
        >
          Free Image Tools in Your Browser
        </span>

        {/* Each line is a fixed-height block so the inline photo and icon can't stretch the line box */}
        <h1 className="mt-3.5 text-4xl leading-[1.125] font-medium tracking-[-0.015em] text-[#0e0e10] sm:text-5xl lg:text-6xl xl:text-7xl">
          <span>
            Compress{" "}
            <span className="relative inline-block h-[0.89em] w-[0.89em] overflow-hidden rounded-[12px] align-[-0.14em] shadow-[0_4px_10px_rgba(14,14,16,0.18)]">
              <Image src={landingImages.heroChip.src} alt="" fill sizes="57px" className="object-cover" priority />
            </span>{" "}
            Photos and
          </span>{" "}
          <span>
            Crop Them to <Accent>Perfect Size</Accent>
          </span>{" "}
          <span>
            <span className="-mt-3 mr-[0.3em] inline-flex h-[0.84em] w-[0.84em] items-center justify-center rounded-[12px] bg-[#ececef]">
              <Sparkles className="h-[0.44em] w-[0.44em]" strokeWidth={1.75} />
            </span>
            in Seconds
          </span>
        </h1>

        <div className="mt-9.75 flex flex-wrap justify-center gap-3">
          <Link href="/tools/compressor" className={cn(buttonVariants({ variant: "default" }))}>
            Get Started Now
          </Link>
          <Link href="/tools/cropper" className={cn(buttonVariants({ variant: "secondary" }))}>
            Crop an Image
          </Link>
        </div>
      </Container>
    </section>
  );
}
