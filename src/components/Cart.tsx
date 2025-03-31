"use client";

import { useState, useEffect, createContext, useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { XIcon, Trash2 } from "lucide-react";
import Image from "next/image";

// Тип для товара в корзине
export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// Контекст корзины
type CartContextType = {
  cartItems: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Загрузка сохраненной корзины из localStorage при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem("anemonCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart:", error);
      }
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("anemonCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    openCart();
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      isOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      totalItems,
      totalPrice,
      clearCart,
    }}>
      {children}
      <CartSheet />
    </CartContext.Provider>
  );
}

function CartSheet() {
  const {
    cartItems,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart
  } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-2xl font-bold text-[#50714d]">
            Корзина <span className="text-sm font-normal text-gray-500">({totalItems} шт.)</span>
          </SheetTitle>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <XIcon className="h-5 w-5" />
          </Button>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">Ваша корзина пуста</p>
              <Button
                onClick={closeCart}
                className="mt-4 bg-[#50714d] hover:bg-[#3f5a3c]"
              >
                Продолжить покупки
              </Button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-[#50714d] font-semibold">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex items-center border border-gray-200 rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 h-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 h-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-8 w-8"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Итого:</span>
                <span className="text-[#50714d]">{formatPrice(totalPrice)}</span>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full bg-[#50714d] hover:bg-[#3f5a3c]"
                >
                  Оформить заказ
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#50714d] text-[#50714d] hover:bg-[#50714d]/10"
                  onClick={clearCart}
                >
                  Очистить корзину
                </Button>
              </div>
            </>
          )}
        </div>

        <SheetFooter className="mt-6">
          <Button
            variant="ghost"
            onClick={closeCart}
            className="text-sm text-gray-500"
          >
            Продолжить покупки
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
