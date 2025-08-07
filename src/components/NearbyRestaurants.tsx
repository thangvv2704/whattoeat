import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, DollarSign, MapPin, Navigation, Star, Utensils, X } from 'lucide-react';
import { useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

interface NearbyRestaurantsProps {
  onClose: () => void;
  onFoodSelect?: (foodName: string) => void;
  onChooseFood?: () => void;
}

export const NearbyRestaurants = ({ onClose, onFoodSelect, onChooseFood }: NearbyRestaurantsProps) => {
  const { restaurants, loading, error, searchNearbyRestaurants, openInGoogleMaps, getFoodRecommendations } = useGoogleMaps();
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const handleFindRestaurants = async () => {
    console.log('Finding restaurants...');
    setShowRestaurants(true);
    setShowAllRestaurants(false); // Reset when searching again
    
    try {
      const location = await navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location success:', position.coords);
          searchNearbyRestaurants(
            { lat: position.coords.latitude, lng: position.coords.longitude },
            'restaurant'
          );
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Fallback: search without location
          searchNearbyRestaurants({ lat: 10.8231, lng: 106.6297 }, 'restaurant');
        }
      );
    } catch (err) {
      console.error('Error:', err);
      // Fallback: search without location
      searchNearbyRestaurants({ lat: 10.8231, lng: 106.6297 }, 'restaurant');
    }
  };

  const getPriceLevel = (level: number) => {
    return '$'.repeat(level);
  };

  const getStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  const foodRecommendations = getFoodRecommendations(restaurants);
  
  // Show only first 3 restaurants initially
  const displayedRestaurants = showAllRestaurants ? restaurants : restaurants.slice(0, 3);
  const hasMoreRestaurants = restaurants.length > 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mb-4"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-red-500" />
          Tìm quán ăn gần đây
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {!showRestaurants && (
        <div className="text-center">
          <button
            onClick={handleFindRestaurants}
            className="btn-primary w-full mb-4"
          >
            🍽️ Tìm quán ăn gần đây
          </button>
          <p className="text-sm text-gray-600">
            Cho phép truy cập vị trí để tìm quán ăn chính xác
          </p>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="text-gray-600 mt-2">Đang tìm quán ăn...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-4">
          <p className="mb-2">{error}</p>
          <button
            onClick={handleFindRestaurants}
            className="text-sm underline hover:no-underline"
          >
            Thử lại
          </button>
        </div>
      )}

      {restaurants.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-800 text-sm">
              Quán ăn gần đây ({restaurants.length})
            </h4>
            <button
              onClick={handleFindRestaurants}
              className="text-xs text-blue-500 hover:text-blue-600 underline"
            >
              🔄 Tìm lại
            </button>
          </div>

          {/* Choose Food Button - Fixed at top */}
          {onChooseFood && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
              <button
                onClick={onChooseFood}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm"
              >
                🍜 Chọn món ăn ngay
              </button>
              <p className="text-xs text-gray-500 text-center mt-1">
                Hoặc chọn từ danh sách món ăn bên dưới
              </p>
            </div>
          )}

          {/* Food Recommendations - Fixed at top */}
          {foodRecommendations.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <h5 className="font-medium text-gray-800 mb-2 flex items-center text-sm">
                <Utensils className="w-3 h-3 mr-1 text-orange-500" />
                Gợi ý món ăn gần đây:
              </h5>
              <div className="flex flex-wrap gap-1">
                {foodRecommendations.map((food, index) => (
                  <button
                    key={index}
                    onClick={() => onFoodSelect?.(food)}
                    className="px-2 py-1 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full text-xs transition-colors"
                  >
                    {food}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant List - Scrollable */}
          <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-2 bg-gray-50">
            <div className="space-y-2">
              {displayedRestaurants.map((restaurant) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-semibold text-gray-800 text-xs">
                      {restaurant.name}
                    </h5>
                    <button
                      onClick={() => openInGoogleMaps(restaurant)}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="Mở trong Google Maps"
                    >
                      <Navigation className="w-3 h-3" />
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-1">
                    {restaurant.address}
                  </p>

                  {restaurant.specialties.length > 0 && (
                    <div className="mb-1">
                      <div className="flex flex-wrap gap-1">
                        {restaurant.specialties.slice(0, 2).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-1 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-gray-800">
                          {restaurant.rating}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-gray-800">
                          {getPriceLevel(restaurant.priceLevel)}
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-gray-600">
                      {restaurant.distance}km
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Show More/Less Button */}
          {hasMoreRestaurants && (
            <div className="text-center pt-1">
              <button
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                className="flex items-center justify-center w-full py-1 text-xs text-blue-500 hover:text-blue-600 transition-colors"
              >
                {showAllRestaurants ? (
                  <>
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Thu gọn
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 mr-1" />
                    Xem thêm {restaurants.length - 3} quán
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {showRestaurants && restaurants.length === 0 && !loading && !error && (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-2">
            Không tìm thấy quán ăn phù hợp gần đây.
          </p>
          <button
            onClick={handleFindRestaurants}
            className="text-sm text-blue-500 hover:text-blue-600 underline"
          >
            Thử lại
          </button>
        </div>
      )}
    </motion.div>
  );
}; 