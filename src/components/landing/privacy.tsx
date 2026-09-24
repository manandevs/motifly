import Image from "next/image";
import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { SectionLabel } from "@/components/landing/section-label";
import { landingImages } from "@/components/landing/images";

export function Privacy() {
  return (
    <section data-section="privacy" className="pt-36">
      <Container>
        <SectionLabel data-anchor="privacy">Privacy</SectionLabel>
        <div className="mt-3.25 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <h2 className="text-[clamp(2.25rem,4.03vw,3.625rem)] leading-[1.07] font-medium tracking-[-0.015em] text-[#0e0e10]">
            Your Photos Stay
            <br />
            on <Accent>Your Device</Accent>
          </h2>
          <p className="max-w-111.25 text-[17px] leading-6 text-[#7a7a85] lg:mt-0.75 lg:mr-20 lg:w-111.25">
            Most online editors upload your files to their servers. Motifly does all the work inside your browser
            instead, so your images stay with you.
          </p>
        </div>

        <div className="mt-15.75 grid gap-6 lg:h-120 lg:grid-cols-[845fr_411fr]">
          {/* Photo card with quote */}
          <div className="relative flex min-h-105 flex-col justify-between overflow-hidden rounded-3xl px-8 pt-9.25 pb-8.5">
            <Image
              src={landingImages.privacy.src}
              alt={landingImages.privacy.alt}
              fill
              sizes="(min-width: 1440px) 845px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/15" />

            <p className="relative text-lg leading-5.5 text-white/85">Privacy First</p>
            <div className="relative">
              <p className="max-w-165 text-[clamp(1.75rem,3.35vw,3rem)] leading-[1.21] font-medium tracking-[-0.015em] text-white">
                &ldquo;Nothing is uploaded. Every edit happens{" "}
                <Accent className="text-white">right in your browser.</Accent>&rdquo;
              </p>
              <p className="mt-4.5 text-lg leading-5.5 text-white/80">How Motifly works</p>
            </div>
          </div>

          {/* Stat card */}
          <div className="flex min-h-90 flex-col justify-between rounded-3xl bg-[#4a3aff] px-8 pt-9.25 pb-7.75 text-white">
            <p className="text-lg leading-5.5 text-white/85">Fact &amp; Number</p>
            <div>
              <p className="text-[100px] leading-none font-medium tracking-[-0.02em]">100%</p>
              <p className="mt-5.5 max-w-85 text-[22px] leading-8.5 text-white/60">
                of the work happens on your device. Your images are never sent to our servers.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
