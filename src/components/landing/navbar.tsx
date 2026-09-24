"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Container } from "@/components/landing/container";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { label: "Compressor", href: "/tools/compressor" },
  { label: "Cropper", href: "/tools/cropper" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="relative z-20">
      <Container className="flex items-center justify-between pt-5.5">
        <Link href="/" className="flex h-13 items-center gap-2.5">
          <Image src="/logo.svg" alt="" width={36} height={36} priority className="h-9 w-9" />
          <span className="font-(family-name:--font-estiana) text-[26px] leading-none tracking-[-0.01em] text-[#0e0e10]">
            Motifly
          </span>
        </Link>

        <nav className="hidden rounded-full bg-white/25 p-1.5 ring-1 ring-white/40 md:block">
          <ul className="flex gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    buttonVariants({ variant: isActive(item.href) ? "default" : "secondary", size: "sm" }),
                    "rounded-full text-sm",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:hidden">
          <Drawer direction="top">
            <DrawerTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "h-10 w-10 rounded-full")}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
              <div className="flex flex-col gap-2 p-6">
                {navItems.map((item) => (
                  <DrawerClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        buttonVariants({ variant: isActive(item.href) ? "default" : "outline", size: "lg" }),
                        "h-12 w-full justify-start rounded-full text-lg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </DrawerClose>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </header>
  );
}
