import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Star,
  Calendar,
  User,
  Package,
  Tag,
} from "lucide-react";
import axios from "axios";
import { RiseLoader } from "react-spinners";

import { toast } from "react-toastify";

const AdminProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .post("http://localhost:4000/api/admin/dashboard/single-product",{id}, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          setProduct(res.data.product);
        } else {
          setLoading(false);
          toast.error("Something unexpected happened.");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        toast.error("Something unexpected happened.");
      });
  }, [id]);
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RiseLoader />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4 text-sm text-gray-600">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>
              <span>/</span>
              <span className="capitalize">{product.type}</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">{product.name}</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                    {product.type}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Uploaded by</p>
                      <p className="font-medium text-gray-900">
                        {product.admin_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Listed on</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(product.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Tag className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {product.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium text-green-600 capitalize">
                        Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleShare}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Free Shipping
                    </h4>
                    <p className="text-sm text-blue-700">
                      Free standard shipping on orders over $50. Estimated
                      delivery 3-5 business days.
                    </p>
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
export default  AdminProductView;
