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
      image: post.author?.image ? urlFor(post.author.image).url() : "",
      bio: post.author?.bio ?? "",
    },

    image: post.mainImage ? urlFor(post.mainImage).width(1600).quality(90).url() : FALLBACK_IMAGE,

    featured: post.featured ?? false,
    readingTime: post.readingTime ?? null,

    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    keywords: post.keywords ?? [],

    body: post.body ?? [],
  };
}

const MOCK_CATEGORIES: BlogCategory[] = [
  {
    title: "Image Optimization",
    slug: "image-optimization",
    description: "Tips and guides on compressing and optimizing images for the web.",
  },
  { title: "Web Performance", slug: "web-performance", description: "Improve your website speed and core web vitals." },
];

const MOCK_POSTS: BlogPost[] = [
  {
    id: "mock-1",
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    excerpt:
      "Learn the best practices for reducing file sizes of PNG, JPEG, and WebP images while maintaining visual fidelity.",
    publishedAt: "2026-08-01T00:00:00Z",
    date: "August 1, 2026",
    category: "Image Optimization",
    author: {
      name: "Motifly Team",
      image: "/avatars/1.jpg",
      bio: "Core engineering and media tools team at Motifly.",
    },
    image: "/app-image-1.png",
    featured: true,
    readingTime: 4,
    seoTitle: "How to Compress Images Without Losing Quality",
    seoDescription: "Discover proven techniques to compress your images for faster website loading speeds.",
    keywords: ["image compression", "webp", "png optimizer", "performance"],
    body: [
      {
        _type: "block",
        _key: "block1",
        style: "normal",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Image compression is essential for modern web performance. By reducing unnecessary metadata and optimizing color quantization, you can drastically decrease page load times.",
          },
        ],
      } as PortableTextBlock,
    ],
  },
];

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const categories = await client.fetch<BlogCategory[]>(`
      *[_type == "blogCategory"] | order(title asc){
        title,
        "slug": slug.current,
        description
      }
    `);
    if (!categories || categories.length === 0) return MOCK_CATEGORIES;
    return categories;
  } catch {
    return MOCK_CATEGORIES;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch<SanityBlogPost[]>(`
      *[_type == "blogPost"]
        | order(featured desc, publishedAt desc){
          ${BLOG_POST_PROJECTION}
        }
    `);
    if (!posts || posts.length === 0) return MOCK_POSTS;
    return posts.map(mapPost);
  } catch {
    return MOCK_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch<SanityBlogPost | null>(
      `
      *[
        _type == "blogPost" &&
        slug.current == $slug
      ][0]{
        ${BLOG_POST_PROJECTION}
      }
      `,
      { slug },
    );

    if (!post) {
      return MOCK_POSTS.find((p) => p.slug === slug) || null;
    }

    return mapPost(post);
  } catch {
    return MOCK_POSTS.find((p) => p.slug === slug) || null;
  }
}
