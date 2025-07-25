// src/types.ts - Single file approach (RECOMMENDED)

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}