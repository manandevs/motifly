import Link from "next/link";
import { ArrowRight, Crop, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ToolsGrid() {
  const tools = [
    {
      title: "Image Compressor",
      description: "Instantly reduce PNG, JPEG, and WebP file sizes locally in your browser with adjustable quality and resize options.",
      href: "/tools/compressor",
      icon: Sparkles,
      tag: "Popular",
    },
    {
      title: "Image Cropper",
      description: "Crop, rotate, and resize images with custom aspect ratios (1:1, 16:9, 4:3, etc.) and instant download.",
      href: "/tools/cropper",
      icon: Crop,
      tag: "New",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Available Creative Tools</h2>
        <p className="text-muted-foreground mt-2">Choose a tool to get started instantly with zero upload wait times.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.title}
              className="bg-card border-border relative flex flex-col justify-between rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md"
            >
              {tool.tag && (
                <span className="bg-primary text-primary-foreground absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-semibold">
                  {tool.tag}
                </span>
              )}

              <div className="space-y-4">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold">{tool.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{tool.description}</p>
              </div>

              <div className="mt-8">
                <Button asChild className="gap-2">
                  <Link href={tool.href}>
                    Launch Tool <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
