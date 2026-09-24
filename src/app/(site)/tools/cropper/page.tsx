"use client";

import { useEffect, useState, useCallback } from "react";
import CropperPreview from "@/components/cropper/cropper-preview";
import CropperSettings, { AspectRatioOption, OutputFormat } from "@/components/cropper/cropper-settings";
import { deleteImage, getImages, saveImages } from "@/lib/image-db";
import { CropRect, Size, getCroppedImg, getMaxCrop, getRotatedSize, setCropField } from "@/lib/crop-image";
import { toast } from "sonner";
import { ToolHero, ToolLayout } from "@/components/tool/tool-ui";

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
    description:
      "Browser-based online image cropper supporting free-form and fixed aspect ratio crops, rotation, and multiple output formats.",
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

  const [imageSize, setImageSize] = useState<Size | null>(null);
  const [crop, setCrop] = useState<CropRect | null>(null);
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(90);

  const [croppedResult, setCroppedResult] = useState<{
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
    setImageSize(null);
    setCrop(null);
    setRotation(0);
    setCroppedResult(null);

    if (!selectedImage) {
      setSelectedOriginalUrl("");
      return;
    }

    const url = URL.createObjectURL(selectedImage);
    setSelectedOriginalUrl(url);

    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      const size = { width: img.naturalWidth, height: img.naturalHeight };
      setImageSize(size);
      setCrop(getMaxCrop(size));
    };
    img.onerror = () => {
      if (!cancelled) toast.error("Could not load this image.");
    };
    img.src = url;

    return () => {
      cancelled = true;
      URL.revokeObjectURL(url);
    };
  }, [selectedImage]);

  const cropBounds = imageSize ? getRotatedSize(imageSize, rotation) : null;

  const handleAspectRatioChange = (ratio: number | undefined) => {
    setAspectRatio(ratio);
    // Free mode keeps the current box; a fixed ratio snaps to the largest centered box of that shape.
    if (ratio && cropBounds) setCrop(getMaxCrop(cropBounds, ratio));
  };

  const handleRotationChange = (value: number) => {
    setRotation(value);
    if (imageSize) setCrop(getMaxCrop(getRotatedSize(imageSize, value), aspectRatio));
  };

  const handleCropFieldChange = (field: keyof CropRect, value: number) => {
    if (!crop || !cropBounds) return;
    setCrop(setCropField(crop, field, value, cropBounds, aspectRatio));
  };

  const handleApplyCrop = async () => {
    if (!selectedOriginalUrl || !crop) {
      toast.error("Please select an image and crop area first.");
      return;
    }

    try {
      const res = await getCroppedImg(selectedOriginalUrl, crop, rotation, outputFormat, quality / 100);
      setCroppedResult(res);
      toast.success("Image cropped successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image.");
    }
  };

  const handleReset = () => {
    setRotation(0);
    setAspectRatio(undefined);
    if (imageSize) setCrop(getMaxCrop(imageSize));
    setCroppedResult(null);
    toast.info("Crop settings reset.");
  };

  const handleDownload = () => {
    if (!croppedResult || !selectedImage) return;
    const link = document.createElement("a");
    link.href = croppedResult.url;
    // Name the file after the format the browser actually encoded, not just the one requested.
    const subtype = croppedResult.blob.type.split("/")[1] || "png";
    const ext = subtype === "jpeg" ? "jpg" : subtype;
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
      setCroppedResult(null);
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
    <main className="min-h-screen pb-28" onDrop={handleDrop} onDragOver={handleDragOver}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ToolHero
        label="Image Cropper"
        title="Crop Images to"
        accent="Any Size"
        description="Drag the box, pick a ratio or type exact pixels. Everything runs in your browser, so your images are never uploaded."
      />

      <ToolLayout
        main={
          <CropperPreview
            imageSrc={selectedOriginalUrl}
            imageSize={imageSize}
            rotation={rotation}
            aspectRatio={aspectRatio}
            crop={crop}
            onCropChange={setCrop}
            images={images}
            selectedImage={selectedImage}
            onSelectImage={setSelectedImage}
            onDeleteImage={handleDelete}
            previewUrls={previewUrls}
            croppedResult={croppedResult}
            onDownload={handleDownload}
          />
        }
        panel={
          <CropperSettings
            aspectRatio={aspectRatio}
            aspectRatios={aspectRatios}
            onAspectRatioChange={handleAspectRatioChange}
            rotation={rotation}
            onRotationChange={handleRotationChange}
            outputFormat={outputFormat}
            onOutputFormatChange={setOutputFormat}
            quality={quality}
            onQualityChange={setQuality}
            crop={crop}
            onCropFieldChange={handleCropFieldChange}
            onApplyCrop={handleApplyCrop}
            onReset={handleReset}
            onDownload={handleDownload}
            onUploadSuccess={handleUploadSuccess}
            disabled={!imageSize}
            hasResult={Boolean(croppedResult)}
          />
        }
      />
    </main>
  );
}
