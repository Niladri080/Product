import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart} from 'lucide-react';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import FAQ from './FAQ';

const Dummydashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  const sliderProducts = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$299",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      description: "Experience crystal-clear audio with our premium wireless headphones"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      description: "Track your health and fitness goals with advanced smart features"
    },
    {
      id: 3,
      name: "Professional Camera",
      price: "$899",
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
      description: "Capture stunning photos with professional-grade camera technology"
    }
  ];

  const featuredProducts = [
    {
      id: 4,
      name: "Laptop Pro",
      price: "$1299",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop",
      originalPrice: "$1499"
    },
    {
      id: 5,
      name: "Smartphone X",
      price: "$799",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      originalPrice: "$899"
    },
    {
      id: 6,
      name: "Gaming Console",
      price: "$499",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
      originalPrice: "$599"
    },
    {
      id: 7,
      name: "Wireless Speaker",
      price: "$149",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
      originalPrice: "$199"
    },
    {
      id: 8,
      name: "Tablet Plus",
      price: "$399",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      originalPrice: "$449"
    },
    {
      id: 9,
      name: "Smart Home Hub",
      price: "$129",
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=300&fit=crop",
      originalPrice: "$159"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
       return (<AboutPage/>)
      case 'contact':
       return (<ContactPage/>)
      case 'faq':
        return (<FAQ setActiveSection={setActiveSection}/>)
      default:
        return (
          <>
                      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
              </div>
              
              <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Discover Amazing Products
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100">
                  Your one-stop destination for premium quality products at unbeatable prices
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
                    Shop Now
                  </button>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transform hover:scale-105 transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </section>

            {/* Product Slider */}
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                  <p className="text-xl text-gray-600">Discover our handpicked selection of premium products</p>
                </div>
                
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {sliderProducts.map((product, index) => (
                        <div key={product.id} className="w-full flex-shrink-0">
                          <div className="relative h-96 md:h-[500px]">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                              <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                              <p className="text-lg mb-4 opacity-90">{product.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">{product.price}</span>
                                <button className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
                                  Add to Cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                  </button>
                  
                  <div className="flex justify-center mt-6 space-x-2">
                    {sliderProducts.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Products Grid */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                  <p className="text-xl text-gray-600">Explore our diverse range of quality products</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      <div className="relative">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                          Sale
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          {renderStars(product.rating)}
                          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                            <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                          </div>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-blue-600">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
                <p className="text-xl text-blue-100 mb-8">Subscribe to our newsletter for exclusive deals and latest product updates</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-1 border-white focus:border-transparent" 
                  />
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection}/>
      <div className="pt-16">
        {renderContent()}
      </div>
      <Footer setActiveSection={setActiveSection}/>
    </div>
  );
};

export default Dummydashboard;