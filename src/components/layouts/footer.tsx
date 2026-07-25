import Image from "next/image";
import Link from "next/link";

import { LinkedInIcon, XIcon } from "@/components/shared/icons";

const links = [
  {
    title: "Tools",
    links: [
      {
        label: "Image Compressor",
        href: "/tools/compressor",
        title: "Compress images online",
      },
      {
        label: "Blog",
        href: "/blog",
        title: "Read our latest articles",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/legal/privacy-policy",
        title: "Read our Privacy Policy",
      },
      {
        label: "Terms & Conditions",
        href: "/legal/terms-and-conditions",
        title: "Read our Terms & Conditions",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-full w-full bg-[url('/footer-blur-mobile.png')] mask-t-from-90% bg-cover bg-center bg-no-repeat md:bg-[url('/footer-blur-desktop.png')]" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="border-border/50 grid gap-10 border-b pb-10 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center">
              <Image src="/mlotif_logo.svg" alt="Misfro" width={120} height={36} className="max-h-8 w-auto" />
              <span className="hidden text-2xl sm:block">Mlotif</span>
            </Link>

            <p className="leading-6 tracking-tight lg:text-xl">
              Powerful AI tools to edit images, compress files, enhance quality, remove backgrounds, and create stunning
              visual content in seconds.
            </p>
          </div>

          {/* Footer Links */}
          {links.map((section) => (
            <div key={section.title} className="mb-10">
              <h3 className="text-muted-foreground mb-4">{section.title}</h3>

              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      title={link.title}
                      target={link.href.startsWith("https://") ? "_blank" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 pt-4 text-sm md:flex-row">
          <p className="text-muted-foreground">© {new Date().getFullYear()} Misfro. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <Link
              href="https://x.com"
              target="_blank"
              aria-label="X (Twitter)"
              className="border-border bg-secondary hover:bg-secondary/80 flex h-10 w-10 items-center justify-center rounded-md border transition-colors"
            >
              <XIcon className="h-4 w-4" />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
              className="border-border bg-secondary hover:bg-secondary/80 flex h-10 w-10 items-center justify-center rounded-md border transition-colors"
            >
              <LinkedInIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
