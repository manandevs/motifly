"use client";

import { useEffect, useState, useCallback } from "react";
import CropperPreview from "@/components/cropper/cropper-preview";
import CropperSettings, { AspectRatioOption, OutputFormat } from "@/components/cropper/cropper-settings";
import { deleteImage, getImages, saveImages } from "@/lib/image-db";
import { getCroppedImg } from "@/lib/crop-image";
import { toast } from "sonner";

const aspectRatios: AspectRatioOption[] = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 / 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:2", value: 3 / 2 },
  { label: "9:16", value: 9 / 16 },
];

export default function CropperPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Motifly Image Cropper",
    url: "https://motifly.vercel.app/tools/cropper",
    description: "Browser-based online image cropper supporting custom aspect ratios, rotation, zoom, and formats.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const [images, setImages] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [selectedOriginalUrl, setSelectedOriginalUrl] = useState<string>("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const [compressedResult, setCompressedResult] = useState<{
    url: string;
    blob: Blob;
    width: number;
    height: number;
    size: number;
  } | null>(null);

  const loadImagesFromDB = useCallback(async (newFile?: File) => {
    const files = await getImages();
    setImages(files);

    if (!files.length) {
      setSelectedImage(null);
      return;
    }

    if (newFile) {
      setSelectedImage(newFile);
      return;
    }

    const savedIndex = sessionStorage.getItem("selected-image-index");
    if (savedIndex !== null) {
      const index = Number(savedIndex);
      sessionStorage.removeItem("selected-image-index");
      if (!Number.isNaN(index) && files[index]) {
        setSelectedImage(files[index]);
        return;
      }
    }

    setSelectedImage((prev) => {
      if (prev && files.some((f) => f.name === prev.name && f.size === prev.size)) {
        return prev;
      }
      return files[0];
    });
  }, []);

  useEffect(() => {
    loadImagesFromDB();
  }, [loadImagesFromDB]);

  useEffect(() => {
    const urls: Record<string, string> = {};
    images.forEach((file) => {
      const key = `${file.name}-${file.size}-${file.lastModified}`;
      urls[key] = URL.createObjectURL(file);
    });
    setPreviewUrls(urls);

    return () => {
      Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  useEffect(() => {
    if (!selectedImage) {
      setSelectedOriginalUrl("");
      setCompressedResult(null);
      return;
    }
    const url = URL.createObjectURL(selectedImage);
    setSelectedOriginalUrl(url);
    setCompressedResult(null);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedImage]);

  const onCropComplete = useCallback(
    (_croppedArea: { x: number; y: number; width: number; height: number }, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropPixelsChange = (pixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(pixels);
  };

  const handleApplyCrop = async () => {
    if (!selectedOriginalUrl || !croppedAreaPixels) {
      toast.error("Please select an image and crop area first.");
      return;
    }

    try {
      const res = await getCroppedImg(
        selectedOriginalUrl,
        croppedAreaPixels,
        rotation,
        outputFormat,
        quality / 100
      );
      setCompressedResult(res);
      toast.success("Image cropped successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image.");
    }
  };

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setAspectRatio(undefined);
    setCompressedResult(null);
    toast.info("Crop settings reset.");
  };

  const handleDownload = () => {
    if (!compressedResult || !selectedImage) return;
    const link = document.createElement("a");
    link.href = compressedResult.url;
    const ext = outputFormat.split("/")[1];
    link.download = `cropped_${selectedImage.name.replace(/\.[^/.]+$/, "")}.${ext}`;
    link.click();
    toast.success("Download started!");
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
    toast.success("Image deleted.");
  };

  const handleUploadSuccess = (file: File) => {
    setSelectedImage(file);
    loadImagesFromDB(file);
    toast.success("Image uploaded successfully!");
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length > 0) {
      await saveImages(files);
      handleUploadSuccess(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <main
      className="min-h-screen py-28"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Image Cropper</h1>
          <p className="text-muted-foreground mt-2">
            Crop, rotate, and resize your images instantly with precision pixel dimensions and aspect ratios.
          </p>
        </header>

        {/* Dual-Panel Workspace Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Panel: Interactive Workspace / Canvas */}
          <div className="lg:col-span-2">
            <CropperPreview
              imageSrc={selectedOriginalUrl}
              crop={crop}
              onCropChange={setCrop}
              zoom={zoom}
              onZoomChange={setZoom}
              rotation={rotation}
              aspectRatio={aspectRatio}
              onCropComplete={onCropComplete}
              images={images}
              selectedImage={selectedImage}
              onSelectImage={setSelectedImage}
              onDeleteImage={handleDelete}
              previewUrls={previewUrls}
              compressedResult={compressedResult}
              onDownload={handleDownload}
            />
          </div>

          {/* Right Sidebar: Crop Options Panel */}
          <div>
            <CropperSettings
              aspectRatio={aspectRatio}
              aspectRatios={aspectRatios}
              onAspectRatioChange={setAspectRatio}
              zoom={zoom}
              onZoomChange={setZoom}
              rotation={rotation}
              onRotationChange={setRotation}
              outputFormat={outputFormat}
              onOutputFormatChange={setOutputFormat}
              quality={quality}
              onQualityChange={setQuality}
              cropPixels={croppedAreaPixels}
              onCropPixelsChange={handleCropPixelsChange}
              onApplyCrop={handleApplyCrop}
              onReset={handleReset}
              onDownload={handleDownload}
              onUploadSuccess={handleUploadSuccess}
              disabled={!selectedOriginalUrl}
              hasResult={Boolean(compressedResult)}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
