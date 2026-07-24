"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/lib/image";

type SanityImageValue = {
  asset?: { _ref?: string };
  alt?: string;
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="mt-12 text-3xl leading-tight font-medium md:mt-14 md:text-4xl">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl leading-tight font-medium md:mt-12 md:text-[28px]">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 text-xl leading-tight font-medium md:mt-10 md:text-2xl">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 text-lg leading-tight font-medium md:mt-8 md:text-xl">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-white/20 pl-5 text-[15px] leading-7 text-[#9F9FA9] italic md:text-[17px]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-[14px] leading-6 md:text-[17px] md:leading-7">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-2 list-disc space-y-2 pl-6 text-[14px] leading-6 marker:text-[#9F9FA9] md:text-[17px] md:leading-7">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 list-decimal space-y-2 pl-6 text-[14px] leading-6 marker:text-[#9F9FA9] md:text-[17px] md:leading-7">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? "#";
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset?._ref) return null;
      const src = urlFor(value).width(1600).fit("max").auto("format").url();
      return (
        <figure className="my-8 md:my-10">
          <Image
            src={src}
            alt={value.alt ?? ""}
            width={1360}
            height={760}
            className="h-auto w-full rounded-xl border border-white/8"
          />
          {value.alt ? <figcaption className="mt-3 text-center text-[13px] leading-5">{value.alt}</figcaption> : null}
        </figure>
      );
    },
  },
};

type BlogPortableTextProps = {
  value: PortableTextBlock[];
};

const BlogPortableText = ({ value }: BlogPortableTextProps) => {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
};

export default BlogPortableText;
