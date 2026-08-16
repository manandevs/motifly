"use client";

import React, { useRef, useState, useEffect } from "react";
import { Upload, RotateCw, RotateCcw, Plus, Minus } from "lucide-react";
import { saveImages } from "@/lib/image-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png" | "image/avif";

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
  cropPixels: { x: number; y: number; width: number; height: number } | null;
  onCropPixelsChange: (pixels: { x: number; y: number; width: number; height: number }) => void;
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
  cropPixels,
  onCropPixelsChange,
  onApplyCrop,
  onReset,
  onDownload,
  onUploadSuccess,
  disabled,
  hasResult,
}: CropperSettingsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [widthInput, setWidthInput] = useState<number>(0);
  const [heightInput, setHeightInput] = useState<number>(0);
  const [xInput, setXInput] = useState<number>(0);
  const [yInput, setYInput] = useState<number>(0);

  useEffect(() => {
    if (cropPixels) {
      setWidthInput(Math.round(cropPixels.width));
      setHeightInput(Math.round(cropPixels.height));
      setXInput(Math.round(cropPixels.x));
      setYInput(Math.round(cropPixels.y));
    }
  }, [cropPixels]);

  const handleInputChange = (field: "width" | "height" | "x" | "y", val: number) => {
    const num = isNaN(val) ? 0 : val;
    if (field === "width") setWidthInput(num);
    if (field === "height") setHeightInput(num);
    if (field === "x") setXInput(num);
    if (field === "y") setYInput(num);

    if (cropPixels) {
      onCropPixelsChange({
        width: field === "width" ? num : widthInput,
        height: field === "height" ? num : heightInput,
        x: field === "x" ? num : xInput,
        y: field === "y" ? num : yInput,
      });
    }
  };

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
              className="text-xs"
            >
              {ratio.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Numeric Input Controls with steppers */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Dimensions & Position (px)</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Width */}
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Width (px)</label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-r-none px-2"
                onClick={() => handleInputChange("width", Math.max(10, widthInput - 10))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={widthInput}
                onChange={(e) => handleInputChange("width", Number(e.target.value))}
                className="h-9 rounded-none text-center text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-l-none px-2"
                onClick={() => handleInputChange("width", widthInput + 10)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Height */}
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Height (px)</label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-r-none px-2"
                onClick={() => handleInputChange("height", Math.max(10, heightInput - 10))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={heightInput}
                onChange={(e) => handleInputChange("height", Number(e.target.value))}
                className="h-9 rounded-none text-center text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-l-none px-2"
                onClick={() => handleInputChange("height", heightInput + 10)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Position X */}
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Position X (px)</label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-r-none px-2"
                onClick={() => handleInputChange("x", xInput - 5)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={xInput}
                onChange={(e) => handleInputChange("x", Number(e.target.value))}
                className="h-9 rounded-none text-center text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-l-none px-2"
                onClick={() => handleInputChange("x", xInput + 5)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Position Y */}
          <div className="space-y-1">
            <label className="text-muted-foreground text-xs">Position Y (px)</label>
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-r-none px-2"
                onClick={() => handleInputChange("y", yInput - 5)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Input
                type="number"
                value={yInput}
                onChange={(e) => handleInputChange("y", Number(e.target.value))}
                className="h-9 rounded-none text-center text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-9 rounded-l-none px-2"
                onClick={() => handleInputChange("y", yInput + 5)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Zoom: <span className="text-primary">{zoom.toFixed(1)}x</span></h3>
        </div>
        <Slider
          value={[zoom]}
          onValueChange={(v) => onZoomChange(v[0])}
          min={1}
          max={3}
          step={0.1}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Rotation: <span className="text-primary">{rotation}°</span></h3>
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
        <div className="grid grid-cols-4 gap-1.5">
          {(["image/jpeg", "image/png", "image/webp", "image/avif"] as OutputFormat[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={outputFormat === f ? "default" : "outline"}
              onClick={() => onOutputFormatChange(f)}
              className="text-[11px] px-1"
            >
              {f.split("/")[1].toUpperCase()}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Quality: <span className="text-primary">{quality}%</span></h3>
        </div>
        <Slider
          value={[quality]}
          onValueChange={(v) => onQualityChange(v[0])}
          min={10}
          max={100}
          step={1}
        />
      </div>

      {/* Prominent Action Button */}
      <div className="flex flex-col gap-2 pt-4 border-t">
        <Button
          size="lg"
          className="w-full text-base font-semibold shadow-md transition-all hover:scale-[1.01]"
          onClick={onApplyCrop}
          disabled={disabled}
        >
          Crop IMAGE →
        </Button>
        <div className="grid grid-cols-2 gap-2 mt-2">
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
