import { useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  isRaining: boolean;
  isCold: boolean;
  isHot: boolean;
}

const WEATHER_API_KEY = '90305b0224ab9fb12930eb19df80cb7e';

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

  const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Trình duyệt không hỗ trợ định vị'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error('Không thể lấy vị trí hiện tại'));
        }
      );
    });
  };

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current location
      const location = await getCurrentLocation();
      
      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric&lang=vi`
      );
      
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin thời tiết');
      }
      
      const data = await response.json();
      
      // Process weather data
      const weatherData: WeatherData = {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main.toLowerCase(),
        isRaining: data.weather[0].main.toLowerCase().includes('rain') || 
                   data.weather[0].main.toLowerCase().includes('drizzle'),
        isCold: data.main.temp < 20,
        isHot: data.main.temp > 30
      };
      
      setWeather(weatherData);
    } catch (err) {
      console.error('Weather API error:', err);
      setError('Không thể lấy thông tin thời tiết. Vui lòng thử lại sau.');
      
      // Fallback to mock data for demo
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 40) + 10,
        condition: ['clear', 'rainy', 'cloudy'][Math.floor(Math.random() * 3)],
        isRaining: Math.random() > 0.7,
        isCold: Math.random() > 0.6,
        isHot: Math.random() > 0.4
      };
      
      setWeather(mockWeather);
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