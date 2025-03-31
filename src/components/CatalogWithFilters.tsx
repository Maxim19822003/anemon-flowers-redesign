"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Calendar,
  CircleDollarSign,
  Tag,
  Filter
} from "lucide-react";
import { useCart } from "./Cart";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { flowers, FlowerProduct } from "./FlowerCatalog";

// Константа для базового пути
const BASE_PATH = '/anemon-flowers';

// Вспомогательная функция для получения полного пути к изображению
const getImagePath = (path: string) => {
  return `${BASE_PATH}${path}`;
};

// Определяем типы для фильтров
type PriceRange = [number, number];
type FlowerComposition = {
  name: string;
  checked: boolean;
}

type FlowerType = {
  name: 'авторский' | 'сезонный' | 'подарочный' | 'стандартный';
  checked: boolean;
}

type FlowerOccasion = {
  name: string;
  checked: boolean;
}

type SortOption = 'popularity-desc' | 'price-asc' | 'price-desc' | 'newest';

// Получение уникальных категорий цветов из коллекции
const getUniqueCategories = () => {
  const categories = flowers.map(flower => flower.category);
  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories.map(category => ({
    name: category,
    checked: false,
  }));
};

// Получение уникальных событий
const getUniqueOccasions = () => {
  const occasions = flowers
    .map(flower => flower.occasion)
    .filter(occasion => !!occasion) as string[];
  const uniqueOccasions = [...new Set(occasions)];

  return uniqueOccasions.map(occasion => ({
    name: occasion,
    checked: false,
  }));
};

// Получение типов букетов
const getFlowerTypes = (): FlowerType[] => {
  return [
    { name: 'авторский', checked: false },
    { name: 'сезонный', checked: false },
    { name: 'подарочный', checked: false },
    { name: 'стандартный', checked: false }
  ];
};

// Нахождение минимальной и максимальной цены
const findPriceRange = () => {
  const prices = flowers.map(flower => flower.price);
  return [
    Math.min(...prices),
    Math.max(...prices)
  ] as PriceRange;
};

