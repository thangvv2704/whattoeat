import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Moon, RefreshCw, Share2, Star, Sun, Utensils } from 'lucide-react';
import { useState } from 'react';
import { categories, foods } from './data/foods';
import { useDarkMode } from './hooks/useDarkMode';
import { useFavorites } from './hooks/useFavorites';
import { FoodCategory, FoodItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('any');
  const [currentFood, setCurrentFood] = useState<FoodItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const getRandomFood = (category: FoodCategory) => {
    const filteredFoods = category === 'any' 
      ? foods 
      : foods.filter(food => food.category === category);
    
    if (filteredFoods.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * filteredFoods.length);
    return filteredFoods[randomIndex];
  };

  const handleGenerate = () => {
    setIsLoading(true);
    setShowResult(false);
    setShowFavorites(false);
    
    // Simulate loading
    setTimeout(() => {
      const food = getRandomFood(selectedCategory);
      setCurrentFood(food);
      setIsLoading(false);
      setShowResult(true);
    }, 1500);
  };

  const handleShare = async () => {
    if (!currentFood) return;
    
    const text = `🍜 WhatToEat.vn gợi ý: ${currentFood.emoji} ${currentFood.name}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WhatToEat.vn',
          text: text,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText(text);
      alert('Đã copy vào clipboard!');
    }
  };

  const getFavoriteFoods = () => {
    return foods.filter(food => isFavorite(food.id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 relative"
        >
          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="absolute top-0 right-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
          </motion.button>

          {/* Favorites Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowFavorites(!showFavorites)}
            className="absolute top-0 left-0 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </motion.button>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4">
            🍜 WhatToEat.vn
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Giúp bạn quyết định ăn gì hôm nay!
          </p>
        </motion.div>

        {/* Favorites Section */}
        <AnimatePresence>
          {showFavorites && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="card">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-yellow-500" />
                  Món yêu thích ({favorites.length})
                </h2>
                {getFavoriteFoods().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFavoriteFoods().map((food) => (
                      <motion.div
                        key={food.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{food.emoji}</span>
                          <div>
                            <h3 className="font-semibold text-gray-800 dark:text-white">{food.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{food.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleFavorite(food.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                    Chưa có món yêu thích nào. Hãy thử chọn món và nhấn ❤️ để lưu!
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
            Chọn loại món ăn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-card ${
                  selectedCategory === category.id
                    ? 'category-card-selected'
                    : 'category-card-default'
                }`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="font-semibold text-gray-800 dark:text-white">{category.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{category.description}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <RefreshCw className="inline-block w-6 h-6 mr-2" />
              </motion.div>
            ) : (
              <Utensils className="inline-block w-6 h-6 mr-2" />
            )}
            {isLoading ? 'Đang chọn món...' : 'Chọn món ăn ngẫu nhiên'}
          </button>
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {showResult && currentFood && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="card max-w-md mx-auto"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-8xl mb-4"
                >
                  {currentFood.emoji}
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                >
                  {currentFood.name}
                </motion.h3>
                {currentFood.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 mb-4"
                  >
                    {currentFood.description}
                  </motion.p>
                )}
                <div className="flex justify-center space-x-4">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => toggleFavorite(currentFood.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isFavorite(currentFood.id)
                        ? 'text-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(currentFood.id) ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleShare}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-gray-500 dark:text-gray-400"
        >
          <p>Made with ❤️ for Vietnamese food lovers! 🇻🇳</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App; 