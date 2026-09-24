import Image from "next/image";
import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { SectionLabel } from "@/components/landing/section-label";
import { landingImages } from "@/components/landing/images";

const steps = [
  {
    title: "Add Your Image",
    description: "Drag and drop a photo, or pick one or more images from your device.",
  },
  {
    title: "Adjust the Settings",
    description: "Set the quality, size or crop area and see the result straight away.",
  },
  {
    title: "Download Instantly",
    description: "Save the finished image as JPEG, PNG or WebP with a single click.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" data-section="how" className="scroll-mt-8 pt-36.25">
      <Container>
        <div className="flex flex-col items-center text-center">
          <SectionLabel data-anchor="how">How It Works</SectionLabel>
          <h2 className="mt-3.5 text-[clamp(2.25rem,4.03vw,3.625rem)] leading-[1.07] font-medium tracking-[-0.015em] text-[#0e0e10]">
            Better Images in
            <br />
            Three <Accent>Simple Steps</Accent>
          </h2>
          <p className="mt-4.75 max-w-135 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4] text-[#7a7a85]">
            No account, no installs and no waiting for uploads. Just open a tool and get started.
          </p>
        </div>

        <div className="relative mt-10.75 aspect-16/10 overflow-hidden rounded-3xl lg:aspect-auto lg:h-172.5">
          <Image
            src={landingImages.howItWorks.src}
            alt={landingImages.howItWorks.alt}
            fill
            sizes="(min-width: 1440px) 1280px, 100vw"
            className="object-cover"
          />
        </div>

        <ol className="mt-9.5 grid gap-8 lg:grid-cols-[2.2fr_1fr_1fr] lg:gap-7">
          {steps.map((step, index) => (
            <li key={step.title}>
              <div className="flex items-center gap-6.25">
                <h3 className="shrink-0 text-[26px] leading-8 font-medium tracking-[-0.01em] text-[#0e0e10]">
                  {step.title}
                </h3>
                {index === 0 && <span className="hidden h-px flex-1 bg-[#0e0e10] lg:block" />}
              </div>
              <p className="mt-3.25 max-w-70 text-[17px] leading-5.5 text-[#7a7a85] lg:min-h-16.5">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
