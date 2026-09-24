import { Hero } from "@/components/landing/hero";
import { ImageUploader } from "@/components/landing/image-uploader";
import { ImageStrip } from "@/components/landing/image-strip";
import { Features } from "@/components/landing/features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Privacy } from "@/components/landing/privacy";
import { Pricing } from "@/components/landing/pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <ImageUploader />
      <ImageStrip />
      <Features />
      <HowItWorks />
      <Privacy />
      <Pricing />
    </>
  );
}
