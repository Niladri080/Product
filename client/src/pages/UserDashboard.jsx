import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import FAQ from "./FAQ";
import Mensection from "./Mensection";
import WomenSection from "./WomenSection";
import Electronics from "./Electronics";
import Accessories from "./Accessories";
import Addtocart from "./Addtocart";
import axios from "axios";
import { toast } from "react-toastify";
import { RiseLoader } from "react-spinners";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useContext(UserContext);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [sliderProducts, setSliderProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);

  // Fetch home data only when needed
  useEffect(() => {
    if (activeSection === "home") {
      setLoading(true);
      axios
        .post("http://localhost:4000/api/dashboard/get-home", {}, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            setSliderProducts(res.data.slider || []);
            setFeaturedProducts(res.data.home || []);
          } else {
            toast.error("Network Error. Please try again later.");
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error("Network Error. Please try again later");
        });
    }
  }, [activeSection]);

  // Auto-slide only when we have items
  useEffect(() => {
    if (sliderProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [sliderProducts.length]);

  // Handlers
  const handleAdd = useCallback((id) => {
    setAdding(true);
    axios
      .post(
        "http://localhost:4000/api/dashboard/add-cart",
        { user_id: user._id, product_id: id, quantity: 1 },
        { withCredentials: true }
      )
      .then((res) => {
        setAdding(false);
        res.data.success ? toast.success(res.data.message) : toast.warning(res.data.message);
      })
      .catch(() => {
        setAdding(false);
        toast.error("Network error. Please try again later");
      });
  }, [user?._id]);

  const nextSlide = useCallback(() => {
    if (sliderProducts.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }
  }, [sliderProducts.length]);

  const prevSlide = useCallback(() => {
    if (sliderProducts.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length);
    }
  }, [sliderProducts.length]);

  // Memoized Home content to avoid re-rendering
  const HomeContent = useMemo(() => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <RiseLoader />
        </div>
      );
    }

    return (
      <div>
        {/* Hero */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Welcome to ShopFusion</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our latest products and exclusive deals just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveSection("men")}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Shop Now
              </button>
              <Link
                to="/user/dashboard/myorders"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200"
              >
                My Orders
              </Link>
            </div>
          </div>
        </section>

        {/* Slider */}
        {sliderProducts.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
                <p className="text-xl text-gray-600">Handpicked just for you</p>
              </div>
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {sliderProducts.map((product) => (
                      <div key={product._id} className="w-full flex-shrink-0">
                        <div className="relative h-96 md:h-[500px]">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold">₹{product.price}</span>
                              <button
                                onClick={() => handleAdd(product._id)}
                                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg">
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg">
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Product Grid */}
        {featuredProducts.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
                <p className="text-xl text-gray-600">Explore our diverse range of quality products</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex flex-col"
                  >
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-48 object-cover" />
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                      <span className="text-2xl font-bold text-gray-900 mb-4">₹{product.price}</span>
                      <button
                        onClick={() => handleAdd(product._id)}
                        className="mt-auto w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }, [loading, sliderProducts, featuredProducts, currentSlide, nextSlide, prevSlide, handleAdd]);

  const renderContent = () => {
    switch (activeSection) {
      case "about": return <AboutPage />;
      case "contact": return <ContactPage />;
      case "faq": return <FAQ setActiveSection={setActiveSection} />;
      case "men": return <Mensection activeSection={activeSection} />;
      case "women": return <WomenSection activeSection={activeSection} />;
      case "elec": return <Electronics activeSection={activeSection} />;
      case "access": return <Accessories activeSection={activeSection} />;
      case "cart": return <Addtocart activeSection={activeSection} setActiveSection={setActiveSection} />;
      default: return HomeContent;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} isUserDashboard />
      <div className="pt-16">{renderContent()}</div>
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default UserDashboard;
