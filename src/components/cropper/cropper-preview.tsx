"use client";

import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { Trash2, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CropRect, ResizeHandle, Size, getRotatedSize, moveCrop, resizeCrop } from "@/lib/crop-image";

const STAGE_PADDING = 24;
const MIN_CROP_DISPLAY_SIZE = 20;

const handles: { id: ResizeHandle; className: string; cursor: string }[] = [
  { id: "nw", className: "left-0 top-0", cursor: "nwse-resize" },
  { id: "n", className: "left-1/2 top-0", cursor: "ns-resize" },
  { id: "ne", className: "left-full top-0", cursor: "nesw-resize" },
  { id: "e", className: "left-full top-1/2", cursor: "ew-resize" },
  { id: "se", className: "left-full top-full", cursor: "nwse-resize" },
  { id: "s", className: "left-1/2 top-full", cursor: "ns-resize" },
  { id: "sw", className: "left-0 top-full", cursor: "nesw-resize" },
  { id: "w", className: "left-0 top-1/2", cursor: "ew-resize" },
];

interface CropperPreviewProps {
  imageSrc: string;
  imageSize: Size | null;
  rotation: number;
  aspectRatio: number | undefined;
  crop: CropRect | null;
  onCropChange: (crop: CropRect) => void;
  images: File[];
  selectedImage: File | null;
  onSelectImage: (file: File) => void;
  onDeleteImage: (index: number) => void;
  previewUrls: Record<string, string>;
  croppedResult: {
    url: string;
    width: number;
    height: number;
    size: number;
  } | null;
  onDownload: () => void;
}

export default function CropperPreview({
  imageSrc,
  imageSize,
  rotation,
  aspectRatio,
  crop,
  onCropChange,
  images,
  selectedImage,
  onSelectImage,
  onDeleteImage,
  previewUrls,
  croppedResult,
  onDownload,
}: CropperPreviewProps) {
  const [containerRef, container] = useMeasure();
  const dragRef = useRef<{
    handle: ResizeHandle | "move";
    startX: number;
    startY: number;
    startCrop: CropRect;
  } | null>(null);

  const bounds = imageSize ? getRotatedSize(imageSize, rotation) : null;
  const scale =
    bounds && container.width > 0
      ? Math.min(
          (container.width - STAGE_PADDING * 2) / bounds.width,
          (container.height - STAGE_PADDING * 2) / bounds.height,
        )
      : 0;

  const startDrag = (handle: ResizeHandle | "move") => (e: React.PointerEvent<HTMLDivElement>) => {
    if (!crop || e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { handle, startX: e.clientX, startY: e.clientY, startCrop: crop };
  };

  const onDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || !bounds || scale <= 0) return;
    const dx = (e.clientX - drag.startX) / scale;
    const dy = (e.clientY - drag.startY) / scale;
    onCropChange(
      drag.handle === "move"
        ? moveCrop(drag.startCrop, dx, dy, bounds)
        : resizeCrop(drag.startCrop, drag.handle, dx, dy, bounds, MIN_CROP_DISPLAY_SIZE / scale, aspectRatio),
    );
  };

  const endDrag = () => {
    dragRef.current = null;
  };

  const dragProps = (handle: ResizeHandle | "move") => ({
    onPointerDown: startDrag(handle),
    onPointerMove: onDrag,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="bg-muted/50 border-border text-muted-foreground rounded-xl border px-4 py-2.5 text-xs">
        💡 Tip: Drag inside the box to move it, drag the handles to resize, or enter exact values in the sidebar.
      </div>

      <div
        ref={containerRef}
        className="relative flex h-125 w-full touch-none items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-inner select-none"
      >
        {imageSrc && bounds && scale > 0 && crop ? (
          <div className="relative" style={{ width: bounds.width * scale, height: bounds.height * scale }}>
            <img
              src={imageSrc}
              alt={selectedImage?.name ?? "Image to crop"}
              draggable={false}
              className="pointer-events-none absolute max-w-none"
              style={{
                width: imageSize!.width * scale,
                height: imageSize!.height * scale,
                left: (bounds.width - imageSize!.width) * scale * 0.5,
                top: (bounds.height - imageSize!.height) * scale * 0.5,
                transform: `rotate(${rotation}deg)`,
              }}
            />

            {/* Crop box: the huge shadow dims everything outside it */}
            <div
              className="absolute cursor-move border border-dashed border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]"
              style={{
                left: crop.x * scale,
                top: crop.y * scale,
                width: crop.width * scale,
                height: crop.height * scale,
              }}
              {...dragProps("move")}
            >
              {handles.map((handle) => (
                <div
                  key={handle.id}
                  className={`absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-neutral-300 bg-white shadow ${handle.className}`}
                  style={{ cursor: handle.cursor }}
                  {...dragProps(handle.id)}
                />
              ))}
            </div>
          </div>
        ) : imageSrc ? (
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-700 border-t-neutral-300" />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center text-neutral-400">
            <ImageIcon className="mb-3 h-12 w-12 opacity-40" />
            <p className="text-sm font-medium">No image selected. Upload an image to start cropping.</p>
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
                  isSelected ? "border-primary scale-105 shadow-md" : "border-border hover:border-muted-foreground"
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
                  aria-label={`Delete ${file.name}`}
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
      {croppedResult && (
        <div className="bg-card border-border animate-in fade-in flex flex-col gap-4 rounded-xl border p-6 shadow-sm duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Cropped Output Preview</h3>
              <p className="text-muted-foreground text-xs">
                Dimensions: {croppedResult.width} × {croppedResult.height}px | Size:{" "}
                {(croppedResult.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button size="sm" onClick={onDownload} className="gap-2 font-semibold">
              <Download className="h-4 w-4" /> Download Cropped Image
            </Button>
          </div>
          <div className="flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <img
              src={croppedResult.url}
              alt="Cropped Preview"
              className="max-h-80 w-auto rounded object-contain shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
