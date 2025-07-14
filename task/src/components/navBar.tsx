import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';

interface HeaderProps {
  cartQuantity: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartQuantity, onCartClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ModernShop
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
              Categories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Search Bar - Hidden on mobile, shown on tablet+ */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon - Mobile Only */}
            <button className="lg:hidden p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100">
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:flex p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100 relative">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                2
              </span>
            </button>

            {/* User Account - Hidden on mobile */}
            <button className="hidden sm:flex p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100">
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition-all duration-200 rounded-lg hover:bg-gray-100 group"
              aria-label={`Shopping cart with ${cartQuantity} items`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartQuantity > 99 ? '99+' : cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-6 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              🏠 Home
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              🛍️ Products
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              📂 Categories
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              ❤️ Wishlist
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              👤 Account
            </a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-all duration-200">
              📞 Contact
            </a>
            
            {/* Mobile Action Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:from-indigo-700 hover:to-purple-700">
                Sign In
              </button>
              <button className="w-full border-2 border-indigo-600 text-indigo-600 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:bg-indigo-600 hover:text-white">
                Create Account
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;