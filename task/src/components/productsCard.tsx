import React from 'react';
import { Plus, Star } from 'lucide-react';

// Define Product interface directly in this file
interface Product {
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

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Product Image - FIXED CSS */}
      <div className="relative bg-white p-4 h-64">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1 font-medium">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating.count} reviews)
          </span>
        </div>
        
        {/* Category */}
        <div className="mb-2">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        
        {/* Description Preview */}
        <p className="text-gray-600 text-xs mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 text-sm"
            aria-label={`Add ${product.title} to cart`}
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;