"use client";

import Image from "next/image";

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
}

const formatSize = (bytes?: number) => {
  if (!bytes) return "--";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
};

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
}: PreviewProps) {
  return (
    <div className="bg-background flex flex-col gap-4 rounded-lg border p-6">
      <div>
        <h2 className="text-lg font-semibold">Image Preview</h2>

        <p className="text-muted-foreground text-sm">Compare the original and compressed image.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Original */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Original</h3>

            <span className="text-muted-foreground text-sm">{formatSize(originalSize)}</span>
          </div>

          <div className="bg-muted relative aspect-square overflow-hidden rounded-sm border">
            {originalImage ? (
              <Image src={originalImage} alt="Original" fill className="object-contain" />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center">No Image</div>
            )}
          </div>

          <p className="text-muted-foreground text-center text-xs">
            {originalWidth && originalHeight ? `${originalWidth} × ${originalHeight}px` : "--"}
          </p>
        </div>

        {/* Compressed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Compressed</h3>

            <span className="text-sm font-medium text-green-600">{formatSize(compressedSize)}</span>
          </div>

          <div className="bg-muted relative aspect-square overflow-hidden rounded-sm border">
            {isCompressing ? (
              <div className="flex h-full items-center justify-center">Compressing...</div>
            ) : compressedImage ? (
              <Image src={compressedImage} alt="Compressed" fill className="object-contain" />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center">No Image</div>
            )}
          </div>

          <p className="text-muted-foreground text-center text-xs">
            {compressedWidth && compressedHeight ? `${compressedWidth} × ${compressedHeight}px` : "--"}
          </p>
        </div>
      </div>
    </div>
  );
}
