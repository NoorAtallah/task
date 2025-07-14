import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Shield, Truck } from 'lucide-react';

// Define CartItem interface directly in this file - no imports needed!
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onBackToProducts: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBackToProducts
}) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8 w-32 h-32 mx-auto mb-8 flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-indigo-500" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
            Looks like you haven't added any products to your cart yet. 
            Start shopping to fill it up!
          </p>
          <button
            onClick={onBackToProducts}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onBackToProducts}
                className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
                Shopping Cart
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              <span className="font-medium">{totalQuantity} items</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Desktop Layout: Two Columns */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-8 mb-8 lg:mb-0">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Cart Items ({totalQuantity} items)
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    {/* Mobile Layout: Stacked */}
                    <div className="flex flex-col sm:hidden gap-4">
                      {/* Mobile: Image and Remove Button Row */}
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 bg-gray-50 rounded-lg p-2">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-16 h-16 object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-lg font-bold text-indigo-600 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Mobile: Quantity and Subtotal Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Subtotal</p>
                          <p className="font-bold text-lg text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout: Single Row */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0 bg-gray-50 rounded-lg p-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 mb-2 text-base lg:text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xl lg:text-2xl font-bold text-indigo-600">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          In Stock • Free Shipping
                        </p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-lg">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="text-right min-w-[100px]">
                        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                        <p className="font-bold text-xl text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary - Right Column */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-white">Order Summary</h2>
              </div>
              
              <div className="p-4 sm:p-6 space-y-6">
                {/* Summary Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Items ({totalQuantity}):</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-semibold">${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg sm:text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl sm:text-3xl font-bold text-indigo-600">
                        ${(totalPrice * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                  
                  <button 
                    onClick={onBackToProducts}
                    className="w-full border-2 border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  >
                    Continue Shopping
                  </button>
                </div>
                
                {/* Trust Badges */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-blue-500" />
                      <span>All major credit cards accepted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-indigo-500" />
                      <span>Free returns within 30 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;