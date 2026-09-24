export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Size {
  width: number;
  height: number;
}

/** Bounding box of an image of `size` rotated by `rotation` degrees. Crop coordinates live in this space. */
export function getRotatedSize(size: Size, rotation: number): Size {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * size.width) + Math.abs(Math.sin(rotRad) * size.height),
    height: Math.abs(Math.sin(rotRad) * size.width) + Math.abs(Math.cos(rotRad) * size.height),
  };
}

/** Largest centered crop that fits `bounds`, optionally locked to `aspect` (width / height). */
export function getMaxCrop(bounds: Size, aspect?: number): CropRect {
  let width = bounds.width;
  let height = bounds.height;
  if (aspect) {
    if (width / height > aspect) width = height * aspect;
    else height = width / aspect;
  }
  return { x: (bounds.width - width) / 2, y: (bounds.height - height) / 2, width, height };
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

/** Applies an exact value typed for one crop field, keeping the rect inside `bounds` and locked to `aspect`. */
export function setCropField(
  crop: CropRect,
  field: keyof CropRect,
  value: number,
  bounds: Size,
  aspect?: number,
): CropRect {
  let { x, y, width, height } = crop;

  if (field === "x") x = value;
  if (field === "y") y = value;

  if (field === "width") {
    width = clamp(value, 1, bounds.width);
    if (aspect) {
      height = width / aspect;
      if (height > bounds.height) {
        height = bounds.height;
        width = height * aspect;
      }
    }
  }

  if (field === "height") {
    height = clamp(value, 1, bounds.height);
    if (aspect) {
      width = height * aspect;
      if (width > bounds.width) {
        width = bounds.width;
        height = width / aspect;
      }
    }
  }

  return {
    width,
    height,
    x: clamp(x, 0, bounds.width - width),
    y: clamp(y, 0, bounds.height - height),
  };
}

export type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

/** Resizes `crop` by dragging `handle` by (dx, dy), keeping it inside `bounds` and locked to `aspect`. */
export function resizeCrop(
  crop: CropRect,
  handle: ResizeHandle,
  dx: number,
  dy: number,
  bounds: Size,
  minSize: number,
  aspect?: number,
): CropRect {
  const right = crop.x + crop.width;
  const bottom = crop.y + crop.height;
  const cx = crop.x + crop.width / 2;
  const cy = crop.y + crop.height / 2;

  const east = handle.includes("e");
  const west = handle.includes("w");
  const north = handle.includes("n");
  const south = handle.includes("s");

  // Room available from the fixed side (or around the center when that axis isn't being dragged).
  const maxW = east ? bounds.width - crop.x : west ? right : 2 * Math.min(cx, bounds.width - cx);
  const maxH = south ? bounds.height - crop.y : north ? bottom : 2 * Math.min(cy, bounds.height - cy);

  const proposedW = east ? crop.width + dx : west ? crop.width - dx : crop.width;
  const proposedH = south ? crop.height + dy : north ? crop.height - dy : crop.height;

  let width: number;
  let height: number;

  if (aspect) {
    const horizontal = east || west;
    const vertical = north || south;
    width =
      horizontal && vertical ? Math.max(proposedW, proposedH * aspect) : horizontal ? proposedW : proposedH * aspect;
    width = Math.min(width, maxW, maxH * aspect);
    width = Math.max(width, minSize, minSize * aspect);
    height = width / aspect;
  } else {
    width = clamp(proposedW, minSize, maxW);
    height = clamp(proposedH, minSize, maxH);
  }

  return {
    width,
    height,
    x: east ? crop.x : west ? right - width : cx - width / 2,
    y: south ? crop.y : north ? bottom - height : cy - height / 2,
  };
}

/** Moves `crop` by (dx, dy) without leaving `bounds`. */
export function moveCrop(crop: CropRect, dx: number, dy: number, bounds: Size): CropRect {
  return {
    ...crop,
    x: clamp(crop.x + dx, 0, bounds.width - crop.width),
    y: clamp(crop.y + dy, 0, bounds.height - crop.height),
  };
}

export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropRect,
  rotation = 0,
  outputFormat = "image/jpeg",
  quality = 0.92,
): Promise<{ url: string; blob: Blob; width: number; height: number; size: number }> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = getRotatedSize(
    { width: image.naturalWidth, height: image.naturalHeight },
    rotation,
  );

  canvas.width = Math.round(bBoxWidth);
  canvas.height = Math.round(bBoxHeight);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.naturalWidth / 2, -image.naturalHeight / 2);

  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) {
    throw new Error("No 2d context");
  }

  const x = Math.round(pixelCrop.x);
  const y = Math.round(pixelCrop.y);
  const width = Math.max(1, Math.round(pixelCrop.width));
  const height = Math.max(1, Math.round(pixelCrop.height));

  croppedCanvas.width = width;
  croppedCanvas.height = height;

  // JPEG has no alpha channel, so paint a white background instead of letting transparent areas turn black.
  if (outputFormat === "image/jpeg") {
    croppedCtx.fillStyle = "#ffffff";
    croppedCtx.fillRect(0, 0, width, height);
  }

  croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        resolve({
          blob,
          url: URL.createObjectURL(blob),
          width,
          height,
          size: blob.size,
        });
      },
      outputFormat,
      quality,
    );
  });
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
