"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Preview from "@/components/compressor/preview";
import Settings, { OutputFormat, ResizeOption } from "@/components/compressor/settings";
import Stats from "@/components/compressor/stats";
import { deleteImage, getImages } from "@/lib/image-db";
import ImageItem from "@/components/compressor/image-item";

const resizeOptions: ResizeOption[] = [
  { label: "Original", value: 100 },
  { label: "75%", value: 75 },
  { label: "50%", value: 50 },
  { label: "25%", value: 25 },
];

export default function CompressorPage() {
  const [images, setImages] = useState<File[]>([]);
  const [quality, setQuality] = useState(75);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [resize, setResize] = useState<ResizeOption>(resizeOptions[0]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const [compressedResult, setCompressedResult] = useState<{
    url: string;
    blob: Blob;
    size: number;
    width: number;
    height: number;
  } | null>(null);

  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });

  // Load from DB
  const loadImagesFromDB = useCallback(async (newFile?: File) => {
    const files = await getImages();
    setImages(files);

    if (!files.length) {
      setSelectedImage(null);
      return;
    }

    // 1. Priority: If a file was passed directly (via Settings upload)
    if (newFile) {
      setSelectedImage(newFile);
      return;
    }

    // 2. Secondary: Check if we just came from the Home page (sessionStorage)
    const savedIndex = sessionStorage.getItem("selected-image-index");

    if (savedIndex !== null) {
      const index = Number(savedIndex);
      // Clear it immediately so it doesn't reset selection on every refresh
      sessionStorage.removeItem("selected-image-index");

      if (!Number.isNaN(index) && files[index]) {
        setSelectedImage(files[index]);
        return;
      }
    }

    // 3. Fallback: Keep current selection or default to the first image
    setSelectedImage((prev) => {
      // If we already have a selection that still exists in the new file list, keep it
      if (prev && files.some((f) => f.name === prev.name && f.size === prev.size)) {
        return prev;
      }
      return files[0];
    });
  }, []);

  // Ensure initial load calls the updated function
  useEffect(() => {
    loadImagesFromDB();
  }, [loadImagesFromDB]);

  // Handle previews for the list
  const listPreviewUrls = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images]);
  useEffect(() => () => listPreviewUrls.forEach((url) => URL.revokeObjectURL(url)), [listPreviewUrls]);

  // Handle preview for selected original
  const selectedOriginalUrl = useMemo(() => {
    if (!selectedImage) return "";
    return URL.createObjectURL(selectedImage);
  }, [selectedImage]);

  useEffect(
    () => () => {
      if (selectedOriginalUrl) URL.revokeObjectURL(selectedOriginalUrl);
    },
    [selectedOriginalUrl],
  );

  // THE COMPRESSION ENGINE
  useEffect(() => {
    if (!selectedImage) return;

    const compress = async () => {
      setIsCompressing(true);
      const img = new Image();
      const objectUrl = URL.createObjectURL(selectedImage);
      img.src = objectUrl;

      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const scale = resize.value / 100;
        const targetWidth = img.width * scale;
        const targetHeight = img.height * scale;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        if (ctx) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                if (compressedResult?.url) URL.revokeObjectURL(compressedResult.url);
                setCompressedResult({
                  blob,
                  url: URL.createObjectURL(blob),
                  size: blob.size,
                  width: targetWidth,
                  height: targetHeight,
                });
              }
              setIsCompressing(false);
              URL.revokeObjectURL(objectUrl);
            },
            outputFormat,
            quality / 100,
          );
        }
      };
    };
    compress();
  }, [selectedImage, quality, outputFormat, resize]);

  const handleDownload = () => {
    if (!compressedResult || !selectedImage) return;
    const link = document.createElement("a");
    link.href = compressedResult.url;
    link.download = `compressed_${selectedImage.name.split(".")[0]}.${outputFormat.split("/")[1]}`;
    link.click();
  };

  const handleDelete = async (index: number) => {
    await deleteImage(index);

    const updatedImages = await getImages();

    setImages(updatedImages);

    if (updatedImages.length === 0) {
      setSelectedImage(null);
      setCompressedResult(null);
      return;
    }

    if (selectedImage === images[index]) {
      setSelectedImage(updatedImages[0]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-32">
      <div className="mb-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Preview
            originalImage={selectedOriginalUrl}
            compressedImage={compressedResult?.url}
            originalSize={selectedImage?.size}
            compressedSize={compressedResult?.size}
            originalWidth={originalDimensions.width}
            originalHeight={originalDimensions.height}
            compressedWidth={compressedResult?.width}
            compressedHeight={compressedResult?.height}
            isCompressing={isCompressing}
          />

          <div className="hidden md:grid gap-3 grid-cols-2">
            {images.map((img, i) => (
              <ImageItem
                key={i}
                index={i}
                image={img}
                previewUrl={listPreviewUrls[i]}
                isSelected={selectedImage === img}
                onCompress={setSelectedImage}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Settings
            quality={quality}
            onQualityChange={setQuality}
            outputFormat={outputFormat}
            onOutputFormatChange={setOutputFormat}
            resize={resize}
            resizeOptions={resizeOptions}
            onResizeChange={setResize}
            onDownload={handleDownload}
            onUploadSuccess={loadImagesFromDB}
            disabled={isCompressing || !selectedImage}
          />
          <Stats
            quality={quality}
            outputFormat={outputFormat}
            resize={resize}
            originalSize={selectedImage?.size}
            compressedSize={compressedResult?.size}
            savings={
              selectedImage && compressedResult
                ? Math.round(((selectedImage.size - compressedResult.size) / selectedImage.size) * 100)
                : 0
            }
          />
        </div>

          <div className="md:hidden grid grid-cols-1 gap-3">
            {images.map((img, i) => (
              <ImageItem
                key={i}
                index={i}
                image={img}
                previewUrl={listPreviewUrls[i]}
                isSelected={selectedImage === img}
                onCompress={setSelectedImage}
                onDelete={handleDelete}
              />
            ))}
          </div>
      </div>
    </div>
  );
}
