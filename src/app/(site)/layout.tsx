import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
