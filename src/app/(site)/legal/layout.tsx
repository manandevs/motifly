export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <div className="isolate flex min-h-screen w-full flex-col px-4 py-32">{children}</div>;
}
