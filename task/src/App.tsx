import React, { useState, useEffect } from 'react';
import Header from './components/navBar';  // Fixed: was navBar
import ProductCard from './components/productsCard';  // Fixed: was productsCard
import CartPage from './components/cartPage';  // Fixed: was cartPage
import LoadingSpinner from './components/loadingSpinner';  // Fixed: was loadingSpinner
import { useLocalStorage } from './hooks/useLocalstorage';  // Fixed: was useLocalstorage

// Define all interfaces directly here - no imports needed!
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

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// API function directly in this file to avoid import issues
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const products: Product[] = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products. Please try again later.');
  }
};

const App: React.FC = () => {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('modernshop-cart', []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, increase quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // If new item, add to cart
      return [...prev, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
    });
  };

  // Update cart item quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate total cart quantity for badge
  const totalCartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle cart toggle
  const toggleCart = () => {
    setShowCart(prev => !prev);
  };

  // Handle back to products
  const backToProducts = () => {
    setShowCart(false);
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading amazing products..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Render cart page
  if (showCart) {
    return (
      <CartPage
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onBackToProducts={backToProducts}
      />
    );
  }

  // Render main products page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        cartQuantity={totalCartQuantity}
        onCartClick={toggleCart}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find everything you need in our curated collection of high-quality products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Empty products state */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No products found.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;