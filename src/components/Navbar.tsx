"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingBag, Phone, Clock } from "lucide-react";
import { useCart } from "./Cart";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { title: "Главная", href: "/" },
  { title: "Каталог", href: "/catalog" },
  { title: "Галерея", href: "/gallery" },
  { title: "О нас", href: "/#about" },
  { title: "Отзывы", href: "/#testimonials" },
  { title: "Контакты", href: "/#contact" },
];

export function Navbar() {
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Отслеживаем скролл страницы, чтобы менять стиль навбара
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Определить, нужно ли добавлять хэш к ссылке, если находимся не на главной странице
  const getHref = (href: string) => {
    const basePath = "";

    if (href.startsWith('/#') && pathname !== '/') {
      // Если это хэш-ссылка и мы не на главной странице
      return basePath + href.substring(basePath.length);
    }
    return href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#50714d]/95 backdrop-blur-sm shadow-md"
          : "bg-transparent"
      } text-white`}
    >
      {/* Инфо-полоса сверху (скрывается на маленьких экранах) */}
      <div className="hidden md:flex items-center justify-between border-b border-white/10 px-6 py-2 text-xs bg-[#3a543a]/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#e1da68]" />
            <span>9:00 - 21:00, без выходных</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5 text-[#e1da68]" />
            <a href="tel:+79610063116" className="hover:text-[#e1da68] transition-colors">
              +7 961 006 31 16
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <a href="#" className="hover:text-[#e1da68] transition-colors">Доставка</a>
          <span>•</span>
          <a href="#" className="hover:text-[#e1da68] transition-colors">Оплата</a>
        </div>
      </div>

      {/* Основной навбар */}
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2 relative z-10">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border-2 border-[#e1da68]/60">
            <Image
              src="/images/logo.png"
              alt="Anemon Flowers"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-light tracking-wider">
            <span className="font-bold">Anemon</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.title}
              href={getHref(link.href)}
              className={`text-sm transition-all duration-300 hover:text-[#e1da68] ${
                pathname === link.href || (pathname === "/" && link.href === "/")
                  ? "text-[#e1da68] font-medium"
                  : "text-white/90 font-light"
              }`}
              prefetch={link.href === "/catalog"}
              aria-label={link.title}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative p-2 text-white hover:text-[#e1da68] transition-colors"
            aria-label="Корзина"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#e1da68] text-xs text-[#50714d] font-semibold">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className="md:hidden" aria-label="Меню">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-white/95 backdrop-blur-sm dark:bg-gray-800/95 dark:text-white border-l border-white/20">
              <nav className="flex flex-col space-y-4 mt-10">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={getHref(link.href)}
                    className="text-gray-800 text-base font-medium transition-colors hover:text-[#50714d] dark:text-white dark:hover:text-[#d5ce5e]"
                    prefetch={link.href === "/catalog"}
                    aria-label={link.title}
                  >
                    {link.title}
                  </Link>
                ))}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50">
                  <a
                    href="tel:+79610063116"
                    className="flex items-center gap-2 text-gray-800 text-sm font-medium transition-colors hover:text-[#50714d] dark:text-white dark:hover:text-[#d5ce5e]"
                  >
                    <Phone className="h-4 w-4 text-[#50714d] dark:text-[#d5ce5e]" />
                    +7 961 006 31 16
                  </a>
                  <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    9:00 - 21:00, без выходных
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
