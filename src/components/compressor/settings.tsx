"use client";

import { Download, RotateCcw } from "lucide-react";

import { saveImages } from "@/lib/image-db";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { UploadDropzone } from "@/components/shared/upload-dropzone";
import { NumberStepper, PillSelect, SettingsActions, SettingsGroup, SettingsPanel } from "@/components/tool/tool-ui";

export type OutputFormat = "image/jpeg" | "image/webp" | "image/png";
export interface ResizeOption {
  label: string;
  value: number;
}

const outputFormats: { label: string; value: OutputFormat }[] = [
  { label: "JPEG", value: "image/jpeg" },
  { label: "PNG", value: "image/png" },
  { label: "WEBP", value: "image/webp" },
];

interface SettingsProps {
  quality: number;
  onQualityChange: (v: number) => void;
  outputFormat: OutputFormat;
  onOutputFormatChange: (f: OutputFormat) => void;
  resize: ResizeOption;
  resizeOptions: ResizeOption[];
  onResizeChange: (o: ResizeOption) => void;
  isCustomResize: boolean;
  customWidth: number;
  onCustomWidthChange: (w: number) => void;
  originalWidth: number;
  originalHeight: number;
  onDownload: () => void;
  onReset: () => void;
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
  isCustomResize,
  customWidth,
  onCustomWidthChange,
  originalWidth,
  originalHeight,
  onDownload,
  onReset,
  onUploadSuccess,
  disabled,
}: SettingsProps) => {
  const handleFiles = async (files: File[]) => {
    await saveImages(files);
    onUploadSuccess(files[0]); // Set the first of the new batch to preview
  };

  return (
    <SettingsPanel title="Compress" accent="Options" description="Set the quality, output format and size.">
      <SettingsGroup title="Upload Image">
        <UploadDropzone onFiles={handleFiles} className="h-44" />
      </SettingsGroup>

      <SettingsGroup title="Quality" value={`${quality}%`}>
        <Slider value={[quality]} onValueChange={(v) => onQualityChange(v[0])} min={5} max={100} step={1} />
      </SettingsGroup>

      <SettingsGroup title="Output Format">
        <PillSelect options={outputFormats} value={outputFormat} onChange={onOutputFormatChange} />
      </SettingsGroup>

      <SettingsGroup title="Resize">
        <PillSelect
          columns={4}
          options={resizeOptions.map((o) => ({ label: o.label, value: o.value }))}
          // A typed custom width means none of the presets is active.
          value={isCustomResize ? -1 : resize.value}
          onChange={(value) => onResizeChange(resizeOptions.find((o) => o.value === value)!)}
        />
        <div className="mt-4">
          <NumberStepper
            label="Width (px)"
            value={customWidth}
            step={10}
            disabled={!originalWidth}
            onCommit={(w) => onCustomWidthChange(Math.max(1, Math.round(w)))}
          />
        </div>
        {originalWidth > 0 && (
          <p className="mt-2 text-xs text-[#7a7a85]">
            Original: {originalWidth} × {originalHeight} px. Height adjusts automatically.
          </p>
        )}
      </SettingsGroup>

      <SettingsActions>
        <Button size="lg" className="h-12 w-full rounded-full text-base" onClick={onDownload} disabled={disabled}>
          <Download className="size-4.5" /> Download Image
        </Button>
        <Button variant="outline" onClick={onReset} className="h-10 rounded-full">
          <RotateCcw /> Reset Settings
        </Button>
      </SettingsActions>
    </SettingsPanel>
  );
};

export default Settings;
