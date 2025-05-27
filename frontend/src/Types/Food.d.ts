export interface FoodItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    isAvailable: boolean;
    rating?: number; 
    ingredients?: string[]; 
}