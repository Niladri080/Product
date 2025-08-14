import { useState } from "react";
import { Menu, X, LogOut, ShoppingCart, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({
  activeSection,
  setActiveSection,
  isUserDashboard = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  if (isUserDashboard) {
    return (
      <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">ShopFusion</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center justify-between w-full ml-8">
              {/* Left - Categories */}
              <div className="flex items-center space-x-8">
                <button
                  onClick={() => setActiveSection("home")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "home"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => setActiveSection("men")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "men"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Men
                </button>
                <button
                  onClick={() => setActiveSection("women")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "women"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Women
                </button>
                <button
                  onClick={() => setActiveSection("elec")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "elec"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Electronics
                </button>
                <button
                  onClick={() => setActiveSection("access")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "access"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  Accessories
                </button>
              </div>

              {/* Right - Cart + Logout */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={()=>{
                    navigate('/user/dashboard/settings');
                  }
                }
                  className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4"/>
                </button>
                <button
                  onClick={() => setActiveSection("cart")}
                  className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                    activeSection === "cart"
                      ? "text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-2">
              <button
                onClick={() => {
                  setActiveSection("home");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Home
              </button>
              <button
                onClick={() => {
                  setActiveSection("men");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Men
              </button>
              <button
                onClick={() => {
                  setActiveSection("women");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Women
              </button>
              <button
                onClick={() => {
                  setActiveSection("elec");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Electronics
              </button>
              <button
                onClick={() => {
                  setActiveSection("access");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Accessories
              </button>

              {/* Cart Button */}
              <button
                onClick={() => {
                  setActiveSection("cart");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md flex items-center space-x-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
              </button>

              <button
                onClick={()=>{
                    navigate('/user/dashboard/settings');
                  }
                }
                className="w-full text-white py-2 rounded-lg flex items-center justify-center space-x-2"
              >
                
                <Settings className="w-4 h-4"/>
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }

  // Non-dashboard navbar remains unchanged
  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">ShopFusion</div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveSection("home")}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                activeSection === "home" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveSection("about")}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                activeSection === "about" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveSection("contact")}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                activeSection === "contact"
                  ? "text-blue-600 font-semibold"
                  : ""
              }`}
            >
              Contact Us
            </button>
            <button
              onClick={() => setActiveSection("faq")}
              className={`text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                activeSection === "faq" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              FAQs
            </button>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-lg text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-2">
            <button
              onClick={() => {
                setActiveSection("home");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveSection("about");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              About
            </button>
            <button
              onClick={() => {
                setActiveSection("contact");
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Contact Us
            </button>
            <div className="flex space-x-2 px-3 py-2">
              <Link
                to="/login"
                className="flex-1 text-gray-700 hover:text-blue-600 py-2 text-center rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
