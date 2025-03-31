"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Елена Соколова",
    role: "Постоянный клиент",
    testimonial: "Я всегда покупаю цветы в Анемон. Их букеты невероятно свежие и красивые, а упаковка просто потрясающая. Спасибо за ваш профессионализм и внимание к деталям!",
    image: "/images/happy-customer1.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Михаил Петров",
    role: "Новый клиент",
    testimonial: "Недавно заказал букет для жены на годовщину. Был приятно удивлен скоростью доставки и качеством цветов. Букет простоял свежим больше недели! Обязательно буду заказывать снова.",
    image: "/images/happy-customer1.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Анна Кузнецова",
    role: "Корпоративный клиент",
    testimonial: "Наша компания регулярно заказывает цветы для офиса и мероприятий. Анемон всегда предоставляет отличный сервис и прекрасные композиции. Рекомендую всем!",
    image: "/images/happy-customer1.jpg",
    rating: 4
  },
  {
    id: 4,
    name: "Дмитрий Иванов",
    role: "Постоянный клиент",
    testimonial: "Уже третий год заказываю цветы только в этом магазине. Всегда помогают выбрать идеальный букет под любой случай. Качество цветов и обслуживание на высшем уровне!",
    image: "/images/happy-customer1.jpg",
    rating: 5
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Функция для отображения звездного рейтинга
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`text-xl ${index < rating ? 'text-[#e1da68]' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#3f5a3c]/70 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-[#e1da68]/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-[#e1da68]/5 blur-3xl"></div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e1da68] mb-4">
            Что говорят наши клиенты
          </h2>
          <p className="text-white/80 dark:text-gray-300 max-w-2xl mx-auto">
            Мы гордимся тем, что наши клиенты остаются довольны нашей работой.
            Вот некоторые отзывы от людей, которые выбрали Анемон.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
            onSelect={(index) => setActiveIndex(Number(index))}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className={`h-full bg-white/10 dark:bg-gray-800/20 border border-white/10 backdrop-blur-sm shadow-lg transition-all duration-300 ${activeIndex === index ? 'scale-105' : 'scale-100'}`}>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#e1da68]/60 mb-3">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-[#e1da68]/80">{testimonial.role}</p>
                          <div className="mt-2 flex justify-center">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <span className="absolute -top-2 -left-1 text-4xl text-[#e1da68]/20">"</span>
                        <p className="text-white/80 dark:text-gray-300 italic text-sm pt-2 px-2">{testimonial.testimonial}</p>
                        <span className="absolute -bottom-2 -right-1 text-4xl text-[#e1da68]/20">"</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mr-4 bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transform transition-all duration-300 hover:-translate-x-1" />
              <CarouselNext className="relative static bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transform transition-all duration-300 hover:translate-x-1" />
            </div>
          </Carousel>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/#contact"
            className="inline-block bg-[#e1da68] hover:bg-[#d5ce5e] text-[#3a543a] font-medium px-6 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
          >
            Оставить свой отзыв
          </a>
        </div>
      </div>
    </section>
  );
}
