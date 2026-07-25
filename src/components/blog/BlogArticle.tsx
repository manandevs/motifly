"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";
import type { BlogPost } from "./blog-data";
import { Button } from "../ui/button";

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="w-full">
        <Image
          src={urlFor(value).url()}
          alt={value.alt ?? "Blog image"}
          width={1360}
          height={700}
          className="h-auto w-full rounded-xs object-cover"
        />
        {value.caption && (
          <figcaption className="text-muted-foreground mt-2 text-center text-sm">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },

  block: {
    h1: ({ children }) => <h1 className="mt-8 mb-4 text-5xl leading-tight font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-6 mb-4 text-4xl leading-tight font-bold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-5 mb-4 text-3xl leading-tight font-bold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-4 mb-3 text-2xl leading-tight font-bold">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-4 mb-2 text-xl font-bold">{children}</h5>,
    h6: ({ children }) => <h6 className="mt-2 mb-1 text-lg font-bold">{children}</h6>,
    normal: ({ children }) => <p className="text-muted-foreground mb-4 leading-8">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-primary my-4 border-l-4 pl-4 text-lg italic">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-4 list-disc space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 ml-4 list-decimal space-y-1">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline transition-colors hover:text-blue-400"
      >
        {children}
      </a>
    ),
  },
};

type BlogArticleProps = {
  post: BlogPost;
};

export default function BlogArticle({ post }: BlogArticleProps) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    keywords: post.keywords.join(", "),
  };
  
  const hasAuthorImage = Boolean(post.author?.image && post.author.image.trim() !== "");

  return (
    <article className="mx-auto max-w-4xl space-y-4">
      <h1 className="text-center text-3xl leading-tight font-semibold sm:text-5xl">{post.title}</h1>
      <p className="text-muted-foreground mx-auto max-w-3xl text-center text-lg">{post.excerpt}</p>

      <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-3 text-sm">
        <span>{post.date || post.publishedAt}</span>
        {post.readingTime && (
          <>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </>
        )}
      </div>

      <div className="prose prose-neutral">
        <PortableText value={post.body} components={portableTextComponents} />
      </div>

      {post.keywords.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 font-semibold tracking-wide">Keywords</h3>

          <div className="flex flex-wrap gap-2">
            {post.keywords.map((keyword) => (
              <span key={keyword} className="bg-muted rounded-full px-3 py-1 text-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-5 rounded-lg border p-4">
        {hasAuthorImage && (
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={200}
            height={200}
            className="h-32 w-32 rounded-full object-cover"
          />
        )}

        <div>
          <h3 className="text-xl font-semibold">{post.author.name}</h3>
          {post.author.bio && <p className="text-muted-foreground">{post.author.bio}</p>}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        Category:
        <Button size="sm">{post.category}</Button>
      </div>
    </article>
  );
}