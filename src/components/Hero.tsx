"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Эффект для анимации элементов при загрузке и отслеживания скролла
  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById("catalog-preview");
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Если каталога нет на текущей странице, перенаправляем на страницу каталога
      router.push("/catalog");
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Базовые классы для анимации
  const baseAnimationClasses = "transition-all duration-1000 ease-out";
  const hiddenClasses = `${baseAnimationClasses} opacity-0 translate-y-8`;
  const visibleClasses = `${baseAnimationClasses} opacity-100 translate-y-0`;

  // Стиль для параллакс-эффекта
  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.4}px)`,
    transition: 'transform 0.1s ease-out'
  };

  // Эффект пульсации для кнопки
  const pulseAnimation = `animate-pulse`;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center text-white overflow-hidden">
      {/* Фоновое изображение с параллакс-эффектом */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3a543a]/60 to-[#50714d]/90 z-10"></div>
        <Image
          src="/images/pink-peonies.jpg"
          alt="Цветочный фон"
          fill
          className="object-cover object-center"
          style={parallaxStyle}
          priority
        />
      </div>

      <div className="container relative z-10 text-center max-w-3xl py-24 md:py-32">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 ${isVisible ? visibleClasses : hiddenClasses}`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="block mb-2 text-[#e1da68]">Анемон</span>
          <span className="block font-light text-white/90">салон ваших букетов</span>
        </h1>

        <p
          className={`text-lg md:text-xl mb-10 opacity-90 max-w-xl mx-auto ${isVisible ? visibleClasses : hiddenClasses}`}
          style={{ transitionDelay: "400ms" }}
        >
          Красота в каждом цветке и каждом букете. Наш магазин предлагает
          уникальность и изысканный вкус в оформлении, ведь в деталях
          кроется совершенство.
        </p>

        <div
          className={`flex flex-col sm:flex-row justify-center gap-6 ${isVisible ? visibleClasses : hiddenClasses}`}
          style={{ transitionDelay: "600ms" }}
        >
          <Button
            onClick={scrollToCatalog}
            className={`bg-[#e1da68] hover:bg-[#d5ce5e] text-[#50714d] font-medium px-8 py-7 h-auto text-base dark:bg-[#d5ce5e] dark:hover:bg-[#e1da68] rounded-md shadow-lg hover:shadow-xl transition-all`}
          >
            Каталог букетов
          </Button>
          <Button
            onClick={scrollToContact}
            className={`${pulseAnimation} bg-[#50714d] hover:bg-[#3f5a3c] text-white font-medium px-8 py-7 h-auto text-base dark:bg-[#304830] dark:hover:bg-[#3a543a] flex items-center rounded-md shadow-lg hover:shadow-xl transition-all`}
          >
            <ShoppingBag className="h-5 w-5 mr-3" />
            Заказать букет
          </Button>
        </div>

        {/* Плавающий элемент декора */}
        <div
          className={`absolute hidden md:block bottom-16 left-4 w-24 h-24 opacity-50 ${isVisible ? 'animate-float' : 'opacity-0'}`}
          style={{ animationDelay: "1s" }}
        >
          <Image
            src="/images/white-anemones.jpg"
            alt="Декоративный элемент"
            width={100}
            height={100}
            className="rounded-full object-cover shadow-lg"
          />
        </div>

        {/* Плавающий элемент декора справа */}
        <div
          className={`absolute hidden md:block top-20 right-8 w-16 h-16 opacity-50 ${isVisible ? 'animate-float-reverse' : 'opacity-0'}`}
          style={{ animationDelay: "0.5s" }}
        >
          <Image
            src="/images/purple-anemones.jpg"
            alt="Декоративный элемент"
            width={70}
            height={70}
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Скролл-индикатор */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isVisible ? 'animate-bounce opacity-70' : 'opacity-0'}`}>
        <div className="w-8 h-14 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scrollDown"></div>
        </div>
      </div>
    </section>
  );
}
