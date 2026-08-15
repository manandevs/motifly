"use client";

import React from "react";
import Cropper from "react-easy-crop";
import { Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CropperPreviewProps {
  imageSrc: string;
  crop: { x: number; y: number };
  onCropChange: (crop: { x: number; y: number }) => void;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  rotation: number;
  aspectRatio: number | undefined;
  onCropComplete: (
    _croppedArea: { x: number; y: number; width: number; height: number },
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => void;
  images: File[];
  selectedImage: File | null;
  onSelectImage: (file: File) => void;
  onDeleteImage: (index: number) => void;
  previewUrls: Record<string, string>;
  compressedResult: {
    url: string;
    width: number;
    height: number;
    size: number;
  } | null;
  onDownload: () => void;
}

export default function CropperPreview({
  imageSrc,
  crop,
  onCropChange,
  zoom,
  onZoomChange,
  rotation,
  aspectRatio,
  onCropComplete,
  images,
  selectedImage,
  onSelectImage,
  onDeleteImage,
  previewUrls,
  compressedResult,
  onDownload,
}: CropperPreviewProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Main Cropper Stage */}
      <div className="bg-card border-border relative flex h-[450px] w-full items-center justify-center overflow-hidden rounded-2xl border shadow-sm">
        {imageSrc ? (
          <div className="relative h-full w-full">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspectRatio}
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <div className="text-muted-foreground flex flex-col items-center justify-center p-8 text-center">
            <p>No image selected. Upload an image to start cropping.</p>
          </div>
        )}
      </div>

      {/* Image Thumbnails Strip */}
      {images.length > 0 && (
        <div className="bg-card border-border flex items-center gap-3 overflow-x-auto rounded-xl border p-3">
          {images.map((file, index) => {
            const key = `${file.name}-${file.size}-${file.lastModified}`;
            const url = previewUrls[key];
            const isSelected = selectedImage === file;

            return (
              <div
                key={key}
                className={`group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 transition-all ${
                  isSelected ? "border-primary shadow-md" : "border-border hover:border-muted-foreground"
                }`}
                onClick={() => onSelectImage(file)}
              >
                {url ? (
                  <img src={url} alt={file.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="bg-muted h-full w-full animate-pulse" />
                )}

                <button
                  type="button"
                  className="bg-background/80 hover:bg-destructive hover:text-destructive-foreground absolute top-1 right-1 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteImage(index);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Cropped Result Preview (if applied) */}
      {compressedResult && (
        <div className="bg-card border-border flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Cropped Output Preview</h3>
            <Button size="sm" onClick={onDownload} className="gap-2">
              <Download className="h-4 w-4" /> Download Cropped ({compressedResult.width} × {compressedResult.height}px)
            </Button>
          </div>
          <div className="flex items-center justify-center bg-muted/30 rounded-lg p-4">
            <img
              src={compressedResult.url}
              alt="Cropped Preview"
              className="max-h-[300px] w-auto rounded object-contain shadow"
            />
          </div>
        </div>
      )}
    </div>
  );
}
