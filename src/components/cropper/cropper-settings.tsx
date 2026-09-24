"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, RotateCw, RotateCcw, Plus, Minus } from "lucide-react";
import { saveImages } from "@/lib/image-db";
import { CropRect } from "@/lib/crop-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

const outputFormats: { value: OutputFormat; label: string }[] = [
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WEBP" },
];

export interface AspectRatioOption {
  label: string;
  value: number | undefined;
}

interface CropperSettingsProps {
  aspectRatio: number | undefined;
  aspectRatios: AspectRatioOption[];
  onAspectRatioChange: (ratio: number | undefined) => void;
  rotation: number;
  onRotationChange: (rotation: number) => void;
  outputFormat: OutputFormat;
  onOutputFormatChange: (format: OutputFormat) => void;
  quality: number;
  onQualityChange: (quality: number) => void;
  crop: CropRect | null;
  onCropFieldChange: (field: keyof CropRect, value: number) => void;
  onApplyCrop: () => void;
  onReset: () => void;
  onDownload: () => void;
  onUploadSuccess: (file: File) => void;
  disabled?: boolean;
  hasResult?: boolean;
}

const cropFields: { field: keyof CropRect; label: string; step: number }[] = [
  { field: "width", label: "Width (px)", step: 10 },
  { field: "height", label: "Height (px)", step: 10 },
  { field: "x", label: "Position X (px)", step: 5 },
  { field: "y", label: "Position Y (px)", step: 5 },
];

function CropNumberField({
  label,
  value,
  step,
  disabled,
  onCommit,
}: {
  label: string;
  value: number;
  step: number;
  disabled?: boolean;
  onCommit: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  // Keep the field in sync while the crop box is dragged.
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  // Commit typed values on blur / Enter so partially typed numbers aren't clamped mid-typing.
  const commit = () => {
    const num = Number(draft);
    if (draft.trim() === "" || Number.isNaN(num)) setDraft(String(value));
    else onCommit(num);
  };

  return (
    <div className="space-y-1">
      <label className="text-muted-foreground text-xs">{label}</label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 rounded-r-none px-2"
          disabled={disabled}
          onClick={() => onCommit(value - step)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={draft}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="h-9 rounded-none text-center text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 rounded-l-none px-2"
          disabled={disabled}
          onClick={() => onCommit(value + step)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}

export default function CropperSettings({
  aspectRatio,
  aspectRatios,
  onAspectRatioChange,
  rotation,
  onRotationChange,
  outputFormat,
  onOutputFormatChange,
  quality,
  onQualityChange,
  crop,
  onCropFieldChange,
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
    <div className="bg-card border-border flex w-full flex-col gap-6 rounded-2xl border p-6 shadow-sm">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold tracking-tight">Crop options</h2>
        <p className="text-muted-foreground text-xs">Configure exact dimensions and export parameters</p>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-medium">Upload Image</h3>
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
          className="hover:bg-accent/50 flex h-auto w-full flex-col gap-2 border-2 border-dashed py-6 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="text-primary h-5 w-5" />
          <span className="text-xs font-medium">Click to Upload / Drop Image</span>
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
              disabled={disabled}
              className="text-xs"
            >
              {ratio.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Dimensions & Position (px)</h3>
        <div className="grid grid-cols-2 gap-3">
          {cropFields.map(({ field, label, step }) => (
            <CropNumberField
              key={field}
              label={label}
              step={step}
              value={crop ? Math.round(crop[field]) : 0}
              disabled={disabled || !crop}
              onCommit={(value) => onCropFieldChange(field, value)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">
            Rotation: <span className="text-primary">{rotation}°</span>
          </h3>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              aria-label="Rotate left 90°"
              disabled={disabled}
              onClick={() => onRotationChange((rotation - 90 + 360) % 360)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7"
              aria-label="Rotate right 90°"
              disabled={disabled}
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
          max={359}
          step={1}
          disabled={disabled}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Output Format</h3>
        <div className="grid grid-cols-3 gap-1.5">
          {outputFormats.map((f) => (
            <Button
              key={f.value}
              size="sm"
              variant={outputFormat === f.value ? "default" : "outline"}
              onClick={() => onOutputFormatChange(f.value)}
              className="text-xs"
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {/* PNG is lossless, so the quality setting only applies to JPEG / WEBP */}
      {outputFormat !== "image/png" && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">
            Quality: <span className="text-primary">{quality}%</span>
          </h3>
          <Slider value={[quality]} onValueChange={(v) => onQualityChange(v[0])} min={10} max={100} step={1} />
        </div>
      )}

      <div className="flex flex-col gap-2 border-t pt-4">
        <Button
          size="lg"
          className="w-full text-base font-semibold shadow-md transition-all hover:scale-[1.01]"
          onClick={onApplyCrop}
          disabled={disabled || !crop}
        >
          Crop Image →
        </Button>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onReset} disabled={disabled} size="sm">
            Reset
          </Button>
          <Button variant="secondary" onClick={onDownload} disabled={!hasResult} size="sm">
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
