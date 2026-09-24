"use client";

import { Download, RotateCcw, RotateCw, Sparkles } from "lucide-react";
import { saveImages } from "@/lib/image-db";
import { CropRect } from "@/lib/crop-image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UploadDropzone } from "@/components/shared/upload-dropzone";
import { NumberStepper, PillSelect, SettingsActions, SettingsGroup, SettingsPanel } from "@/components/tool/tool-ui";

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
  const handleFiles = async (files: File[]) => {
    await saveImages(files);
    onUploadSuccess(files[0]);
  };

  return (
    <SettingsPanel title="Crop" accent="Options" description="Set the shape, exact size and export format.">
      <SettingsGroup title="Upload Image">
        <UploadDropzone onFiles={handleFiles} className="h-44" />
      </SettingsGroup>

      <SettingsGroup title="Aspect Ratio">
        <PillSelect options={aspectRatios} value={aspectRatio} onChange={onAspectRatioChange} disabled={disabled} />
      </SettingsGroup>

      <SettingsGroup title="Dimensions & Position (px)">
        <div className="grid grid-cols-2 gap-3">
          {cropFields.map(({ field, label, step }) => (
            <NumberStepper
              key={field}
              label={label}
              step={step}
              value={crop ? Math.round(crop[field]) : 0}
              disabled={disabled || !crop}
              onCommit={(value) => onCropFieldChange(field, value)}
            />
          ))}
        </div>
      </SettingsGroup>

      <SettingsGroup
        title="Rotation"
        value={`${rotation}°`}
        action={
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              aria-label="Rotate left 90°"
              disabled={disabled}
              onClick={() => onRotationChange((rotation - 90 + 360) % 360)}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              aria-label="Rotate right 90°"
              disabled={disabled}
              onClick={() => onRotationChange((rotation + 90) % 360)}
            >
              <RotateCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        }
      >
        <Slider
          value={[rotation]}
          onValueChange={(v) => onRotationChange(v[0])}
          min={0}
          max={359}
          step={1}
          disabled={disabled}
        />
      </SettingsGroup>

      <SettingsGroup title="Output Format">
        <PillSelect options={outputFormats} value={outputFormat} onChange={onOutputFormatChange} />
      </SettingsGroup>

      {/* PNG is lossless, so the quality setting only applies to JPEG / WEBP */}
      {outputFormat !== "image/png" && (
        <SettingsGroup title="Quality" value={`${quality}%`}>
          <Slider value={[quality]} onValueChange={(v) => onQualityChange(v[0])} min={10} max={100} step={1} />
        </SettingsGroup>
      )}

      <SettingsActions>
        <Button
          size="lg"
          className="h-12 w-full rounded-full text-base"
          onClick={onApplyCrop}
          disabled={disabled || !crop}
        >
          Crop Image <Sparkles className="size-4.5" />
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={onReset} disabled={disabled} className="h-10 rounded-full">
            Reset
          </Button>
          <Button variant="dark" onClick={onDownload} disabled={!hasResult} className="h-10 rounded-full">
            <Download /> Download
          </Button>
        </div>
      </SettingsActions>
    </SettingsPanel>
  );
}
