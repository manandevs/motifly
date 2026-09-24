"use client";

import { useEffect, useState, useCallback } from "react";
import Preview from "@/components/compressor/preview";
import Settings, { OutputFormat, ResizeOption } from "@/components/compressor/settings";
import { deleteImage, getImages, saveImages } from "@/lib/image-db";
import { ImageThumbnails, ToolHero, ToolLayout } from "@/components/tool/tool-ui";

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

  const handleReset = () => {
    setQuality(75);
    setOutputFormat("image/jpeg");
    setResize(resizeOptions[0]);
    setIsCustomResize(false);
    setCustomWidth(originalDimensions.width);
  };

  // Accept images dropped anywhere on the page, like the cropper.
  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length) {
      await saveImages(files);
      loadImagesFromDB(files[0]);
    }
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
    <main className="min-h-screen pb-28" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ToolHero
        label="Image Compressor"
        title="Compress Images"
        accent="Instantly"
        description="Pick a quality, a format and a size, and see the result straight away. Everything runs in your browser, so your images are never uploaded."
      />

      <ToolLayout
        main={
          <>
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
              onDownload={handleDownload}
              thumbnails={
                <ImageThumbnails
                  images={images}
                  previewUrls={previewUrls}
                  selected={selectedImage}
                  onSelect={setSelectedImage}
                  onDelete={handleDelete}
                />
              }
            />
          </>
        }
        panel={
          <Settings
            quality={quality}
            onQualityChange={setQuality}
            outputFormat={outputFormat}
            onOutputFormatChange={setOutputFormat}
            resize={resize}
            resizeOptions={resizeOptions}
            onResizeChange={handleResizeChange}
            isCustomResize={isCustomResize}
            customWidth={customWidth}
            onCustomWidthChange={handleCustomWidthChange}
            originalWidth={originalDimensions.width}
            originalHeight={originalDimensions.height}
            onDownload={handleDownload}
            onReset={handleReset}
            onUploadSuccess={loadImagesFromDB}
            disabled={isCompressing || !compressedResult}
          />
        }
      />
    </main>
  );
}
