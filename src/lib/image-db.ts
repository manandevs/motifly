import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "image-compressor";
const STORE_NAME = "uploads";
const IMAGES_KEY = "current-images";

let dbPromise: Promise<IDBPDatabase> | null = null;

async function getDB() {
  if (typeof window === "undefined") {
    throw new Error("IndexedDB is only available in the browser.");
  }

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  return dbPromise;
}

export async function saveImages(files: File[]): Promise<void> {
  const db = await getDB();

  const existingImages: File[] =
    (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];

  const updatedImages = [...existingImages];

  for (const file of files) {
    const exists = updatedImages.some(
      (img) => img.name === file.name && img.size === file.size
    );

    if (!exists) {
      updatedImages.push(file);
    }
  }

  await db.put(STORE_NAME, updatedImages, IMAGES_KEY);
}

export async function getImages(): Promise<File[]> {
  const db = await getDB();

  return (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];
}

export async function deleteImage(index: number): Promise<void> {
  const db = await getDB();

  const images: File[] =
    (await db.get(STORE_NAME, IMAGES_KEY)) ?? [];

  if (index < 0 || index >= images.length) {
    return;
  }

  images.splice(index, 1);

  await db.put(STORE_NAME, images, IMAGES_KEY);
}

export async function clearImages(): Promise<void> {
  const db = await getDB();

  await db.delete(STORE_NAME, IMAGES_KEY);
}