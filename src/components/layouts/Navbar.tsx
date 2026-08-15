"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";

const navItems = [
  {
    label: "Compressor",
    href: "/tools/compressor",
  },
  {
    label: "Cropper",
    href: "/tools/cropper",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Privacy",
    href: "/legal/privacy-policy",
  },
  {
    label: "Terms",
    href: "/legal/terms-and-conditions",
  },
];

export function Navbar() {
  const router = useRouter();
  return (
    <header
      className="pointer-events-none fixed top-0 z-30 w-full select-none"
      style={{
        height: "150px",
        background: "linear-gradient(to top, transparent, var(--background))",
        maskImage: "linear-gradient(to bottom, var(--background) 50%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, var(--background) 50%, transparent)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <nav className="pointer-events-auto z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex cursor-pointer items-center gap-2">
          <Image src="/logo.svg" alt="Motifly" width={110} height={32} priority className="max-h-8 w-auto" />
          <span className="hidden text-2xl sm:block">Motifly</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    href={item.href}
                    className="hover:text-primary cursor-pointer text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            onClick={() => {
              router.push("/tools/compressor");
            }}
          >
            Get Started
          </Button>
        </div>

        <div className="md:hidden">
          <Drawer direction="top">
            <DrawerTrigger className="hover:bg-accent cursor-pointer rounded-md p-2 transition-colors">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open Menu</span>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>

              <div className="flex flex-col gap-5 p-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-primary cursor-pointer text-lg font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                <Button
                  className="mt-2 w-full"
                  onClick={() => {
                    router.push("/tools/compressor");
                  }}
                >
                  Get Started
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}