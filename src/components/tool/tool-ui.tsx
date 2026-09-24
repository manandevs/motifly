"use client";

import React, { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accent } from "@/components/landing/accent";
import { Container } from "@/components/landing/container";
import { SectionLabel } from "@/components/landing/section-label";
import { StreakGlow } from "@/components/landing/streak-glow";

// Shared building blocks for the tool pages (cropper, compressor) so they look identical.

/** Faint indigo dot grid, the same texture as the home page footer. */
export const dotGrid = {
  backgroundImage: "radial-gradient(circle, rgba(74,58,255,0.14) 1px, transparent 1.6px)",
  backgroundSize: "16px 16px",
};

/** Page header: section label, heading with a Jaguar-accented phrase, intro text and the hero glow. */
export function ToolHero({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <section className="relative">
      <StreakGlow className="-top-18.5 right-0 h-140 w-[45%] max-md:hidden" />
      <Container className="relative flex flex-col items-center pt-15 text-center">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-3.5 text-[clamp(2.25rem,4.03vw,3.625rem)] leading-[1.07] font-medium tracking-[-0.015em] text-[#0e0e10]">
          {title} <Accent>{accent}</Accent>
        </h1>
        <p className="mt-4.75 max-w-135 text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.4] text-[#7a7a85]">{description}</p>
      </Container>
    </section>
  );
}

/** Two-column tool layout: main content on the left, sticky settings panel on the right. */
export function ToolLayout({ main, panel }: { main: React.ReactNode; panel: React.ReactNode }) {
  return (
    <Container className="mt-14">
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex w-full min-w-0 flex-col gap-6">{main}</div>
        <div className="lg:sticky lg:top-6">{panel}</div>
      </div>
    </Container>
  );
}

/** White card with a heading-font title, gray info pills and an optional action on the right. */
export function ToolCard({
  title,
  pills,
  action,
  children,
}: {
  title: React.ReactNode;
  pills: string[];
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xs border border-[#e6e6eb] bg-white p-3">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-2 pb-4">
        <div>
          <h3 className="text-2xl leading-tight font-medium tracking-[-0.015em] text-[#0e0e10]">{title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-[#0e0e10]">
            {pills.map((pill) => (
              <span key={pill} className="rounded-full bg-[#f1f1f4] px-3 py-1">
                {pill}
              </span>
            ))}
          </div>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

/** 500px dot-grid stage that previews and workspaces sit on. */
export function PreviewArea({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex h-125 w-full items-center justify-center overflow-hidden rounded-xs bg-[#f1f1f4] p-6",
        className,
      )}
      style={{ ...dotGrid, ...style }}
      {...props}
    />
  );
}

/** Centered message for an empty preview. */
export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="text-center">
      <p className="text-lg font-medium text-[#0e0e10]">{title}</p>
      <p className="mt-1 max-w-72 text-sm text-[#7a7a85]">{hint}</p>
    </div>
  );
}

export function Spinner() {
  return <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d9d6ff] border-t-[#4a3aff]" />;
}

/** Row of uploaded images; click to select, hover to delete. */
export function ImageThumbnails({
  images,
  previewUrls,
  selected,
  onSelect,
  onDelete,
}: {
  images: File[];
  previewUrls: Record<string, string>;
  selected: File | null;
  onSelect: (file: File) => void;
  onDelete: (index: number) => void;
}) {
  if (!images.length) return null;
  return (
    <div className="flex items-center gap-3 overflow-x-auto rounded-xs border border-[#e6e6eb] bg-white p-3">
      {images.map((file, index) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        const url = previewUrls[key];
        return (
          <div
            key={key}
            className={cn(
              "group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xs border transition-all",
              selected === file
                ? "border-[#4a3aff] shadow-[0_4px_12px_rgba(74,58,255,0.25)]"
                : "border-transparent hover:border-[#d9d6ff]",
            )}
            onClick={() => onSelect(file)}
          >
            {url ? (
              <img src={url} alt={file.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full animate-pulse bg-[#f1f1f4]" />
            )}
            <button
              type="button"
              aria-label={`Delete ${file.name}`}
              className="absolute top-1 right-1 rounded-full bg-white/90 p-1 text-[#0e0e10] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#ef4444] hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(index);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** Settings card: accented title and description, followed by divided groups. */
export function SettingsPanel({
  title,
  accent,
  description,
  children,
}: {
  title: string;
  accent: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col rounded-xs border border-[#e6e6eb] bg-white p-6">
      <div>
        <h2 className="text-2xl leading-tight font-medium tracking-[-0.015em] text-[#0e0e10]">
          {title} <Accent>{accent}</Accent>
        </h2>
        <p className="mt-1 text-sm text-[#7a7a85]">{description}</p>
      </div>
      {children}
    </div>
  );
}

/** One settings section: title (with optional value and action) above its controls, split by a divider. */
export function SettingsGroup({
  title,
  value,
  action,
  children,
}: {
  title: string;
  value?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-[#e6e6eb] pt-6">
      <div className="mb-3 flex min-h-8 items-center justify-between">
        <h3 className="text-[15px] font-medium text-[#0e0e10]">
          {title}
          {value && <span className="ml-2 text-[#4a3aff]">{value}</span>}
        </h3>
        {action}
      </div>
      {children}
    </div>
  );
}

/** Divided footer for the panel's main actions. */
export function SettingsActions({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex flex-col gap-2 border-t border-[#e6e6eb] pt-6">{children}</div>;
}

/** Row of pill buttons where one option is selected. */
export function PillSelect<T>({
  options,
  value,
  onChange,
  disabled,
  columns = 3,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  columns?: 3 | 4;
}) {
  return (
    <div className={cn("grid gap-2", columns === 4 ? "grid-cols-4" : "grid-cols-3")}>
      {options.map((option) => (
        <Button
          key={option.label}
          size="sm"
          variant={option.value === value ? "default" : "outline"}
          onClick={() => onChange(option.value)}
          disabled={disabled}
          className="rounded-full text-xs"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

/** Number input with pill-shaped −/+ steppers. Typed values commit on blur or Enter. */
export function NumberStepper({
  label,
  value,
  step,
  disabled,
  onCommit,
}: {
  label: string;
  value: number;
  step: number;
  disabled?: boolean;
  onCommit: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));

  // Keep the field in sync when the value changes elsewhere (e.g. dragging the crop box).
  useEffect(() => {
    setDraft(String(value));
  }, [value]);

  // Commit on blur / Enter so partially typed numbers aren't clamped mid-typing.
  const commit = () => {
    const num = Number(draft);
    if (draft.trim() === "" || Number.isNaN(num)) setDraft(String(value));
    else onCommit(num);
  };

  return (
    <div className="space-y-1">
      <label className="text-xs text-[#7a7a85]">{label}</label>
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 rounded-l-full rounded-r-none px-2"
          disabled={disabled}
          onClick={() => onCommit(value - step)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Input
          type="number"
          value={draft}
          disabled={disabled}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="h-9 rounded-none border-x-0 text-center text-xs"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 rounded-l-none rounded-r-full px-2"
          disabled={disabled}
          onClick={() => onCommit(value + step)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
