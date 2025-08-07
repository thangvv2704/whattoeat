import { motion } from 'framer-motion';
import { Cloud, CloudRain, MapPin, Sun, Thermometer } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

interface WeatherSuggestionProps {
  onCategorySelect: (category: string) => void;
}

export const WeatherSuggestion = ({ onCategorySelect }: WeatherSuggestionProps) => {
  const { weather, loading, error, loadWeather, getWeatherSuggestions } = useWeather();

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'rain':
      case 'drizzle':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'clouds':
      case 'mist':
      case 'fog':
        return <Cloud className="w-6 h-6 text-gray-500" />;
      case 'clear':
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-500" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-500" />;
    }
  };

  const getWeatherDescription = (condition: string) => {
    const descriptions: { [key: string]: string } = {
      'clear': 'Trời quang',
      'clouds': 'Có mây',
      'rain': 'Mưa',
      'drizzle': 'Mưa phùn',
      'thunderstorm': 'Giông bão',
      'snow': 'Tuyết',
      'mist': 'Sương mù',
      'fog': 'Sương mù',
      'haze': 'Sương mù nhẹ',
      'smoke': 'Khói mù',
      'dust': 'Bụi',
      'sand': 'Cát',
      'ash': 'Tro',
      'squall': 'Gió mạnh',
      'tornado': 'Lốc xoáy'
    };
    return descriptions[condition] || condition;
  };

  const getWeatherAdvice = (weather: any) => {
    if (weather.isHot) {
      return 'Trời nóng, nên ăn món mát và healthy để giải nhiệt!';
    }
    if (weather.isCold) {
      return 'Trời lạnh, nên ăn món nóng và bổ dưỡng để ấm bụng!';
    }
    if (weather.isRaining) {
      return 'Trời mưa, nên ăn món nóng và ấm bụng để thư giãn!';
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
        <div className="text-center">
          <button
            onClick={loadWeather}
            className="btn-primary w-full"
          >
            <MapPin className="w-4 h-4 mr-2 inline" />
            Kiểm tra thời tiết hiện tại
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Cho phép truy cập vị trí để lấy thông tin thời tiết chính xác
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Đang kiểm tra thời tiết...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          <p className="mb-2">{error}</p>
          <button
            onClick={loadWeather}
            className="text-sm underline hover:no-underline"
          >
            Thử lại
          </button>
        </div>
      )}

      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
            <div className="flex items-center">
              {getWeatherIcon(weather.condition)}
              <div className="ml-3">
                <p className="font-semibold text-gray-800 dark:text-white text-lg">
                  {weather.temperature}°C
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getWeatherDescription(weather.condition)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {weather.isHot && '🔥 Nóng'}
                {weather.isCold && '❄️ Lạnh'}
                {weather.isRaining && '🌧️ Mưa'}
                {!weather.isHot && !weather.isCold && !weather.isRaining && '😊 Dễ chịu'}
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
            <p className="text-gray-800 dark:text-white text-sm font-medium">
              💡 {getWeatherAdvice(weather)}
            </p>
          </div>

          <button
            onClick={handleWeatherSuggestion}
            className="btn-primary w-full"
          >
            🍜 Gợi ý món ăn theo thời tiết
          </button>
        </div>
      )}
    </motion.div>
  );
}; 