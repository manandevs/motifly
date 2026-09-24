"use client";

import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Accent } from "@/components/landing/accent";
import { EmptyState, PreviewArea, Spinner, ToolCard } from "@/components/tool/tool-ui";

interface PreviewProps {
  originalImage?: string;
  compressedImage?: string;
  originalSize?: number;
  compressedSize?: number;
  originalWidth?: number;
  originalHeight?: number;
  compressedWidth?: number;
  compressedHeight?: number;
  isCompressing?: boolean;
  onDownload: () => void;
  /** Rendered between the two cards, where the cropper shows its thumbnails. */
  thumbnails?: React.ReactNode;
}

const formatSize = (bytes: number) => {
  const kb = bytes / 1024;
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(2)} MB`;
};

/** Original and compressed image cards, stacked like the cropper's workspace and result. */
export default function Preview({
  originalImage,
  compressedImage,
  originalSize,
  compressedSize,
  originalWidth,
  originalHeight,
  compressedWidth,
  compressedHeight,
  isCompressing = false,
  onDownload,
  thumbnails,
}: PreviewProps) {
  const savings =
    originalSize && compressedSize ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : null;

  return (
    <>
      <ToolCard
        title={
          <>
            Your <Accent>Original</Accent> Image
          </>
        }
        pills={
          originalImage && originalWidth && originalSize
            ? [`${originalWidth} × ${originalHeight} px`, formatSize(originalSize)]
            : ["No image"]
        }
      >
        <PreviewArea>
          {originalImage ? (
            <img
              src={originalImage}
              alt="Original"
              className="max-h-full max-w-full object-contain shadow-[0_12px_32px_rgba(14,14,16,0.16)]"
            />
          ) : (
            <EmptyState
              title="No image yet"
              hint="Drop an image anywhere on this page, or use Upload Image in the panel."
            />
          )}
        </PreviewArea>
      </ToolCard>

      {thumbnails}

      <ToolCard
        title={
          <>
            Your <Accent>Compressed</Accent> Image
          </>
        }
        pills={
          compressedImage && compressedWidth && compressedSize && !isCompressing
            ? [
                `${compressedWidth} × ${compressedHeight} px`,
                formatSize(compressedSize),
                savings === null ? "" : savings >= 0 ? `${savings}% smaller` : `${-savings}% larger`,
              ].filter(Boolean)
            : [isCompressing ? "Compressing…" : "Not compressed yet"]
        }
        action={
          <button
            type="button"
            onClick={onDownload}
            disabled={!compressedImage || isCompressing}
            className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full")}
          >
            <Download /> Download
          </button>
        }
      >
        <PreviewArea>
          {isCompressing ? (
            <Spinner />
          ) : compressedImage ? (
            <img
              src={compressedImage}
              alt="Compressed"
              className="animate-in fade-in max-h-full max-w-full object-contain shadow-[0_12px_32px_rgba(14,14,16,0.16)] duration-300"
            />
          ) : (
            <EmptyState title="Nothing compressed yet" hint="Add an image and it will be compressed automatically." />
          )}
        </PreviewArea>
      </ToolCard>
    </>
  );
}
