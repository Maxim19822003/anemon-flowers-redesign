"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов" }),
  email: z.string().email({ message: "Пожалуйста, введите корректный email адрес" }),
  phone: z.string().min(10, { message: "Пожалуйста, введите корректный номер телефона" }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов" }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    // В реальном приложении здесь будет отправка данных на сервер
    console.log(values);
    setIsSubmitted(true);
    form.reset();

    // Сбросить сообщение об успешной отправке через 5 секунд
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  return (
    <section id="contact" className="py-16 bg-white/20 dark:bg-gray-800/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#e1da68] mb-4">Свяжитесь с нами</h2>
          <p className="text-white/80 dark:text-gray-300">
            У вас есть вопросы или особые пожелания? Заполните форму ниже, и мы свяжемся с вами в ближайшее время.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#e1da68]">Наши контакты</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-[#e1da68]">Адрес:</p>
                <p className="text-white/80 dark:text-gray-300">ул. Цветочная, 123, Москва, Россия</p>
              </div>
              <div>
                <p className="font-medium text-[#e1da68]">Телефон:</p>
                <p className="text-white/80 dark:text-gray-300">+7 (999) 123-45-67</p>
              </div>
              <div>
                <p className="font-medium text-[#e1da68]">Email:</p>
                <p className="text-white/80 dark:text-gray-300">info@anemon-flowers.ru</p>
              </div>
              <div>
                <p className="font-medium text-[#e1da68]">Часы работы:</p>
                <p className="text-white/80 dark:text-gray-300">Пн-Пт: 9:00 - 20:00</p>
                <p className="text-white/80 dark:text-gray-300">Сб-Вс: 10:00 - 18:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full py-8">
                <div className="text-green-600 mb-4 text-4xl">✓</div>
                <h3 className="text-xl font-semibold text-green-600 mb-2">Сообщение отправлено!</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Спасибо за ваше сообщение. Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Имя</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ваше имя" {...field} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ваш email" {...field} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Телефон</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ваш телефон" {...field} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-200">Сообщение</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Введите ваше сообщение" rows={4} {...field} className="dark:bg-gray-700 dark:text-white dark:border-gray-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-[#3a543a] hover:bg-[#4b6a4b] dark:bg-[#d5ce5e] dark:hover:bg-[#e1da68] dark:text-[#3a543a]">Отправить</Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
