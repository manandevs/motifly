"use client";

import { useEffect, useState, useCallback } from "react";
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Motifly Image Compressor",
    url: "https://motifly.vercel.app/tools/compressor",
    description: "Browser-based image compression tool supporting JPEG, PNG, and WebP formats.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const [images, setImages] = useState<File[]>([]);
  const [quality, setQuality] = useState(75);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [resize, setResize] = useState<ResizeOption>(resizeOptions[0]);
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [isCustomResize, setIsCustomResize] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [selectedOriginalUrl, setSelectedOriginalUrl] = useState<string>("");

  const [compressedResult, setCompressedResult] = useState<{
    url: string;
    blob: Blob;
    size: number;
    width: number;
    height: number;
  } | null>(null);

  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });

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
      return;
    }
    const url = URL.createObjectURL(selectedImage);
    setSelectedOriginalUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedImage]);

  const handleResizeChange = (o: ResizeOption) => {
    setResize(o);
    setIsCustomResize(false);
    if (originalDimensions.width > 0) {
      setCustomWidth(Math.round(originalDimensions.width * (o.value / 100)));
    }
  };

  const handleCustomWidthChange = (w: number) => {
    setCustomWidth(w);
    setIsCustomResize(true);
  };

  useEffect(() => {
    if (!selectedImage) return;

    let active = true;
    setIsCompressing(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(selectedImage);
    img.src = objectUrl;

    img.onload = () => {
      if (!active) {
        URL.revokeObjectURL(objectUrl);
        return;
      }

      setOriginalDimensions({ width: img.width, height: img.height });
      if (!isCustomResize && customWidth === 0) {
        setCustomWidth(Math.round(img.width * (resize.value / 100)));
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let targetWidth = img.width;
      let targetHeight = img.height;

      if (isCustomResize && customWidth > 0) {
        targetWidth = customWidth;
        targetHeight = Math.round(img.height * (customWidth / img.width));
      } else {
        const scale = resize.value / 100;
        targetWidth = Math.round(img.width * scale);
        targetHeight = Math.round(img.height * scale);
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (ctx) {
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl);
            if (!active || !blob) {
              setIsCompressing(false);
              return;
            }

            setCompressedResult((prev) => {
              if (prev?.url) URL.revokeObjectURL(prev.url);
              return {
                blob,
                url: URL.createObjectURL(blob),
                size: blob.size,
                width: targetWidth,
                height: targetHeight,
              };
            });
            setIsCompressing(false);
          },
          outputFormat,
          quality / 100,
        );
      } else {
        URL.revokeObjectURL(objectUrl);
        setIsCompressing(false);
      }
    };

    return () => {
      active = false;
    };
  }, [selectedImage, quality, outputFormat, resize, customWidth, isCustomResize]);

  const handleDownload = () => {
    if (!compressedResult || !selectedImage) return;
    const link = document.createElement("a");
    link.href = compressedResult.url;
    link.download = `compressed_${selectedImage.name.replace(/\.[^/.]+$/, "")}.${outputFormat.split("/")[1]}`;
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {images.map((img, i) => {
              const fileKey = `${img.name}-${img.size}-${img.lastModified}`;
              return (
                <ImageItem
                  key={fileKey}
                  index={i}
                  image={img}
                  previewUrl={previewUrls[fileKey] || ""}
                  isSelected={selectedImage === img}
                  onCompress={setSelectedImage}
                  onDelete={handleDelete}
                />
              );
            })}
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
            onResizeChange={handleResizeChange}
            customWidth={customWidth}
            onCustomWidthChange={handleCustomWidthChange}
            originalWidth={originalDimensions.width}
            originalHeight={originalDimensions.height}
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
      </div>
    </div>
  );
}
