import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Thermometer } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

interface WeatherSuggestionProps {
  onCategorySelect: (category: string) => void;
}

export const WeatherSuggestion = ({ onCategorySelect }: WeatherSuggestionProps) => {
  const { weather, loading, error, loadWeather, getWeatherSuggestions } = useWeather();

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      default:
        return <Sun className="w-6 h-6 text-yellow-500" />;
    }
  };

  const getWeatherAdvice = (weather: any) => {
    if (weather.isHot) {
      return 'Trời nóng, nên ăn món mát và healthy!';
    }
    if (weather.isCold) {
      return 'Trời lạnh, nên ăn món nóng và bổ dưỡng!';
    }
    if (weather.isRaining) {
      return 'Trời mưa, nên ăn món nóng và ấm bụng!';
    }
    return 'Thời tiết đẹp, ăn gì cũng ngon!';
  };

  const handleWeatherSuggestion = () => {
    if (weather) {
      const suggestions = getWeatherSuggestions(weather);
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      onCategorySelect(randomSuggestion);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
        <Thermometer className="w-5 h-5 mr-2 text-blue-500" />
        Gợi ý theo thời tiết
      </h3>

      {!weather && !loading && (
        <button
          onClick={loadWeather}
          className="btn-primary w-full"
        >
          Kiểm tra thời tiết
        </button>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Đang kiểm tra thời tiết...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}

      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              {getWeatherIcon(weather.condition)}
              <div className="ml-3">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {weather.temperature}°C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {weather.condition}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <p className="text-gray-800 dark:text-white text-sm">
              {getWeatherAdvice(weather)}
            </p>
          </div>

          <button
            onClick={handleWeatherSuggestion}
            className="btn-primary w-full"
          >
            Gợi ý món ăn theo thời tiết
          </button>
        </div>
      )}
    </motion.div>
  );
}; 