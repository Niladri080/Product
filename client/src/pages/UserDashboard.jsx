import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
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
  const {user}=useContext(UserContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [sliderProducts,setsliderProducts]=useState([]);
  const [featuredProducts,setfeaturedProducts]=useState([]);
  const [loading,setloading]=useState(false);
  const [adding,setadding]=useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderProducts]);
  useEffect(()=>{
    setloading(true);
    axios.post('http://localhost:4000/api/dashboard/get-home',{},{
      withCredentials:true
    })
    .then(res=>{
      if (res.data.success){
        setsliderProducts(res.data.slider);
        setfeaturedProducts(res.data.home);
        setloading(false);
      }
      else{
        setloading(false);
        toast.error("Network Error. Please try again later.");
      }
    })
    .catch((err)=>{
      setloading(false);
      toast.error("Network Error. Please try again later");
    })
  },[activeSection])
  const handleAdd = (id) => {
    setadding(true);
    axios
      .post(
        "http://localhost:4000/api/dashboard/add-cart",
        { user_id: user._id, product_id: id, quantity: 1 },
        { withCredentials: true }
      )
      .then((res) => {
        // setActiveId(null);
        setadding(false);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.warning(res.data.message);
        }
      })
      .catch((err) => {
        setadding(false);
        console.log(err);
        // setActiveId(null);
        toast.error("Network error. Please try again later");
      });
  };
  const nextSlide = () => {
  if (sliderProducts.length === 0) return;
  setCurrentSlide((prev) => (prev + 1) % sliderProducts.length);
};

  const prevSlide = () => {
  if (sliderProducts.length === 0) return;
  setCurrentSlide((prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length);
};
  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "faq":
        return <FAQ setActiveSection={setActiveSection} />;
      case "men":
        return <Mensection activeSection={activeSection}/>;
      case "women":
        return <WomenSection activeSection={activeSection}/>;
      case "elec":
        return <Electronics activeSection={activeSection}/>;
      case "access":
        return <Accessories activeSection={activeSection}/>;
      case "cart":
        return <Addtocart activeSection={activeSection} setActiveSection={setActiveSection}/>
      default:
        return (
          <>
          {loading && <div className="flex items-center justify-center min-h-[300px]">
                      <RiseLoader />
                    </div>}
          {!loading && 
          <div>
            <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="max-w-6xl mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Welcome to Products
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Explore our latest products and exclusive deals just for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={()=>{
                    setActiveSection('men');
                  }} className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
                    Shop Now
                  </button>
                  <Link to='/user/dashboard/myorders' className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-200">
                    My Orders
                  </Link>
                </div>
              </div>
            </section>

            {/* Product Slider */}
            <section className="py-20 bg-white">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Featured Products
                  </h2>
                  <p className="text-xl text-gray-600">
                    Handpicked just for you
                  </p>
                </div>
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                      }}
                    >
                      {sliderProducts.map((product) => (
                        <div key={product.id} className="w-full flex-shrink-0">
                          <div className="relative h-96 md:h-[500px]">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                              <h3 className="text-3xl font-bold mb-2">
                                {product.name}
                              </h3>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold">
                                 ₹{product.price}
                                </span>
                                <button onClick={()=>{
                                  handleAdd(product._id);
                                }} className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
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
                          index === currentSlide ? "bg-blue-600" : "bg-gray-300"
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
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Shop by Category
                  </h2>
                  <p className="text-xl text-gray-600">
                    Explore our diverse range of quality products
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">
                             ₹{product.price}
                            </span>
                          </div>
                        </div>
                        <button onClick={()=>{
                          handleAdd(product._id);
                        }} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
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
                <h2 className="text-4xl font-bold text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Subscribe to our newsletter for exclusive deals and latest
                  product updates
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 border-1 border-white focus:border-transparent"
                  />
                  <button onClick={()=>{
                    toast.success("You are Subscribed successfully!");
                  }} className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </section>
            </div> }
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isUserDashboard={true}
      />
      <div className="pt-16">{renderContent()}</div>
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default UserDashboard;
