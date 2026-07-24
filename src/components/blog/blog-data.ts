import type { PortableTextBlock } from "@portabletext/types";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type BlogCategory = {
  title: string;
  slug: string;
  description: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;

  publishedAt: string;
  date: string;

  category: string;

  author: {
    name: string;
    image: string;
    bio: string;
  };

  image: string;

  featured: boolean;
  readingTime: number | null;

  seoTitle: string;
  seoDescription: string;
  keywords: string[];

  body: PortableTextBlock[];
};

type SanityBlogPost = {
  _id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  readingTime?: number | null;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  category?: string;
  author?: {
    name?: string;
    bio?: string;
    image?: unknown;
  };
  mainImage?: unknown;
  body?: PortableTextBlock[];
};

const FALLBACK_IMAGE = "/images/blog-wave-dots-a.png";

const BLOG_POST_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  featured,
  readingTime,
  seoTitle,
  seoDescription,
  keywords,

  "category": category->title,

  "author": author->{
    name,
    bio,
    image
  },

  mainImage,

  body
`;

const formatDate = (date?: string): string => {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

function mapPost(post: SanityBlogPost): BlogPost {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title ?? "Untitled",
    excerpt: post.excerpt ?? "",
    publishedAt: post.publishedAt ?? "",
    date: formatDate(post.publishedAt),

    category: post.category ?? "Uncategorized",

    author: {
      name: post.author?.name ?? "Our Team",
      image: post.author?.image
        ? urlFor(post.author.image).url()
        : "",
      bio: post.author?.bio ?? "",
    },

    image: post.mainImage
      ? urlFor(post.mainImage).width(1600).quality(90).url()
      : FALLBACK_IMAGE,

    featured: post.featured ?? false,
    readingTime: post.readingTime ?? null,

    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    keywords: post.keywords ?? [],

    body: post.body ?? [],
  };
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return client.fetch<BlogCategory[]>(`
    *[_type == "blogCategory"] | order(title asc){
      title,
      "slug": slug.current,
      description
    }
  `);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch<SanityBlogPost[]>(`
    *[_type == "blogPost"]
      | order(featured desc, publishedAt desc){
        ${BLOG_POST_PROJECTION}
      }
  `);

  return posts.map(mapPost);
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const post = await client.fetch<SanityBlogPost | null>(
    `
    *[
      _type == "blogPost" &&
      slug.current == $slug
    ][0]{
      ${BLOG_POST_PROJECTION}
    }
    `,
    { slug }
  );

  if (!post) {
    return null;
  }

  return mapPost(post);
}