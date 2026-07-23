import { Wreath } from "@/components/shared/wreath";
import { Star, HalfStar } from "@/components/shared/star";

export function Showcase() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-6">
      <div className="relative mx-auto grid w-fit grid-cols-3 gap-8 md:gap-20">
        {/* Rating */}
        <Wreath>
          <p className="mb-0.5 text-[0.625rem] md:text-base">User Rating</p>

          <div className="flex items-center text-amber-400 [&>svg]:size-2.5 md:[&>svg]:size-5">
            <Star />
            <Star />
            <Star />
            <Star />
            <HalfStar />
          </div>

          <p className="text-xl font-bold md:mt-1.5 md:text-3xl">4.9/5</p>
        </Wreath>

        {/* Tools */}
        <Wreath>
          <p className="text-[0.625rem] text-nowrap md:text-base">Image Compression</p>

          <p className="mt-1.5 text-center text-xs font-bold md:text-2xl">Unlimited</p>
        </Wreath>

        {/* Users */}
        <Wreath>
          <p className="text-[0.625rem] md:text-base">Monthly Users</p>

          <p className="mt-1.5 text-center text-xs font-bold text-balance md:text-2xl">3M+</p>
        </Wreath>
      </div>

      <figure className="mx-auto flex max-w-2xl flex-col items-center px-4 py-12 text-center">
        <figcaption className="mt-10">
          <span className="text-muted-foreground mt-1 block text-xs tracking-tighter md:text-xl">
            Creative Director · Pixel Studio
          </span>
        </figcaption>
        <blockquote className="text-3xl leading-[1.1] font-medium tracking-tighter text-balance md:text-wrap">
          <span>&quot;The fastest and easiest way to edit images and videos.</span>
          <span className="text-muted-foreground/50">
            {" "}
            From compression to AI enhancements, everything we need is in one place.&quot;
          </span>
        </blockquote>
      </figure>
    </div>
  );
}
