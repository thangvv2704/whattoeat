import { useState } from 'react';

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  distance: number;
  types: string[];
  specialties: string[];
  description: string;
  placeId?: string;
  photos?: string[];
}

interface Location {
  lat: number;
  lng: number;
}

// Google Places API configuration
const GOOGLE_PLACES_API_KEY = 'YOUR_GOOGLE_PLACES_API_KEY'; // You'll need to get this from Google Cloud Console
const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export const useGoogleMaps = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Search nearby restaurants using Google Places API
  const searchNearbyRestaurants = async (location: Location) => {
    setLoading(true);
    setError(null);

    try {
      // If no API key, fallback to mock data
      if (!GOOGLE_PLACES_API_KEY || GOOGLE_PLACES_API_KEY === 'YOUR_GOOGLE_PLACES_API_KEY') {
        console.log('Using mock data - no Google Places API key provided');
        await searchMockRestaurants(location);
        return;
      }

      const url = `${GOOGLE_PLACES_BASE_URL}/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=restaurant&key=${GOOGLE_PLACES_API_KEY}`;
      
      console.log('Searching restaurants with Google Places API...');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK') {
        throw new Error(`Google Places API status: ${data.status}`);
      }

      // Transform Google Places data to our format
      const restaurants: Restaurant[] = data.results.map((place: any, index: number) => {
        const distance = calculateDistance(location.lat, location.lng, place.geometry.location.lat, place.geometry.location.lng);
        
        return {
          id: place.place_id || `place_${index}`,
          name: place.name,
          address: place.vicinity || place.formatted_address || 'Địa chỉ không khả dụng',
          rating: place.rating || 0,
          priceLevel: place.price_level || 1,
          distance: Math.round(distance * 10) / 10, // Round to 1 decimal
          types: place.types || [],
          specialties: generateSpecialties(place.types || []),
          description: generateDescription(place.name, place.types || []),
          placeId: place.place_id,
          photos: place.photos?.map((photo: any) => 
            `${GOOGLE_PLACES_BASE_URL}/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_PLACES_API_KEY}`
          ) || []
        };
      });

      // Sort by distance and rating
      const sortedRestaurants = restaurants
        .sort((a, b) => {
          if (a.distance !== b.distance) {
            return a.distance - b.distance;
          }
          return b.rating - a.rating;
        })
        .slice(0, 8); // Show top 8 closest restaurants

      setRestaurants(sortedRestaurants);
      console.log('Found restaurants from Google Places API:', sortedRestaurants.length);
      
    } catch (err) {
      console.error('Error searching restaurants:', err);
      
      // Fallback to mock data if API fails
      console.log('Falling back to mock data...');
      await searchMockRestaurants(location);
    } finally {
      setLoading(false);
    }
  };

  // Mock restaurant search as fallback
  const searchMockRestaurants = async (location: Location) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockRestaurants: Restaurant[] = [
      {
        id: '1',
        name: 'Quán Phở Hà Nội',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        rating: 4.5,
        priceLevel: 2,
        distance: 0.5,
        types: ['restaurant', 'vietnamese'],
        specialties: ['Phở bò', 'Phở gà', 'Bún chả'],
        description: 'Phở truyền thống Hà Nội với nước dùng đậm đà'
      },
      {
        id: '2',
        name: 'Bún Chả Sài Gòn',
        address: '456 Đường XYZ, Quận 3, TP.HCM',
        rating: 4.2,
        priceLevel: 1,
        distance: 1.2,
        types: ['restaurant', 'vietnamese'],
        specialties: ['Bún chả', 'Bún thịt nướng', 'Chả cá'],
        description: 'Bún chả ngon với thịt nướng thơm lừng'
      },
      {
        id: '3',
        name: 'Cơm Tấm Ngon',
        address: '789 Đường DEF, Quận 5, TP.HCM',
        rating: 4.7,
        priceLevel: 1,
        distance: 0.8,
        types: ['restaurant', 'vietnamese'],
        specialties: ['Cơm tấm sườn', 'Cơm tấm chả', 'Cơm tấm gà'],
        description: 'Cơm tấm Sài Gòn truyền thống với sườn nướng'
      },
      {
        id: '4',
        name: 'Nhà Hàng Hải Sản',
        address: '321 Đường GHI, Quận 7, TP.HCM',
        rating: 4.3,
        priceLevel: 3,
        distance: 2.1,
        types: ['restaurant', 'seafood'],
        specialties: ['Tôm hùm', 'Cua rang me', 'Cá lăng nướng'],
        description: 'Hải sản tươi ngon với nhiều món đặc biệt'
      },
      {
        id: '5',
        name: 'Quán Cơm Gà',
        address: '654 Đường JKL, Quận 10, TP.HCM',
        rating: 4.0,
        priceLevel: 1,
        distance: 1.5,
        types: ['restaurant', 'vietnamese'],
        specialties: ['Cơm gà', 'Gà nướng', 'Gà luộc'],
        description: 'Cơm gà Hội An với gà ta thơm ngon'
      },
      {
        id: '6',
        name: 'Pizza Hut',
        address: '987 Đường MNO, Quận 2, TP.HCM',
        rating: 3.8,
        priceLevel: 2,
        distance: 3.2,
        types: ['restaurant', 'pizza'],
        specialties: ['Pizza hải sản', 'Pizza bò', 'Pizza rau củ'],
        description: 'Pizza Ý với nhiều topping đa dạng'
      }
    ];

    setRestaurants(mockRestaurants);
    console.log('Using mock restaurants:', mockRestaurants.length);
  };

  // Generate specialties based on restaurant types
  const generateSpecialties = (types: string[]): string[] => {
    const specialtiesMap: { [key: string]: string[] } = {
      'vietnamese': ['Phở', 'Bún chả', 'Cơm tấm', 'Bún bò'],
      'seafood': ['Tôm hùm', 'Cua rang me', 'Cá lăng', 'Hải sản'],
      'pizza': ['Pizza hải sản', 'Pizza bò', 'Pizza rau củ'],
      'chinese': ['Dimsum', 'Mì xào', 'Cơm rang'],
      'japanese': ['Sushi', 'Ramen', 'Tempura'],
      'korean': ['Bibimbap', 'Kimchi', 'BBQ'],
      'thai': ['Pad Thai', 'Tom Yum', 'Green Curry'],
      'indian': ['Curry', 'Naan', 'Biryani']
    };

    const specialties: string[] = [];
    types.forEach(type => {
      if (specialtiesMap[type]) {
        specialties.push(...specialtiesMap[type]);
      }
    });

    return specialties.length > 0 ? specialties.slice(0, 3) : ['Món đặc biệt', 'Món ngon', 'Món truyền thống'];
  };

  // Generate description based on restaurant name and types
  const generateDescription = (name: string, types: string[]): string => {
    const descriptions: { [key: string]: string } = {
      'vietnamese': 'Ẩm thực Việt Nam truyền thống',
      'seafood': 'Hải sản tươi ngon',
      'pizza': 'Pizza Ý với nhiều topping đa dạng',
      'chinese': 'Ẩm thực Trung Hoa',
      'japanese': 'Ẩm thực Nhật Bản',
      'korean': 'Ẩm thực Hàn Quốc',
      'thai': 'Ẩm thực Thái Lan',
      'indian': 'Ẩm thực Ấn Độ'
    };

    for (const type of types) {
      if (descriptions[type]) {
        return descriptions[type];
      }
    }

    return `${name} - Nhà hàng với nhiều món ngon`;
  };

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
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
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    });
  };

  const openInGoogleMaps = (restaurant: Restaurant) => {
    if (restaurant.placeId) {
      // Use place_id for more accurate results
      const url = `https://www.google.com/maps/place/?q=place_id:${restaurant.placeId}`;
      window.open(url, '_blank');
    } else {
      // Fallback to search query
      const query = encodeURIComponent(`${restaurant.name} ${restaurant.address}`);
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, '_blank');
    }
  };

  const getFoodRecommendations = (restaurants: Restaurant[]) => {
    const recommendations = new Set<string>();
    
    restaurants.forEach(restaurant => {
      restaurant.specialties.forEach(specialty => {
        recommendations.add(specialty);
      });
    });

    return Array.from(recommendations).slice(0, 5);
  };

  return {
    restaurants,
    loading,
    error,
    searchNearbyRestaurants,
    getCurrentLocation,
    openInGoogleMaps,
    getFoodRecommendations
  };
}; 