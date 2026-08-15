"use client";

import React, { useRef } from "react";
import { Upload, RotateCw, RotateCcw } from "lucide-react";
import { saveImages } from "@/lib/image-db";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

export interface AspectRatioOption {
  label: string;
  value: number | undefined;
}

interface CropperSettingsProps {
  aspectRatio: number | undefined;
  aspectRatios: AspectRatioOption[];
  onAspectRatioChange: (ratio: number | undefined) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  outputFormat: OutputFormat;
  onOutputFormatChange: (format: OutputFormat) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  onApplyCrop: () => void;
  onReset: () => void;
  onDownload: () => void;
  onUploadSuccess: (file: File) => void;
  disabled?: boolean;
  hasResult?: boolean;
}

export default function CropperSettings({
  aspectRatio,
  aspectRatios,
  onAspectRatioChange,
  zoom,
  onZoomChange,
  rotation,
  onRotationChange,
  outputFormat,
  onOutputFormatChange,
  quality,
  onQualityChange,
  onApplyCrop,
  onReset,
  onDownload,
  onUploadSuccess,
  disabled,
  hasResult,
}: CropperSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      await saveImages(fileArray);
      onUploadSuccess(fileArray[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-background flex w-full flex-col gap-6 rounded-lg border p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b pb-6">
        <h3 className="text-muted-foreground text-sm font-medium">Upload Image</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="hidden"
        />
        <Button
          variant="outline"
          className="hover:bg-accent/50 flex h-auto w-full flex-col gap-2 border-2 border-dashed py-8 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="text-primary h-6 w-6" />
          <span className="font-semibold">Click to Upload / Drop</span>
        </Button>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Aspect Ratio</h3>
        <div className="grid grid-cols-3 gap-2">
          {aspectRatios.map((ratio) => (
            <Button
              key={ratio.label}
              size="sm"
              variant={aspectRatio === ratio.value ? "default" : "outline"}
              onClick={() => onAspectRatioChange(ratio.value)}
            >
              {ratio.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Zoom: <span className="text-primary">{zoom.toFixed(1)}x</span>
          </h2>
        </div>
        <Slider
          value={[zoom]}
          onValueChange={(v) => onZoomChange(v[0])}
          min={1}
          max={3}
          step={0.1}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Rotation: <span className="text-primary">{rotation}°</span>
          </h2>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => onRotationChange((rotation - 90 + 360) % 360)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              onClick={() => onRotationChange((rotation + 90) % 360)}
            >
              <RotateCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <Slider
          value={[rotation]}
          onValueChange={(v) => onRotationChange(v[0])}
          min={0}
          max={360}
          step={1}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Output Format</h3>
        <div className="grid grid-cols-3 gap-2">
          {(["image/jpeg", "image/webp", "image/png"] as OutputFormat[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={outputFormat === f ? "default" : "outline"}
              onClick={() => onOutputFormatChange(f)}
            >
              {f.split("/")[1].toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Quality: <span className="text-primary">{quality}%</span>
          </h2>
        </div>
        <Slider
          value={[quality]}
          onValueChange={(v) => onQualityChange(v[0])}
          min={10}
          max={100}
          step={1}
        />
      </div>

      <div className="flex flex-col gap-2 pt-2">
        <Button className="w-full" onClick={onApplyCrop} disabled={disabled}>
          Apply Crop
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onReset} disabled={disabled}>
            Reset
          </Button>
          <Button variant="secondary" onClick={onDownload} disabled={!hasResult}>
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
