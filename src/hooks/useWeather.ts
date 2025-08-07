import { useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  isRaining: boolean;
  isCold: boolean;
  isHot: boolean;
  location: string;
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

      const successCallback = (position: GeolocationPosition) => {
        console.log('Geolocation success:', position);
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      };

      const errorCallback = (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Không thể lấy vị trí hiện tại.';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Bạn đã từ chối cho phép truy cập vị trí. Vui lòng bật lại trong cài đặt trình duyệt.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Thông tin vị trí không khả dụng.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Hết thời gian chờ lấy vị trí. Vui lòng thử lại.';
            break;
          default:
            errorMessage = 'Lỗi không xác định khi lấy vị trí.';
        }
        
        reject(new Error(errorMessage));
      };

      const options: PositionOptions = {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    });
  };

  // Get weather by city name
  const getWeatherByCity = async (city: string): Promise<WeatherData> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`;
    console.log('Getting weather for city:', city);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`City weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('City weather data:', data);
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
      isRaining: data.weather[0].main.toLowerCase().includes('rain') || 
                 data.weather[0].main.toLowerCase().includes('drizzle'),
      isCold: data.main.temp < 20,
      isHot: data.main.temp > 30,
      location: data.name
    };
  };

  // Get weather by coordinates
  const getWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
    console.log('Getting weather for coordinates:', { lat, lon });
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Coordinates weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Coordinates weather data:', data);
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main.toLowerCase(),
      isRaining: data.weather[0].main.toLowerCase().includes('rain') || 
                 data.weather[0].main.toLowerCase().includes('drizzle'),
      isCold: data.main.temp < 20,
      isHot: data.main.temp > 30,
      location: data.name
    };
  };

  // Alternative weather API using wttr.in
  const getWeatherFromWttr = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
      const response = await fetch(`https://wttr.in/?format=j1&lat=${lat}&lon=${lon}`);
      if (!response.ok) throw new Error('Failed to fetch weather');
      
      const data = await response.json();
      const current = data.current_condition[0];
      const temp = parseInt(current.temp_C);
      
      return {
        temperature: temp,
        condition: current.weatherDesc[0].value.toLowerCase(),
        isRaining: current.weatherDesc[0].value.toLowerCase().includes('rain') || 
                   current.weatherDesc[0].value.toLowerCase().includes('drizzle'),
        isCold: temp < 20,
        isHot: temp > 30,
        location: 'Vị trí hiện tại'
      };
    } catch (err) {
      console.error('wttr.in API error:', err);
      throw err;
    }
  };

  const loadWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get current location
      const location = await getCurrentLocation();
      console.log('Location obtained:', location);
      
      let weatherData: WeatherData;
      
      try {
        // Try to get weather by coordinates first
        weatherData = await getWeatherByCoords(location.lat, location.lon);
        console.log('Using coordinates weather data');
      } catch (coordsError) {
        console.log('Coordinates API failed, trying wttr.in...');
        
        // Fallback to wttr.in
        weatherData = await getWeatherFromWttr(location.lat, location.lon);
        console.log('Using wttr.in data');
      }
      
      setWeather(weatherData);
    } catch (err) {
      console.error('All weather APIs failed:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Không thể lấy thông tin thời tiết. Vui lòng thử lại sau.');
      }
      
      // Final fallback to mock data
      console.log('Using fallback weather data');
      const mockWeather: WeatherData = {
        temperature: Math.floor(Math.random() * 40) + 10,
        condition: ['clear', 'clouds', 'rain'][Math.floor(Math.random() * 3)],
        isRaining: Math.random() > 0.7,
        isCold: Math.random() > 0.6,
        isHot: Math.random() > 0.4,
        location: 'Vị trí hiện tại'
      };
      
      setWeather(mockWeather);
    } finally {
      setLoading(false);
    }
  };

  // Load weather for specific city
  const loadWeatherForCity = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const weatherData = await getWeatherByCity(city);
      setWeather(weatherData);
    } catch (err) {
      console.error('City weather API failed:', err);
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Không thể lấy thông tin thời tiết cho thành phố này.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    loadWeather,
    loadWeatherForCity,
    getWeatherSuggestions
  };
}; 