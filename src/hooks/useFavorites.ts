import { useEffect, useState } from 'react';
import { FavoriteFood } from '../types';

const FAVORITES_KEY = 'whattoeat_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteFood[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        // Convert string dates back to Date objects
        const favoritesWithDates = parsed.map((fav: any) => ({
          ...fav,
          addedAt: new Date(fav.addedAt)
        }));
        setFavorites(favoritesWithDates);
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (foodId: string) => {
    const newFavorite: FavoriteFood = {
      id: `${foodId}_${Date.now()}`,
      foodId,
      addedAt: new Date()
    };
    setFavorites(prev => [...prev, newFavorite]);
  };

  const removeFromFavorites = (foodId: string) => {
    setFavorites(prev => prev.filter(fav => fav.foodId !== foodId));
  };

  const isFavorite = (foodId: string) => {
    return favorites.some(fav => fav.foodId === foodId);
  };

  const toggleFavorite = (foodId: string) => {
    if (isFavorite(foodId)) {
      removeFromFavorites(foodId);
    } else {
      addToFavorites(foodId);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  };
}; 