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

const navItems = [
  {
    label: "Features",
    href: "/#features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Legal",
    href: "/terms-and-conditions",
  },
];

export function Navbar() {
  return (
    <header
      className="pointer-events-none fixed top-0 z-30 w-full select-none"
      style={{
        height: "150px",
        background: "linear-gradient(to top, transparent, #f5f4f3)",
        maskImage: "linear-gradient(to bottom, #f5f4f3 50%, transparent)",
        WebkitMaskImage: "linear-gradient(to bottom, #f5f4f3 50%, transparent)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <nav className="pointer-events-auto z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex cursor-pointer items-center">
          <Image src="/logo.svg" alt="Misfro" width={110} height={32} priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="hover:text-primary cursor-pointer text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <Button asChild>
            <Link href="/tools" className="cursor-pointer">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
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

                <Button asChild className="mt-2 w-full">
                  <Link href="/tools" className="cursor-pointer">
                    Get Started
                  </Link>
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
