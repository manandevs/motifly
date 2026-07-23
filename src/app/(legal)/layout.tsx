import { Footer } from "@/components/layouts/footer";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="isolate flex w-full flex-col px-4 py-32 min-h-screen">
        {children}
      </div>
  );
}
