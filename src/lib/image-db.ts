import { openDB } from "idb";

const DB_NAME = "image-compressor";
const STORE_NAME = "uploads";
const IMAGES_KEY = "current-images";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export async function saveImages(files: File[]): Promise<void> {
  const db = await dbPromise;
  const existingImages: File[] = (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];
  const updatedImages = [...existingImages];

  for (const file of files) {
    const exists = updatedImages.some((img) => img.name === file.name && img.size === file.size);
    if (!exists) updatedImages.push(file);
  }
  await db.put(STORE_NAME, updatedImages, IMAGES_KEY);
}

export async function getImages(): Promise<File[]> {
  const db = await dbPromise;
  return (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];
}

export async function deleteImage(index: number): Promise<void> {
  const db = await dbPromise;

  const images: File[] = (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];

  const updatedImages = images.filter((_, i) => i !== index);

  await db.put(STORE_NAME, updatedImages, IMAGES_KEY);
}

export async function clearImages(): Promise<void> {
  const db = await dbPromise;
  await db.delete(STORE_NAME, IMAGES_KEY);
}
