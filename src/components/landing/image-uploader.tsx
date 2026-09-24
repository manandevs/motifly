"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Container } from "@/components/landing/container";
import { getImages, saveImages } from "@/lib/image-db";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500"] });

// 12px white dashes with 11px gaps on all four sides (CSS `dashed` can't set dash length).
const dash = "rgba(255,255,255,0.85)";
const dashedBorder = {
  backgroundImage: [
    `linear-gradient(to right, ${dash} 12px, transparent 12px)`,
    `linear-gradient(to right, ${dash} 12px, transparent 12px)`,
    `linear-gradient(to bottom, ${dash} 12px, transparent 12px)`,
    `linear-gradient(to bottom, ${dash} 12px, transparent 12px)`,
  ].join(", "),
  backgroundSize: "23px 1px, 23px 1px, 1px 23px, 1px 23px",
  backgroundPosition: "top left, bottom left, top left, top right",
  backgroundRepeat: "repeat-x, repeat-x, repeat-y, repeat-y",
};

export function ImageUploader() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const openInCompressor = async (files: File[]) => {
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (!images.length) {
      toast.error("Please choose an image file.");
      return;
    }
    try {
      // Open the compressor on the first newly added image.
      const existing = await getImages();
      await saveImages(images);
      sessionStorage.setItem("selected-image-index", existing.length.toString());
      router.push("/tools/compressor");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Could not open that image. Please try again.");
    }
  };

  return (
    <section data-section="uploader" className="mt-16">
      <Container>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            openInCompressor(Array.from(e.dataTransfer.files));
          }}
          className={cn(
            montserrat.className,
            "relative flex h-58.25 items-center justify-center py-7.5 pr-10 pl-9 transition-colors",
            isDragging ? "bg-[#1a5bff]" : "bg-[#0046fd]",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              openInCompressor(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />

          <div
            className="flex h-full w-full flex-col items-center justify-center gap-7 text-white"
            style={dashedBorder}
          >
            <svg width="30" height="23" viewBox="0 0 30 23" fill="white" aria-hidden>
              <circle cx="3.4" cy="3.4" r="3.4" />
              <path d="M0 23 8.5 11.5 13 17 20.5 5.5 30 23Z" />
            </svg>

            <p className="text-[17px] leading-none">
              {isDragging ? (
                "Drop to start"
              ) : (
                <>
                  Drag and drop or{" "}
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="cursor-pointer underline underline-offset-[3px] hover:text-white/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    browse
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
