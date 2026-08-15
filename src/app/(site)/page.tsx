"use client";
import { Hero } from "@/components/home/hero";
import { ToolsGrid } from "@/components/home/tools-grid";
import { Showcase } from "@/components/home/showcase";
import { Testimonials } from "@/components/home/testimonials";
import { FAQs } from "@/components/shared/faqs";

export default function Home() {
  return (
    <>
      <Hero />
      <ToolsGrid />
      <Showcase />
      <Testimonials />
      <FAQs />
    </>
  );
}
