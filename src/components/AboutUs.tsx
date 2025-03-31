"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect } from "react";

const features = [
  {
    title: "Свежие цветы ежедневно",
    description: "Получаем свежие цветы каждый день, гарантируя их качество и долговечность.",
    icon: "🌿"
  },
  {
    title: "Уникальный дизайн",
    description: "Наши флористы создают неповторимые композиции, учитывая все ваши пожелания.",
    icon: "✨"
  },
  {
    title: "Доставка в день заказа",
    description: "Быстрая доставка по всему городу в день заказа, чтобы ваш подарок прибыл вовремя.",
    icon: "🚚"
  },
  {
    title: "Экологичная упаковка",
    description: "Используем экологически чистые материалы для упаковки наших букетов.",
    icon: "♻️"
  }
];

export function AboutUs() {
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  // Следим за скроллом и анимируем появление секций
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.75;

        if (isVisible && section.id) {
          setVisibleSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Проверяем сразу при загрузке

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-white/5 dark:bg-gray-800/30 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#e1da68]/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#e1da68]/10 blur-3xl"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e1da68] mb-4">О нас</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Узнайте больше о нашей философии создания букетов и почему наши клиенты выбирают именно нас
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Левая колонка с изображением и историей */}
          <div className="lg:col-span-5 space-y-8">
            <div
              id="about-image"
              className={`animate-on-scroll relative h-80 rounded-xl overflow-hidden shadow-xl transform transition-all duration-700 ${
                visibleSection === 'about-image' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <Image
                src="/images/happy-customer1.jpg"
                alt="Наша команда за работой"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <h3 className="text-xl font-medium text-[#e1da68]">Наша команда</h3>
                <p className="text-white/90 text-sm mt-1">
                  Наши флористы создают уникальные композиции с любовью и вниманием к каждой детали
                </p>
              </div>
            </div>

            <div
              id="about-story"
              className={`animate-on-scroll bg-white/20 dark:bg-gray-700/40 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-700 ${
                visibleSection === 'about-story' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h3 className="text-xl font-semibold text-[#e1da68] mb-4">Наша история</h3>
              <p className="text-white/90 dark:text-gray-100 mb-4 leading-relaxed">
                С 2015 года <span className="text-[#e1da68] font-medium">Анемон</span> создает уникальные цветочные композиции, которые дарят радость и восхищение нашим клиентам.
              </p>
              <p className="text-white/90 dark:text-gray-100 leading-relaxed">
                Мы верим, что каждый букет — это произведение искусства, способное выразить ваши самые искренние чувства и эмоции. Наша миссия — создавать не просто букеты, а настоящие эмоции и впечатления.
              </p>
            </div>
          </div>

          {/* Правая колонка с ценностями и преимуществами */}
          <div className="lg:col-span-7 space-y-8">
            <div
              id="about-values"
              className={`animate-on-scroll bg-white/20 dark:bg-gray-700/40 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-700 ${
                visibleSection === 'about-values' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h3 className="text-xl font-semibold text-[#e1da68] mb-6">Наши ценности</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-lg border border-white/10">
                  <h4 className="flex items-center text-lg font-medium text-[#e1da68] mb-2">
                    <span className="inline-block w-2 h-2 bg-[#e1da68] rounded-full mr-2"></span>
                    Качество и свежесть
                  </h4>
                  <p className="text-white/80 dark:text-gray-200 text-sm ml-4 leading-relaxed">
                    Мы тщательно отбираем каждый цветок для наших букетов, чтобы они радовали вас как можно дольше.
                  </p>
                </div>
                <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-lg border border-white/10">
                  <h4 className="flex items-center text-lg font-medium text-[#e1da68] mb-2">
                    <span className="inline-block w-2 h-2 bg-[#e1da68] rounded-full mr-2"></span>
                    Индивидуальный подход
                  </h4>
                  <p className="text-white/80 dark:text-gray-200 text-sm ml-4 leading-relaxed">
                    Мы внимательно относимся к пожеланиям каждого клиента и создаем букеты, отражающие ваши чувства.
                  </p>
                </div>
                <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-lg border border-white/10">
                  <h4 className="flex items-center text-lg font-medium text-[#e1da68] mb-2">
                    <span className="inline-block w-2 h-2 bg-[#e1da68] rounded-full mr-2"></span>
                    Мастерство флористов
                  </h4>
                  <p className="text-white/80 dark:text-gray-200 text-sm ml-4 leading-relaxed">
                    Наша команда флористов состоит из настоящих профессионалов с многолетним опытом работы.
                  </p>
                </div>
                <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-lg border border-white/10">
                  <h4 className="flex items-center text-lg font-medium text-[#e1da68] mb-2">
                    <span className="inline-block w-2 h-2 bg-[#e1da68] rounded-full mr-2"></span>
                    Забота об экологии
                  </h4>
                  <p className="text-white/80 dark:text-gray-200 text-sm ml-4 leading-relaxed">
                    Мы используем только экологически чистые материалы для упаковки и заботимся о природе.
                  </p>
                </div>
              </div>
            </div>

            <div
              id="about-features"
              className={`animate-on-scroll bg-white/20 dark:bg-gray-700/40 p-6 md:p-8 rounded-xl backdrop-blur-sm shadow-lg transition-all duration-700 ${
                visibleSection === 'about-features' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-xl font-semibold text-[#e1da68] mb-6">Почему выбирают нас</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/30 dark:bg-gray-800/50 p-5 rounded-lg transition-all hover:bg-white/40 dark:hover:bg-gray-700/60 shadow-md hover:shadow-lg border border-white/10"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="text-lg font-medium text-[#e1da68] mb-2">{feature.title}</h4>
                    <p className="text-white/80 dark:text-gray-200 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
