export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  description?: string;
  emoji: string;
}

export type FoodCategory = 
  | 'any'
  | 'snack'
  | 'healthy'
  | 'dessert'
  | 'main'
  | 'random';

export interface CategoryInfo {
  id: FoodCategory;
  name: string;
  emoji: string;
  description: string;
} 