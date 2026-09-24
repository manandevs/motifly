"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Container } from "@/components/landing/container";
import { UploadDropzone } from "@/components/shared/upload-dropzone";
import { getImages, saveImages } from "@/lib/image-db";

export function ImageUploader() {
  const router = useRouter();

  const openInCompressor = async (images: File[]) => {
    try {
      // Open the compressor on the first newly added image.
      const existing = await getImages();
      await saveImages(images);
      sessionStorage.setItem("selected-image-index", existing.length.toString());
      router.push("/tools/compressor");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Could not open that image. Please try again.");
    }
  };

  return (
    <section data-section="uploader" className="mt-16">
      <Container>
        <UploadDropzone onFiles={openInCompressor} />
      </Container>
    </section>
  );
}
