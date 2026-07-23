import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Star } from "../shared/star";

export type Testimonial = {
  name: string;
  date: string;
  title: string;
  content: string;
  avatar?: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: "Giana Herwitz",
    date: "May 4",
    title: "Fast & Reliable",
    content:
      '"This platform has completely changed how we edit images. The AI tools are incredibly fast and deliver professional-quality results."',
    rating: 5,
  },
  {
    name: "Hanna Gouse",
    date: "May 4",
    title: "Best Editing Platform",
    content:
      '"From image compression to background removal, everything works perfectly. It saves us hours every week."',
    rating: 5,
  },
  {
    name: "Kaiya Donin",
    date: "May 4",
    title: "Amazing Experience",
    content:
      '"The interface is clean, the tools are powerful, and the processing speed is outstanding. Highly recommended!"',
    rating: 5,
  },
  {
    name: "Alex Bergwijn",
    date: "May 4",
    title: "Game Changer",
    content: '"One platform for image editing, video editing, and AI enhancements. Exactly what our team needed."',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-14 md:py-24">
      <div className="">
        <h2 className="text-center text-3xl leading-[1.1] font-medium tracking-tighter text-balance">
          Loved by
          <span className="text-muted-foreground block">Creators Worldwide</span>
        </h2>

        <p className="text-muted-foreground mt-1 block max-w-2xl text-center text-xs tracking-tighter md:text-xl">
          Thousands of creators, designers, marketers, and businesses trust our AI-powered tools to edit images,
          compress files, enhance quality, and create stunning visual content in seconds.
        </p>
      </div>

      <div className="relative w-[calc(100%+3rem)] overflow-hidden py-4 lg:w-full">
        <div className={cn("relative col-span-4 mb-4 w-full")}>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 h-[calc(100%+1rem)] w-full",
              "bg-linear-[90deg,var(--background),transparent_5%,transparent_95%,var(--background)]",
              "md:bg-linear-[90deg,var(--background),transparent_25%,transparent_75%,var(--background)]",
              "xl:bg-linear-[90deg,var(--background),transparent,var(--background)]",
            )}
          />

          <InfiniteSlider speed={30} reverse={true}>
            {testimonials.map((testimonial, index) => (
              <div className="bg-card flex h-auto w-xs flex-col gap-2 rounded-xl p-7 shadow-md md:w-[24rem] md:p-8">
                <div className="mb-1 text-lg font-semibold">{testimonial.title}</div>
                <div className="mb-2 flex items-center gap-px">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400" />
                  ))}
                  <span className="ps-1 text-xs">{testimonial.date}</span>
                  <span className="bg-foreground mx-1 h-1 w-1 rounded-full"></span>
                  <span className="text-xs">{testimonial.name}</span>
                </div>
                <div className="text-sm text-wrap md:text-base md:font-medium">{testimonial.content}</div>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        <div className={cn("relative col-span-4 mb-4 w-full")}>
          <div
            className={cn(
              "pointer-events-none absolute inset-0 z-10 h-[calc(100%+1rem)] w-full",
              "bg-linear-[90deg,var(--background),transparent_5%,transparent_95%,var(--background)]",
              "md:bg-linear-[90deg,var(--background),transparent_25%,transparent_75%,var(--background)]",
              "xl:bg-linear-[90deg,var(--background),transparent,var(--background)]",
            )}
          />

          <InfiniteSlider speed={30} reverse={false}>
            {testimonials.map((testimonial, index) => (
              <div className="bg-card flex h-auto w-xs flex-col gap-2 rounded-xl p-7 shadow-md md:w-[24rem] md:p-8">
                <div className="mb-1 text-lg font-semibold">{testimonial.title}</div>
                <div className="mb-2 flex items-center gap-px">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400" />
                  ))}
                  <span className="ps-1 text-xs">{testimonial.date}</span>
                  <span className="bg-foreground mx-1 h-1 w-1 rounded-full"></span>
                  <span className="text-xs">{testimonial.name}</span>
                </div>
                <div className="text-sm text-wrap md:text-base md:font-medium">{testimonial.content}</div>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
