"use client";

import { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  description: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/images/purple-anemones.jpg",
    alt: "Пурпурные анемоны",
    description: "Яркий и насыщенный букет из пурпурных анемонов станет прекрасным подарком для особого случая."
  },
  {
    id: 2,
    src: "/images/red-roses.jpg",
    alt: "Красные розы",
    description: "Классический букет красных роз – вечный символ любви и страсти."
  },
  {
    id: 3,
    src: "/images/pink-peonies.jpg",
    alt: "Розовые пионы",
    description: "Нежные розовые пионы олицетворяют романтику и утонченность."
  },
  {
    id: 4,
    src: "/images/white-lavender.jpg",
    alt: "Белая лаванда",
    description: "Элегантный букет белой лаванды наполнит ваш дом приятным ароматом и уютом."
  },
  {
    id: 5,
    src: "/images/mixed-bouquet.jpg",
    alt: "Смешанный букет",
    description: "Яркая композиция из разнообразных цветов подарит радость и прекрасное настроение."
  },
  {
    id: 6,
    src: "/images/purple-anemones.jpg",
    alt: "Анемоны в интерьере",
    description: "Пурпурные анемоны прекрасно дополнят любой интерьер, добавив ему яркости и индивидуальности."
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white/40 dark:bg-gray-800/30 backdrop-blur-sm">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#50714d] dark:text-[#d5ce5e] mb-4">
            Наша галерея
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Взгляните на наши работы и вдохновитесь красотой цветочных композиций
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg group h-64 cursor-pointer animate-fade-in"
              onClick={() => openLightbox(image)}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <span className="text-white text-lg font-medium">Открыть</span>
              </div>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        {selectedImage && (
          <DialogContent className="max-w-3xl bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="text-[#50714d] dark:text-[#d5ce5e]">{selectedImage.alt}</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-300">
                {selectedImage.description}
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-[60vh] w-full my-4">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
