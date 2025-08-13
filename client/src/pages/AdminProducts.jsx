import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Grid,
  List,
  Calendar,
  Package,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { RiseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProducts({ activeTab }) {
  const navigate=useNavigate();
  const { user } = useContext(UserContext);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [deleteReload,setdeleteReload]=useState(0);
  useEffect(() => {
    setloading(true);
    axios
      .post(
        "http://localhost:4000/api/admin/dashboard/get-products",
        { UserId: user._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          setproducts(res.data.products);
          setloading(false);
        } else {
          toast.error("Error occured while fetching products");
          setloading(false);
        }
      })
      .catch((err) => {
        toast.error("Error occured while fetching products");
        setloading(false);
        console.log(err.message);
      });
  }, [activeTab,deleteReload]);
  const handleDelete=(id)=>{
    setloading(true);
    axios.post('http://localhost:4000/api/admin/dashboard/delete-item',{
      id:id
    },{withCredentials:true})
    .then(res=>{
      if (res.data.success){
        setloading(false);
        setdeleteReload(deleteReload+1);
        toast.success('Your product deleted successfully');
      }
    })
    .catch(err=>{
      setloading(false);
      console.log(err.message);
      toast.error("Invalid request");
    })
  }
  const categories = [
    { id: "all", name: "All Products", count: products.length },
    {
      id: "electronics",
      name: "Electronics",
      count: products.filter((p) => p.type === "electronics").length,
    },
    {
      id: "men",
      name: "Men's Fashion",
      count: products.filter((p) => p.type === "men").length,
    },
    {
      id: "women",
      name: "Women's Fashion",
      count: products.filter((p) => p.type === "women").length,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        return b.sales - a.sales;
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

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>

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
            {product.type}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(product.createdAt)}
          </span>
        </div>

        <div className="flex gap-2">
          <Link to={`/admin/dashboard/edit-product/${product.
          _id}`} className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Link>
          <Link to={`/admin/dashboard/product-view/${product._id}`} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
          <button onClick={()=>{
            if 
              (confirm("Are you sure you want to delete this product?")){
                handleDelete(product._id);
              }
          }} className="p-2 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg mr-3"
          />
          <div>
            <div className="font-semibold text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-600 capitalize">
              {product.type}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            product.status
          )}`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-4 py-3 font-semibold">₹{product.price}</td>
      <td className="px-4 py-3 text-center">{product.sales}</td>
      <td className="px-4 py-3 text-center">{product.views}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatDate(product.createdAt)}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1">
          <button className="p-1 hover:bg-blue-100 rounded transition-colors">
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-1 hover:bg-blue-100 rounded transition-colors">
            <Edit className="w-4 h-4 text-blue-600" />
          </button>
          <button  className="p-1 hover:bg-red-100 rounded transition-colors">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <RiseLoader />
        </div>
      )}
      {!loading && (
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-light text-gray-900 mb-2">
                  My Products
                </h1>
                <div className="w-16 h-0.5 bg-black"></div>
              </div>
              <button onClick={()=>{        
                navigate('/admin/dashboard/add-product');
              }} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

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

              {/* View Mode Toggle */}
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Products Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Price
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-gray-900">
                      Sales
                    </th>
                    <th className="px-4 py-3 text-center font-medium text-gray-900">
                      Views
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedProducts.map((product) => (
                    <ProductRow key={product._id} product={product} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first product."}
              </p>
              <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
