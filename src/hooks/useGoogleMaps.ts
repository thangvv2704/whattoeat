import { useState } from 'react';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  distance: number;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

export const useGoogleMaps = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchNearbyRestaurants = async (location: Location, foodType: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate Google Places API call
      const mockRestaurants: Restaurant[] = [
        {
          id: '1',
          name: 'Quán Phở Hà Nội',
          address: '123 Đường ABC, Quận 1, TP.HCM',
          rating: 4.5,
          priceLevel: 2,
          distance: 0.5,
          types: ['restaurant', 'vietnamese']
        },
        {
          id: '2',
          name: 'Bún Chả Sài Gòn',
          address: '456 Đường XYZ, Quận 3, TP.HCM',
          rating: 4.2,
          priceLevel: 1,
          distance: 1.2,
          types: ['restaurant', 'vietnamese']
        },
        {
          id: '3',
          name: 'Cơm Tấm Ngon',
          address: '789 Đường DEF, Quận 5, TP.HCM',
          rating: 4.7,
          priceLevel: 1,
          distance: 0.8,
          types: ['restaurant', 'vietnamese']
        }
      ];

      // Filter by food type
      const filteredRestaurants = mockRestaurants.filter(restaurant => 
        restaurant.name.toLowerCase().includes(foodType.toLowerCase())
      );

      setRestaurants(filteredRestaurants);
    } catch (err) {
      setError('Không thể tìm quán ăn gần đây');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Trình duyệt không hỗ trợ định vị'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error('Không thể lấy vị trí hiện tại'));
        }
      );
    });
  };

  const openInGoogleMaps = (restaurant: Restaurant) => {
    const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  return {
    restaurants,
    loading,
    error,
    searchNearbyRestaurants,
    getCurrentLocation,
    openInGoogleMaps
  };
}; 