"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";
import type { BlogCategory, BlogPost } from "./blog-data";
import { Button } from "../ui/button";

const INITIAL_VISIBLE = 10;
const LOAD_MORE_STEP = 6;

type BlogListClientProps = {
  categories: BlogCategory[];
  posts: BlogPost[];
};

export default function BlogListClient({ categories, posts }: BlogListClientProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = category === "All" || post.category === category;

      const search = query.toLowerCase();

      const queryMatch =
        !search || post.title.toLowerCase().includes(search) || post.excerpt.toLowerCase().includes(search);

      return categoryMatch && queryMatch;
    });
  }, [posts, category, query]);

  const visiblePosts = useMemo(() => {
    const ordered = [...filtered.filter((p) => p.featured), ...filtered.filter((p) => !p.featured)];

    return ordered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const canLoadMore = visiblePosts.length < filtered.length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32">
      <h1 className="text-5xl font-medium tracking-tight">Blog</h1>

      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("All")}
            className={cn(
              "rounded-2xl px-3 py-1.5 text-xs transition hover:opacity-75",
              category === "All" && "bg-white text-black",
            )}
          >
            All
          </button>

          {categories.map((item) => (
            <button
              key={item.slug}
              onClick={() => {
                setCategory(item.title);
                setVisibleCount(INITIAL_VISIBLE);
              }}
              className={cn(
                "rounded-2xl px-3 py-1.5 text-xs transition hover:opacity-75",
                category === item.title && "bg-white text-black",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="border-muted-foreground/25 flex h-10 w-full items-center rounded-full border px-3 md:w-72">
          <Search size={16} className="text-muted-foreground" />

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisibleCount(INITIAL_VISIBLE);
            }}
            placeholder="Search..."
            className="ml-2 flex-1 bg-transparent text-sm outline-none"
          />

          <SlidersHorizontal size={16} className="text-muted-foreground" />
        </div>
      </div>

      {visiblePosts.length === 0 ? (
        <div className="bg-muted mt-6 rounded border p-10 text-center">
          <p className="text-lg font-medium">No posts found</p>
          <p className="text-muted-foreground mt-2 text-sm">Try another category or search term.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button onClick={() => setVisibleCount((v) => Math.min(v + LOAD_MORE_STEP, filtered.length))}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
