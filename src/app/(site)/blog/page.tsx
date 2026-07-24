import BlogListClient from "@/components/blog/BlogListClient";
import { getBlogCategories, getBlogPosts } from "@/components/blog/blog-data";

export default async function BlogPage() {
  const [categories, posts] = await Promise.all([getBlogCategories(), getBlogPosts()]);

  return (
    <main className="min-h-screen">
      <BlogListClient categories={categories} posts={posts} />
    </main>
  );
}
