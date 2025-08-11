import React, { useContext, useEffect, useState } from "react";
import { Search, Package, ShoppingCart } from "lucide-react";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { RiseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Mensection = ({ activeSection }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeId,setActiveId]=useState(null);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/api/dashboard/men", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setProducts(res.data.products);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        navigate("/user/dashboard");
      });
  }, [activeSection]);
  const handleAdd = (id) => {
  axios
    .post(
      "http://localhost:4000/api/dashboard/add-cart",
      { user_id: user._id, product_id: id, quantity: 1 },
      { withCredentials: true }
    )
    .then((res) => {
      setActiveId(null);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.warning(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
      setActiveId(null);
      toast.error("Network error. Please try again later");
    });
};

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "sales":
        return (b.sales || 0) - (a.sales || 0);
      default:
        return 0;
    }
  });

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <Link to={`/user/dashboard/product_view/${product._id}`} className="relative cursor-pointer">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-500 capitalize">
            By {product.admin_name}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 flex items-center">
            {formatDate(product.createdAt)}
          </span>
        </div>
      <button className={`w-full text-white py-2 px-4 rounded-lg 
      ${ product._id===activeId ? 'bg-blue-400':'bg-blue-600 hover:bg-blue-700' } 
      transition-colors duration-200 flex items-center justify-center space-x-2`} onClick={()=>{
        if (activeId===null){
          setActiveId(product._id);
          handleAdd(product._id)
        }
      }
        }>
        <ShoppingCart className="w-4 h-4" />
        {product._id===activeId ?<span>Adding...</span>: <span>Add to Cart</span>}
      </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Men's Fashion
          </h1>
          <div className="w-16 h-0.5 bg-black"></div>
        </div>
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6 flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search men's products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            />
          </div>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="sales">Most Sales</option>
          </select>
        </div>
        {/* Loader */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <RiseLoader />
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No men's products found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Check back later for new arrivals!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mensection;
