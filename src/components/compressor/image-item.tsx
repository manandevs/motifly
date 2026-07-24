import { Button } from "@/components/ui/button";
import { deleteImage } from "@/lib/image-db";
import { LucideTrash } from "lucide-react";

interface ImageItemProps {
  index: number;
  image: File;
  previewUrl: string;
  isSelected?: boolean;
  onCompress: (image: File) => void;
  onDelete: (index: number) => void;
}

export default function ImageItem({ index, image, previewUrl, isSelected, onCompress, onDelete }: ImageItemProps) {
  return (
    <div
      className={`group relative mx-auto flex w-full gap-4 rounded-lg border bg-white p-2 shadow-[0px_8px_30px_rgba(0,0,0,0.05)] transition-colors duration-300 ${
        isSelected ? "border-blue-500 ring-1 ring-blue-500" : "border-black/10 hover:border-blue-400/60"
      }`}
    >
      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
        <img
          src={previewUrl}
          alt={image.name}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between truncate">
        <h3 className="line-clamp-1 font-semibold">{image.name}</h3>

        <div className="flex items-end justify-between">
          <div className="text-[13px] leading-6 text-[#555]">
            <p>
              <strong>Type:</strong> {image.type.replace("image/", "") || "Unknown"}
            </p>
            <p>
              <strong>Size:</strong> {(image.size / 1024).toFixed(2)} KB
            </p>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant={isSelected ? "default" : "secondary"} onClick={() => onCompress(image)}>
              Compress
            </Button>
            <Button size="icon" variant="destructive" onClick={() => onDelete(index)}>
              <LucideTrash size={24} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
