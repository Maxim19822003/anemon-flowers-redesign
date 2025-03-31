"use client";

import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";

const currentYear = new Date().getFullYear();

export function Footer() {
  const pathname = usePathname();

  // Определить, нужно ли добавлять хэш к ссылке, если находимся не на главной странице
  const getHref = (href: string) => {
    if (href.startsWith('/#') && pathname !== '/') {
      return '/' + href;
    }
    return href;
  };

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Логотип и краткое описание */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/images/logo.png" alt="Anemon Flowers" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-bold text-[#d5ce5e]">Anemon</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Магазин свежих цветов и букетов для любого случая. Доставка по всему городу.
            </p>
          </div>

          {/* Быстрые ссылки */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  Галерея
                </Link>
              </li>
              <li>
                <Link href={getHref("/#about")} className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href={getHref("/#testimonials")} className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href={getHref("/#contact")} className="text-gray-400 hover:text-[#d5ce5e] transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Контактная информация */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                ул. Цветочная, 123, Москва, Россия
              </li>
              <li className="text-gray-400">
                +7 (999) 123-45-67
              </li>
              <li className="text-gray-400">
                info@anemon-flowers.ru
              </li>
              <li className="text-gray-400">
                Пн-Пт: 9:00 - 20:00
              </li>
              <li className="text-gray-400">
                Сб-Вс: 10:00 - 18:00
              </li>
            </ul>
          </div>

          {/* Подписка на новости */}
          <div>
            <h3 className="text-lg font-medium mb-4 text-white">Подпишитесь на новости</h3>
            <p className="text-gray-400 text-sm mb-4">
              Получайте информацию о новых коллекциях и специальных предложениях.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Ваш email"
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md text-gray-300 text-sm w-full focus:outline-none focus:ring-1 focus:ring-[#d5ce5e]"
              />
              <button className="bg-[#3a543a] hover:bg-[#304830] px-4 py-2 rounded-r-md transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>© {currentYear} Anemon. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[#d5ce5e] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-[#d5ce5e] transition-colors">
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
