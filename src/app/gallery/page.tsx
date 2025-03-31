import { Navbar } from "@/components/Navbar";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <div className="py-10"></div> {/* Отступ для компенсации высоты навигационной панели */}
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
