import { useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  isRaining: boolean;
  isCold: boolean;
  isHot: boolean;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeatherSuggestions = (weather: WeatherData) => {
    const suggestions = {
      hot: ['healthy', 'dessert'],
      cold: ['main', 'snack'],
      raining: ['main', 'healthy'],
      default: ['any']
    };

    if (weather.isHot) return suggestions.hot;
    if (weather.isCold) return suggestions.cold;
    if (weather.isRaining) return suggestions.raining;
    return suggestions.default;
  };

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate weather data for demo
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 40) + 10, // 10-50°C
        condition: ['clear', 'rainy', 'cloudy'][Math.floor(Math.random() * 3)],
        isRaining: Math.random() > 0.7,
        isCold: Math.random() > 0.6,
        isHot: Math.random() > 0.4
      };
      
      setWeather(mockWeather);
    } catch (err) {
      setError('Không thể lấy thông tin thời tiết');
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    loadWeather,
    getWeatherSuggestions
  };
}; 