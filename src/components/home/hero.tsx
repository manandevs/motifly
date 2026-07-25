"use client";

import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

import { getImages, saveImages } from "@/lib/image-db";

export function Hero() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadImages = async (files: File[]) => {
    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (!imageFiles.length) return;

    try {
      // Get the current images to determine the selected index
      const existingImages = await getImages();
      const startIndex = existingImages.length;

      // Save uploaded images
      await saveImages(imageFiles);

      // Store the selected image index for the compressor page
      sessionStorage.setItem("selected-image-index", startIndex.toString());

      // Navigate to the compressor tool
      router.push("/tools/compressor");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    await uploadImages(files);

    // Allow selecting the same file again
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);

    await uploadImages(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <section className="z-10 w-full">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="grid items-center gap-10 pt-24 md:grid-cols-2">
          {/* Left Content */}
          <div className="flex flex-col gap-4">
            <Pill>
              <p className="text-muted-foreground px-2 text-xs font-medium">All your creative tools in one place</p>
            </Pill>

            <h1 className="text-5xl leading-[1.1] font-medium tracking-tight lg:text-[54px]">
              Smarter Image
              <span className="text-muted-foreground block">Editing Starts Here.</span>
            </h1>

            <p className="max-w-lg leading-6 tracking-tight lg:text-xl">
              From background removal to smart compression and format conversion, transform your images effortlessly with intelligent tools designed for speed and precision.
            </p>

            <Button size="lg" className="mt-10 w-fit" asChild>
              <Link href="/tools/compressor">Explore Tools</Link>
            </Button>
          </div>

          {/* Upload Card */}
          <div className="flex items-center justify-center">
            <div className="bg-background border-border w-full rounded-2xl border p-4 shadow-lg">
              <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />

              <div
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-primary/20 bg-muted/30 hover:border-primary/60 hover:bg-muted/40 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-24 text-center transition-colors"
              >
                <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-primary h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <p className="text-muted-foreground">
                  Drag &amp; drop your image
                  <br />
                  or click to browse from your device.
                </p>

                <p className="text-muted-foreground mt-3 text-sm">Supports JPG, PNG, WebP, AVIF, GIF, SVG, and more.</p>

                <Button
                  className="mt-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Choose Files
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
