"use client";

import React, { useRef } from "react";
import useMeasure from "react-use-measure";
import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Accent } from "@/components/landing/accent";
import { EmptyState, ImageThumbnails, PreviewArea, Spinner, ToolCard } from "@/components/tool/tool-ui";
import { CropRect, ResizeHandle, Size, getRotatedSize, moveCrop, resizeCrop } from "@/lib/crop-image";

const STAGE_PADDING = 24;

const MIN_CROP_DISPLAY_SIZE = 20;

// `position` places the handle's center on the crop box edge; `shape` draws it:
// bars along the edge they resize, L-shaped brackets hugging each corner.
const bar = "bg-[#4a3aff] rounded-full shadow-[0_0_0_1.5px_#fff]";
const corner = "size-4 border-[#4a3aff] drop-shadow-[0_0_1px_#fff]";
const handles: { id: ResizeHandle; position: string; shape: string; cursor: string }[] = [
  {
    id: "nw",
    position: "left-0 top-0",
    shape: `${corner} absolute left-2.5 top-2.5 border-t-4 border-l-4`,
    cursor: "nwse-resize",
  },
  { id: "n", position: "left-1/2 top-0", shape: `${bar} h-1 w-8`, cursor: "ns-resize" },
  {
    id: "ne",
    position: "left-full top-0",
    shape: `${corner} absolute right-2.5 top-2.5 border-t-4 border-r-4`,
    cursor: "nesw-resize",
  },
  { id: "e", position: "left-full top-1/2", shape: `${bar} h-8 w-1`, cursor: "ew-resize" },
  {
    id: "se",
    position: "left-full top-full",
    shape: `${corner} absolute right-2.5 bottom-2.5 border-b-4 border-r-4`,
    cursor: "nwse-resize",
  },
  { id: "s", position: "left-1/2 top-full", shape: `${bar} h-1 w-8`, cursor: "ns-resize" },
  {
    id: "sw",
    position: "left-0 top-full",
    shape: `${corner} absolute left-2.5 bottom-2.5 border-b-4 border-l-4`,
    cursor: "nesw-resize",
  },
  { id: "w", position: "left-0 top-1/2", shape: `${bar} h-8 w-1`, cursor: "ew-resize" },
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
    <div className="flex w-full min-w-0 flex-col gap-6">
      {/* Workspace card */}
      <ToolCard
        title={
          <>
            Crop <Accent>Workspace</Accent>
          </>
        }
        pills={[
          imageSize && crop ? `${Math.round(crop.width)} × ${Math.round(crop.height)} px` : "No image",
          "Drag to move · handles to resize",
        ]}
      >
        {/* No padding: the crop box scale is measured from the full canvas size */}
        <PreviewArea ref={containerRef} className="touch-none p-0 select-none">
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
                className="absolute cursor-move border border-dashed border-white shadow-[0_0_0_9999px_rgba(14,14,16,0.55)]"
                style={{
                  left: crop.x * scale,
                  top: crop.y * scale,
                  width: crop.width * scale,
                  height: crop.height * scale,
                }}
                {...dragProps("move")}
              >
                {handles.map((handle) => (
                  // 24px invisible hit area centered on the edge, so the thin bars are easy to grab
                  <div
                    key={handle.id}
                    className={cn(
                      "absolute z-10 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                      handle.position,
                    )}
                    style={{ cursor: handle.cursor }}
                    {...dragProps(handle.id)}
                  >
                    <span className={handle.shape} />
                  </div>
                ))}
              </div>
            </div>
          ) : imageSrc ? (
            <Spinner />
          ) : (
            <EmptyState
              title="No image yet"
              hint="Drop an image anywhere on this page, or use Upload Image in the panel."
            />
          )}
        </PreviewArea>
      </ToolCard>

      <ImageThumbnails
        images={images}
        previewUrls={previewUrls}
        selected={selectedImage}
        onSelect={onSelectImage}
        onDelete={onDeleteImage}
      />

      {/* Cropped result: always visible, same preview height as the workspace */}
      <ToolCard
        title={
          <>
            Your <Accent>Cropped</Accent> Image
          </>
        }
        pills={
          croppedResult
            ? [`${croppedResult.width} × ${croppedResult.height} px`, `${(croppedResult.size / 1024).toFixed(1)} KB`]
            : ["Not cropped yet"]
        }
        action={
          <button
            type="button"
            onClick={onDownload}
            disabled={!croppedResult}
            className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-full")}
          >
            <Download /> Download
          </button>
        }
      >
        <PreviewArea>
          {croppedResult ? (
            <img
              src={croppedResult.url}
              alt="Cropped result"
              className="animate-in fade-in max-h-full max-w-full object-contain shadow-[0_12px_32px_rgba(14,14,16,0.16)] duration-300"
            />
          ) : (
            <EmptyState
              title="Nothing cropped yet"
              hint="Adjust the crop box, then press Crop Image to see the result here."
            />
          )}
        </PreviewArea>
      </ToolCard>
    </div>
  );
}
