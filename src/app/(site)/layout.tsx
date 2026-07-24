import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/Navbar";
import { BackgroundBlur } from "@/components/ui/background-blur";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <BackgroundBlur className="-top-40 md:top-0" />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
