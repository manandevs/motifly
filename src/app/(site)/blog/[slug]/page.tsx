import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticle from "@/components/blog/BlogArticle";
import BlogBreadcrumb from "@/components/blog/BlogBreadcrumb";
import { getBlogPostBySlug } from "@/components/blog/blog-data";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_NAME = "Your Website";
const SITE_URL = "https://yourdomain.com";
const PUBLISHER = "Your Company";

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.keywords,

    authors: [{ name: post.author.name }],
    creator: post.author.name,
    publisher: PUBLISHER,

    alternates: {
      canonical: url,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },

    category: post.category,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: [post.image],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,

    author: {
      "@type": "Person",
      name: post.author.name,
    },

    publisher: {
      "@type": "Organization",
      name: PUBLISHER,
    },

    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,

    keywords: post.keywords.join(", "),
  };

  return (
    <main className="min-h-screen py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-4">
        <BlogBreadcrumb current={post.category} />
        <BlogArticle post={post} />
      </div>
    </main>
  );
}
