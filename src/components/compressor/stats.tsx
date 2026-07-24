import React from "react";

import { OutputFormat, ResizeOption } from "./settings";

interface StatsProps {
  quality: number;
  outputFormat: OutputFormat;
  resize: ResizeOption;

  originalSize?: number;
  compressedSize?: number;
  savings?: number;
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return "--";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
};

const Stats = ({ quality, outputFormat, resize, originalSize, compressedSize, savings }: StatsProps) => {
  return (
    <div className="bg-background flex flex-col gap-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Compression Summary</h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border p-2">
          <p className="text-muted-foreground text-xs">Original Size</p>

          <p className="mt-1 text-lg font-semibold">{formatFileSize(originalSize ?? 0)}</p>
        </div>

        <div className="rounded-lg border p-2">
          <p className="text-muted-foreground text-xs">Compressed Size</p>

          <p className="mt-1 text-lg font-semibold text-green-600">{formatFileSize(compressedSize ?? 0)}</p>
        </div>
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Quality</span>

          <span className="font-medium">{quality}%</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Format</span>

          <span className="font-medium">{outputFormat.replace("image/", "").toUpperCase()}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Resize</span>

          <span className="font-medium">{resize.label}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Space Saved</span>

          <span className="font-semibold text-green-600">{savings ? `${savings}%` : "--"}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