export function CatalogWithFilters() {
  const [selectedFlower, setSelectedFlower] = useState<FlowerProduct | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { addToCart } = useCart();

  // Состояния для фильтров
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<PriceRange>(findPriceRange());
  const [currentPriceRange, setCurrentPriceRange] = useState<PriceRange>(findPriceRange());
  const [compositions, setCompositions] = useState<FlowerComposition[]>(getUniqueCategories());
  const [flowerTypes, setFlowerTypes] = useState<FlowerType[]>(getFlowerTypes());
  const [occasions, setOccasions] = useState<FlowerOccasion[]>(getUniqueOccasions());
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('popularity-desc');
  const [filteredFlowers, setFilteredFlowers] = useState(flowers);

  // Эффект для сортировки
  useEffect(() => {
    const sortFlowers = () => {
      const sorted = [...filteredFlowers];

      switch (sortOption) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'popularity-desc':
          sorted.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'newest':
          sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
      }

      setFilteredFlowers(sorted);
    };

    sortFlowers();
  }, [sortOption, filteredFlowers]);

  // Форматирование цены
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
  };

  // Обработчик для открытия диалога с деталями цветка
  const handleOpenDialog = (flower: FlowerProduct) => {
    setSelectedFlower(flower);
    setIsDialogOpen(true);
  };

  // Обработчик добавления в корзину
  const handleAddToCart = (flower: FlowerProduct) => {
    addToCart({
      id: flower.id,
      name: flower.name,
      price: flower.price,
      image: flower.image
    });
  };

  // Обработчик изменения диапазона цен
  const handlePriceChange = (values: number[]) => {
    setCurrentPriceRange([values[0], values[1]]);
  };

  // Обработчик изменения состава букета
  const handleCompositionChange = (index: number, checked: boolean) => {
    const newCompositions = [...compositions];
    newCompositions[index].checked = checked;
    setCompositions(newCompositions);
  };

  // Обработчик изменения типа букета
  const handleTypeChange = (index: number, checked: boolean) => {
    const newTypes = [...flowerTypes];
    newTypes[index].checked = checked;
    setFlowerTypes(newTypes);
  };

  // Обработчик изменения события
  const handleOccasionChange = (index: number, checked: boolean) => {
    const newOccasions = [...occasions];
    newOccasions[index].checked = checked;
    setOccasions(newOccasions);
  };

  // Обработчик изменения опции сортировки
  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
  };

  // Применение фильтров
  const applyFilters = () => {
    const filtered = flowers.filter(flower => {
      // Фильтрация по цене
      if (flower.price < currentPriceRange[0] || flower.price > currentPriceRange[1]) {
        return false;
      }

      // Фильтрация по категории цветов
      const activeCategories = compositions.filter(comp => comp.checked).map(comp => comp.name);
      if (activeCategories.length > 0 && !activeCategories.includes(flower.category)) {
        return false;
      }

      // Фильтрация по типу букета
      const activeTypes = flowerTypes.filter(type => type.checked).map(type => type.name);
      if (activeTypes.length > 0 && !activeTypes.includes(flower.type)) {
        return false;
      }

      // Фильтрация по событию
      const activeOccasions = occasions.filter(occ => occ.checked).map(occ => occ.name);
      if (activeOccasions.length > 0 && (!flower.occasion || !activeOccasions.includes(flower.occasion))) {
        return false;
      }

      // Фильтрация только новинок
      if (showNewOnly && !flower.isNew) {
        return false;
      }

      return true;
    });

    // Применить текущую сортировку к новым отфильтрованным цветам
    const sorted = [...filtered];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'popularity-desc':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    setFilteredFlowers(sorted);
    setIsFilterOpen(false);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setCurrentPriceRange(findPriceRange());
    setCompositions(getUniqueCategories());
    setFlowerTypes(getFlowerTypes());
    setOccasions(getUniqueOccasions());
    setShowNewOnly(false);
    setSortOption('popularity-desc');

    // Применить только сортировку
    const sorted = [...flowers];
    sorted.sort((a, b) => b.popularity - a.popularity);
    setFilteredFlowers(sorted);

    setIsFilterOpen(false);
  };

  // Получить текст текущей сортировки
  const getSortText = () => {
    switch (sortOption) {
      case 'price-asc':
        return 'По возрастанию цены';
      case 'price-desc':
        return 'По убыванию цены';
      case 'popularity-desc':
        return 'По популярности';
      case 'newest':
        return 'Сначала новинки';
      default:
        return 'По популярности';
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-[#e1da68] mb-2">
              Каталог цветов
            </h1>
            <p className="text-white/80 dark:text-gray-300 mb-4 md:mb-0">
              Найдите идеальный букет для любого случая
            </p>
          </div>

          <div className="flex space-x-2">
            {/* Кнопка сортировки */}
            <div className="relative">
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800 border-[#50714d] dark:border-[#d5ce5e] text-white"
                onClick={() => {
                  const nextOption = sortOption === 'popularity-desc'
                    ? 'price-asc'
                    : sortOption === 'price-asc'
                    ? 'price-desc'
                    : sortOption === 'price-desc'
                    ? 'newest'
                    : 'popularity-desc';
                  handleSortChange(nextOption);
                }}
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline-block">{getSortText()}</span>
              </Button>
            </div>

            {/* Кнопка фильтра */}
            <Button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="flex items-center space-x-2 bg-white/20 dark:bg-gray-800 border-[#50714d] dark:border-[#d5ce5e] text-white"
            >
              <Filter className="h-4 w-4" />
              <span>Фильтры</span>
            </Button>
          </div>
        </div>

        {/* Панель фильтров */}
        {isFilterOpen && (
          <div className="bg-white/90 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#50714d] dark:text-[#d5ce5e]">Фильтры</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Диапазон цен */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-3 text-[#50714d] dark:text-[#d5ce5e]">
                  <CircleDollarSign className="h-4 w-4 mr-2" />
                  Диапазон цен
                </h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[currentPriceRange[0], currentPriceRange[1]]}
                    min={priceRange[0]}
                    max={priceRange[1]}
                    step={100}
                    value={[currentPriceRange[0], currentPriceRange[1]]}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>{formatPrice(currentPriceRange[0])}</span>
                    <span>{formatPrice(currentPriceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Тип букета */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-3 text-[#50714d] dark:text-[#d5ce5e]">
                  <Tag className="h-4 w-4 mr-2" />
                  Тип букета
                </h4>
                <div className="space-y-2">
                  {flowerTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${index}`}
                        checked={type.checked}
                        onCheckedChange={(checked) => handleTypeChange(index, checked as boolean)}
                      />
                      <Label
                        htmlFor={`type-${index}`}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Категория цветов */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-3 text-[#50714d] dark:text-[#d5ce5e]">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Категория цветов
                </h4>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
                  {compositions.map((composition, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`composition-${index}`}
                        checked={composition.checked}
                        onCheckedChange={(checked) => handleCompositionChange(index, checked as boolean)}
                      />
                      <Label
                        htmlFor={`composition-${index}`}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {composition.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Повод */}
              <div>
                <h4 className="flex items-center text-sm font-medium mb-3 text-[#50714d] dark:text-[#d5ce5e]">
                  <Calendar className="h-4 w-4 mr-2" />
                  Повод
                </h4>
                <div className="space-y-2">
                  {occasions.map((occasion, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`occasion-${index}`}
                        checked={occasion.checked}
                        onCheckedChange={(checked) => handleOccasionChange(index, checked as boolean)}
                      />
                      <Label
                        htmlFor={`occasion-${index}`}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {occasion.name.charAt(0).toUpperCase() + occasion.name.slice(1)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Новинки */}
            <div className="mb-4 flex items-center space-x-2">
              <Checkbox
                id="show-new-only"
                checked={showNewOnly}
                onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
              />
              <Label
                htmlFor="show-new-only"
                className="text-[#50714d] dark:text-[#d5ce5e] font-medium"
              >
                Только новинки
              </Label>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={applyFilters}
                className="bg-[#50714d] hover:bg-[#3f5a3c] text-white dark:bg-[#d5ce5e] dark:hover:bg-[#e1da68] dark:text-[#3a543a]"
              >
                Применить
              </Button>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="border-[#50714d] text-[#50714d] hover:bg-[#50714d]/10 dark:border-[#d5ce5e] dark:text-[#d5ce5e] dark:hover:bg-[#d5ce5e]/10"
              >
                Сбросить
              </Button>
            </div>
          </div>
        )}

        {/* Счетчик результатов */}
        <div className="mb-6 text-white/80 dark:text-gray-300">
          Найдено букетов: {filteredFlowers.length}
        </div>

        {/* Результаты фильтрации */}
        {filteredFlowers.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-white dark:text-[#e1da68] mb-2">Нет результатов</h3>
            <p className="text-white/80 dark:text-gray-300">
              К сожалению, по вашим критериям ничего не найдено. Попробуйте изменить фильтры.
            </p>
            <Button
              onClick={resetFilters}
              className="mt-4 bg-[#50714d] hover:bg-[#3f5a3c] text-white dark:bg-[#d5ce5e] dark:hover:bg-[#e1da68] dark:text-[#3a543a]"
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFlowers.map((flower) => (
              <Card key={flower.id} className="overflow-hidden transition-all hover:shadow-lg border-0 bg-white/90 dark:bg-gray-800 relative">
                {flower.isNew && (
                  <div className="absolute top-3 right-3 z-10 bg-[#e1da68] text-[#50714d] px-2 py-1 rounded-md text-xs font-bold">
                    Новинка
                  </div>
                )}
                {flower.popularity >= 4 && (
                  <div className="absolute top-3 left-3 z-10 flex items-center space-x-1 bg-[#50714d] text-white px-2 py-1 rounded-md text-xs font-bold">
                    <Star className="h-3 w-3 fill-[#e1da68] text-[#e1da68]" />
                    <span>Топ</span>
                  </div>
                )}
                <div className="relative h-64 w-full">
                  <Image
                    src={getImagePath(flower.image)}
                    alt={flower.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-[#50714d] dark:text-[#d5ce5e]">{flower.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">{flower.description}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          {flower.category}
                        </span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                          {flower.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#50714d] dark:text-[#d5ce5e] font-bold">{formatPrice(flower.price)}</p>
                  </div>
                  {flower.occasion && (
                    <p className="text-xs text-[#50714d] dark:text-[#d5ce5e] mt-2">
                      Идеально для: {flower.occasion}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex space-x-2">
                  <Button
                    onClick={() => handleOpenDialog(flower)}
                    variant="outline"
                    className="flex-1 border-[#50714d] text-[#50714d] hover:bg-[#50714d]/10 dark:border-[#d5ce5e] dark:text-[#d5ce5e] dark:hover:bg-[#d5ce5e]/10"
                  >
                    Подробнее
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(flower)}
                    className="bg-[#50714d] hover:bg-[#3f5a3c] dark:bg-[#3a543a] dark:hover:bg-[#304830] dark:text-white"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Диалог с деталями букета */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedFlower && (
          <DialogContent className="max-w-3xl bg-white dark:bg-gray-800">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-[#50714d] dark:text-[#d5ce5e]">{selectedFlower.name}</DialogTitle>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {selectedFlower.category}
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                    {selectedFlower.type}
                  </span>
                  {selectedFlower.isNew && (
                    <span className="text-xs bg-[#e1da68]/20 text-[#50714d] dark:text-[#e1da68] px-2 py-1 rounded">
                      Новинка
                    </span>
                  )}
                </div>
              </div>
              <DialogDescription className="text-gray-600 dark:text-gray-300 flex items-center">
                {selectedFlower.occasion && (
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Идеально для: {selectedFlower.occasion}
                  </span>
                )}
                <div className="ml-auto flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-[#e1da68] text-[#e1da68]" />
                  <span>{selectedFlower.popularity} из 5</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div className="relative h-64 w-full my-4">
              <Image
                src={getImagePath(selectedFlower.image)}
                alt={selectedFlower.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedFlower.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-[#50714d] dark:text-[#d5ce5e] text-xl font-bold">{formatPrice(selectedFlower.price)}</p>
              <Button
                className="bg-[#50714d] hover:bg-[#3f5a3c] dark:bg-[#3a543a] dark:hover:bg-[#304830]"
                onClick={() => {
                  handleAddToCart(selectedFlower);
                  setIsDialogOpen(false);
                }}
              >
                В корзину
              </Button>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
