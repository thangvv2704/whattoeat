import { motion } from 'framer-motion';
import { AlertCircle, Cloud, CloudRain, MapPin, Sun, Thermometer, X } from 'lucide-react';
import { useState } from 'react';
import { useWeather } from '../hooks/useWeather';

interface WeatherSuggestionProps {
  onCategorySelect: (category: string) => void;
  onClose: () => void;
}

const VIETNAM_CITIES = [
  'Ho Chi Minh',
  'Hanoi',
  'Da Nang',
  'Hai Phong',
  'Can Tho',
  'Nha Trang',
  'Hue',
  'Vung Tau',
  'Bien Hoa',
  'Qui Nhon'
];

export const WeatherSuggestion = ({ onCategorySelect, onClose }: WeatherSuggestionProps) => {
  const { weather, loading, error, loadWeather, loadWeatherForCity, getWeatherSuggestions } = useWeather();
  const [showFallback, setShowFallback] = useState(false);

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

  const handleLoadWeather = async () => {
    try {
      await loadWeather();
    } catch (err) {
      setShowFallback(true);
    }
  };

  const handleUseDefaultLocation = async () => {
    try {
      await loadWeatherForCity('Ho Chi Minh');
      setShowFallback(false);
    } catch (err) {
      console.error('Failed to load Ho Chi Minh weather:', err);
    }
  };

  const handleCitySelect = async (city: string) => {
    try {
      await loadWeatherForCity(city);
      setShowFallback(false);
    } catch (err) {
      console.error(`Failed to load ${city} weather:`, err);
    }
  };

  return (
    <motion.div className="card mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Thermometer className="w-4 h-4 mr-2 text-blue-500" />
          Gợi ý theo thời tiết
        </h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {!weather && !loading && !showFallback && (
        <div className="text-center">
          <button
            onClick={handleLoadWeather}
            className="btn-primary w-full mb-4"
          >
            <MapPin className="w-4 h-4 mr-2 inline" />
            Kiểm tra thời tiết hiện tại
          </button>
          <p className="text-sm text-gray-600 mb-4">
            Cho phép truy cập vị trí để lấy thông tin thời tiết chính xác
          </p>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 mb-2">
              Hoặc chọn thành phố:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {VIETNAM_CITIES.slice(0, 6).map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFallback && !weather && !loading && (
        <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-gray-800 mb-3">
            Không thể lấy vị trí hiện tại. Bạn có muốn sử dụng thời tiết TP.HCM làm mẫu không?
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleUseDefaultLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Sử dụng TP.HCM
            </button>
            <button
              onClick={() => setShowFallback(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Thử lại
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Đang kiểm tra thời tiết...</p>
        </div>
      )}

      {error && !showFallback && (
        <div className="text-red-500 text-center py-4">
          <p className="mb-2">{error}</p>
          <button
            onClick={handleLoadWeather}
            className="text-sm underline hover:no-underline"
          >
            Thử lại
          </button>
        </div>
      )}

      {weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="flex items-center">
              {getWeatherIcon(weather.condition)}
              <div className="ml-3">
                <p className="font-semibold text-gray-800 text-lg">
                  {weather.temperature}°C
                </p>
                <p className="text-sm text-gray-600">
                  {getWeatherDescription(weather.condition)}
                </p>
                <p className="text-xs text-gray-500">
                  📍 {weather.location}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">
                {weather.isHot && '🔥 Nóng'}
                {weather.isCold && '❄️ Lạnh'}
                {weather.isRaining && '🌧️ Mưa'}
                {!weather.isHot && !weather.isCold && !weather.isRaining && '😊 Dễ chịu'}
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <p className="text-gray-800 text-sm font-medium">
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