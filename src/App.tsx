import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCw, Share2, Utensils } from 'lucide-react';
import { useState } from 'react';
import { categories, foods } from './data/foods';
import { FoodCategory, FoodItem } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('any');
  const [currentFood, setCurrentFood] = useState<FoodItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            🍜 WhatToEat.vn
          </h1>
          <p className="text-xl text-gray-600">
            Giúp bạn quyết định ăn gì hôm nay!
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Chọn loại món ăn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'border-orange-500 bg-orange-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="font-semibold text-gray-800">{category.name}</div>
                <div className="text-sm text-gray-600">{category.description}</div>
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
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  {currentFood.name}
                </motion.h3>
                {currentFood.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 mb-4"
                  >
                    {currentFood.description}
                  </motion.p>
                )}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleShare}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 text-gray-500"
        >
          <p>Made with ❤️ for Vietnamese food lovers! 🇻🇳</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App; 