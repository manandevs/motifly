"use client";

import React, { useRef } from "react";
import { ChevronDown, Upload } from "lucide-react";
import { saveImages } from "@/lib/image-db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
export interface ResizeOption {
  label: string;
  value: number;
}

interface SettingsProps {
  quality: number;
  onQualityChange: (v: number) => void;
  outputFormat: OutputFormat;
  onOutputFormatChange: (f: OutputFormat) => void;
  resize: ResizeOption;
  resizeOptions: ResizeOption[];
  onResizeChange: (o: ResizeOption) => void;
  customWidth: number;
  onCustomWidthChange: (w: number) => void;
  originalWidth: number;
  originalHeight: number;
  onDownload: () => void;
  onUploadSuccess: (file: File) => void;
  disabled?: boolean;
}

const Settings = ({
  quality,
  onQualityChange,
  outputFormat,
  onOutputFormatChange,
  resize,
  resizeOptions,
  onResizeChange,
  customWidth,
  onCustomWidthChange,
  originalWidth,
  originalHeight,
  onDownload,
  onUploadSuccess,
  disabled,
}: SettingsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      await saveImages(fileArray);
      onUploadSuccess(fileArray[0]); // Set the first of the new batch to preview
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-background flex w-full flex-col gap-6 rounded-lg border p-6 shadow-sm">
      <div className="flex flex-col gap-4 border-b pb-6">
        <h3 className="text-muted-foreground text-sm font-medium">Add Images</h3>
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
          className="hover:bg-accent/50 flex h-auto w-full flex-col gap-2 border-2 border-dashed py-10 transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="text-primary h-6 w-6" />
          <span className="font-semibold">Click to Upload</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">
            Quality: <span className="text-primary">{quality}%</span>
          </h2>
        </div>
        <Slider value={[quality]} onValueChange={(v) => onQualityChange(v[0])} min={5} max={100} step={1} />
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

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Resize (Width in px)</h3>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-1/2 justify-between">
                {resize.label} <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {resizeOptions.map((o) => (
                <DropdownMenuItem key={o.value} onClick={() => onResizeChange(o)}>
                  {o.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-1/2">
            <Input
              type="number"
              placeholder="Width (px)"
              value={customWidth || ""}
              onChange={(e) => onCustomWidthChange(Number(e.target.value))}
              className="h-10 text-xs"
            />
          </div>
        </div>
        {originalWidth > 0 && (
          <p className="text-muted-foreground text-xs">
            Original: {originalWidth} × {originalHeight}px (Height adjusts automatically)
          </p>
        )}
      </div>

      <Button className="mt-2 w-full" onClick={onDownload} disabled={disabled}>
        Download Result
      </Button>
    </div>
  );
};

export default Settings;
