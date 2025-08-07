import { motion } from 'framer-motion';
import { DollarSign, MapPin, Navigation, Star } from 'lucide-react';
import { useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

export const NearbyRestaurants = () => {
  const { restaurants, loading, error, searchNearbyRestaurants, openInGoogleMaps } = useGoogleMaps();
  const [showRestaurants, setShowRestaurants] = useState(false);

  const handleFindRestaurants = async () => {
    try {
      const location = await navigator.geolocation.getCurrentPosition(
        (position) => {
          searchNearbyRestaurants(
            { lat: position.coords.latitude, lng: position.coords.longitude },
            'restaurant'
          );
          setShowRestaurants(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback: search without location
          searchNearbyRestaurants({ lat: 10.8231, lng: 106.6297 }, 'restaurant');
          setShowRestaurants(true);
        }
      );
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const getPriceLevel = (level: number) => {
    return '$'.repeat(level);
  };

  const getStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2 text-red-500" />
        Tìm quán ăn gần đây
      </h3>

      {!showRestaurants && (
        <button
          onClick={handleFindRestaurants}
          className="btn-primary w-full"
        >
          🍽️ Tìm quán ăn gần đây
        </button>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Đang tìm quán ăn...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          {error}
        </div>
      )}

      {restaurants.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800 dark:text-white">
            Quán ăn gần đây ({restaurants.length})
          </h4>
          
          {restaurants.map((restaurant) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-gray-800 dark:text-white">
                  {restaurant.name}
                </h5>
                <button
                  onClick={() => openInGoogleMaps(restaurant)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {restaurant.address}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-gray-800 dark:text-white">
                      {restaurant.rating} ({getStars(restaurant.rating)})
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-gray-800 dark:text-white">
                      {getPriceLevel(restaurant.priceLevel)}
                    </span>
                  </div>
                </div>
                
                <span className="text-gray-600 dark:text-gray-400">
                  {restaurant.distance}km
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {showRestaurants && restaurants.length === 0 && !loading && (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400">
            Không tìm thấy quán ăn phù hợp gần đây.
          </p>
        </div>
      )}
    </motion.div>
  );
}; 