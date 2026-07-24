import Link from "next/link";

type BlogBreadcrumbProps = {
  current: string;
};

const BlogBreadcrumb = ({ current }: BlogBreadcrumbProps) => {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 px-3 py-2 text-center text-[13px] font-medium">
      <span className="inline-flex">
        <Link href="/blog" className="transition-colors hover:opacity-50">
          Blog
        </Link>
      </span>
      <span className="inline-flex">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke="#8A8F98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="inline-flex">{current}</span>
    </nav>
  );
};

export default BlogBreadcrumb;
