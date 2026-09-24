"use client";

import { useRef, useState } from "react";
import { Montserrat } from "next/font/google";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

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

interface UploadDropzoneProps {
  /** Called with the dropped or chosen image files (non-images are filtered out). */
  onFiles: (files: File[]) => void | Promise<void>;
  /** Override the height or spacing, e.g. `h-44` in a narrow sidebar. */
  className?: string;
  multiple?: boolean;
}

/** Blue "Drag and drop or browse" image uploader, shared by the landing page and every tool. */
export function UploadDropzone({ onFiles, className, multiple = true }: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (list: FileList | null) => {
    const images = Array.from(list ?? []).filter((file) => file.type.startsWith("image/"));
    if (!images.length) {
      toast.error("Please choose an image file.");
      return;
    }
    await onFiles(images);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        // Keep pages that also accept drops on <main> from handling the same files twice.
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        montserrat.className,
        "relative flex h-58.25 w-full items-center justify-center py-7.5 pr-10 pl-9 transition-colors",
        isDragging ? "bg-[#1a5bff]" : "bg-[#0046fd]",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        className="flex h-full w-full flex-col items-center justify-center gap-7 text-center text-white"
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
  );
}
