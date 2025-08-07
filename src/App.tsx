import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NearbyRestaurants } from './components/NearbyRestaurants';
import { WeatherSuggestion } from './components/WeatherSuggestion';
import { categories, foods } from './data/foods';
import { useFavorites } from './hooks/useFavorites';
import { FoodCategory, FoodItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('any');
  const [suggestedFood, setSuggestedFood] = useState<FoodItem | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showRestaurants, setShowRestaurants] = useState(false);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  
  // Refs for auto-scrolling
  const resultRef = useRef<HTMLDivElement>(null);
  const weatherRef = useRef<HTMLDivElement>(null);
  const restaurantsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to result when food is selected
  useEffect(() => {
    if (suggestedFood && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  }, [suggestedFood]);

  // Auto-scroll to weather section when shown
  useEffect(() => {
    if (showWeather && weatherRef.current) {
      setTimeout(() => {
        weatherRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showWeather]);

  // Auto-scroll to restaurants section when shown
  useEffect(() => {
    if (showRestaurants && restaurantsRef.current) {
      setTimeout(() => {
        restaurantsRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showRestaurants]);

  // Auto-scroll to categories when restaurants section is closed
  useEffect(() => {
    if (!showRestaurants && categoriesRef.current) {
      setTimeout(() => {
        categoriesRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [showRestaurants]);

  const getRandomFood = (category: FoodCategory = 'any'): FoodItem => {
    const filteredFoods = category === 'any' 
      ? foods 
      : foods.filter(food => food.category === category);
    
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    return filteredFoods[randomIndex];
  };

  const handleCategorySelect = (category: FoodCategory) => {
    setSelectedCategory(category);
    const food = getRandomFood(category);
    setSuggestedFood(food);
  };

  const handleWeatherCategorySelect = (category: string) => {
    setSelectedCategory(category as FoodCategory);
    const food = getRandomFood(category as FoodCategory);
    setSuggestedFood(food);
  };

  const handleRestaurantFoodSelect = (foodName: string) => {
    // Find a food item that matches the selected food name
    const matchingFood = foods.find(food => 
      food.name.toLowerCase().includes(foodName.toLowerCase()) ||
      foodName.toLowerCase().includes(food.name.toLowerCase())
    );
    
    if (matchingFood) {
      setSuggestedFood(matchingFood);
      setShowRestaurants(false); // Close restaurants section
      // Auto-scroll to categories after a short delay
      setTimeout(() => {
        categoriesRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    } else {
      // If no exact match, create a custom food item
      const customFood: FoodItem = {
        id: `custom_${Date.now()}`,
        name: foodName,
        category: 'main',
        description: `Món ${foodName} được gợi ý từ quán ăn gần đây`,
        emoji: '🍽️'
      };
      setSuggestedFood(customFood);
      setShowRestaurants(false);
      // Auto-scroll to categories after a short delay
      setTimeout(() => {
        categoriesRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 300);
    }
  };

  const getFavoriteFoods = () => {
    return favorites.map(fav => foods.find(food => food.id === fav.foodId)).filter(Boolean) as FoodItem[];
  };

  const favoriteFoods = getFavoriteFoods();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 max-w-md h-screen flex flex-col">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            🍜 WhatToEat.vn
          </h1>
          <p className="text-sm text-gray-600">
            Không biết ăn gì? Để chúng tôi gợi ý cho bạn!
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center items-center mb-4 gap-3"
        >
          <button
            onClick={() => {
              setShowWeather(!showWeather);
              setShowRestaurants(false); // Close restaurants when opening weather
              setSuggestedFood(null); // Hide food result when opening weather
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              showWeather 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow-lg'
            }`}
          >
            🌤️ Thời tiết
          </button>
          
          <button
            onClick={() => {
              setShowRestaurants(!showRestaurants);
              setShowWeather(false); // Close weather when opening restaurants
              setSuggestedFood(null); // Hide food result when opening restaurants
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              showRestaurants 
                ? 'bg-green-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-green-50 shadow-lg'
            }`}
          >
            🍽️ Quán ăn
          </button>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="relative p-3 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="w-5 h-5 text-red-500" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Weather Section */}
          <AnimatePresence>
            {showWeather && (
              <motion.div
                ref={weatherRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <WeatherSuggestion 
                  onCategorySelect={handleWeatherCategorySelect} 
                  onClose={() => {
                    setShowWeather(false);
                    setSuggestedFood(null); // Hide food result when closing weather
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Restaurants Section */}
          <AnimatePresence>
            {showRestaurants && (
              <motion.div
                ref={restaurantsRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NearbyRestaurants 
                  onClose={() => {
                    setShowRestaurants(false);
                    setSuggestedFood(null); // Hide food result when closing restaurants
                  }} 
                  onFoodSelect={handleRestaurantFoodSelect}
                  onChooseFood={() => {
                    setShowRestaurants(false);
                    setTimeout(() => {
                      categoriesRef.current?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                      });
                    }, 300);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Favorites Section */}
          <AnimatePresence>
            {showFavorites && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="card mb-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    Món yêu thích ({favorites.length})
                  </h3>
                  <button
                    onClick={() => setShowFavorites(false)}
                    className="p-1 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                
                {favoriteFoods.length === 0 ? (
                  <p className="text-gray-500 text-center py-3 text-sm">
                    Chưa có món yêu thích nào. Hãy thử gợi ý món ăn và lưu lại nhé!
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {favoriteFoods.map((food) => (
                      <motion.div
                        key={food.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{food.emoji}</span>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{food.name}</p>
                            <p className="text-xs text-gray-500">
                              {categories.find(cat => cat.id === food.category)?.name}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(food.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Heart className="w-3 h-3 fill-current" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Categories */}
          <AnimatePresence>
            {!showWeather && !showRestaurants && (
              <motion.div 
                ref={categoriesRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="card mb-4"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Chọn loại món ăn
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`category-card ${
                        selectedCategory === category.id 
                          ? 'category-card-selected' 
                          : 'category-card-default'
                      }`}
                    >
                      <div className="text-xl mb-1">{category.emoji}</div>
                      <div className="font-medium text-gray-800 text-sm">{category.name}</div>
                      <div className="text-xs text-gray-500">
                        {category.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result */}
          <AnimatePresence>
            {suggestedFood && !showWeather && !showRestaurants && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="card"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                    className="text-5xl mb-3"
                  >
                    {suggestedFood.emoji}
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl font-bold text-gray-800 mb-2"
                  >
                    {suggestedFood.name}
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-3 text-sm"
                  >
                    {suggestedFood.description || 'Món ăn ngon và phù hợp với bạn!'}
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center gap-2"
                  >
                    <button
                      onClick={() => toggleFavorite(suggestedFood.id)}
                      className={`p-2 rounded-xl transition-all duration-300 ${
                        isFavorite(suggestedFood.id)
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(suggestedFood.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => handleCategorySelect(selectedCategory)}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      🔄 Gợi ý khác
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-2 text-gray-500 text-xs"
        >
          <p>Made with ❤️ by WhatToEat.vn</p>
          <p className="mt-1">Không biết ăn gì? Hãy để chúng tôi giúp bạn!</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App; 