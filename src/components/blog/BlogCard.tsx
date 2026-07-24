"use client";

import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "./blog-data";
import { Button } from "../ui/button";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="bg-muted overflow-hidden rounded-xs">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={1420}
            className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
          />
        </div>

        <p className="text-muted-foreground mt-2 text-end text-xs">Read time {post.readingTime ?? 0} min</p>

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">{post.date}</p>

          <h3 className="line-clamp-2 text-lg font-medium transition-colors group-hover:underline">{post.title}</h3>

          <p className="text-muted-foreground line-clamp-4 text-sm">{post.excerpt}</p>

          <Button className="mt-6 w-fit text-xs" size="sm">
            {post.category}
          </Button>
        </div>
      </Link>
    </article>
  );
}
