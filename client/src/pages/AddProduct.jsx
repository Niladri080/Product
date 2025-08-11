import React, { useContext, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import ProductLoader from "../components/ProductLoader";
import { RiseLoader } from "react-spinners";
const AddProduct = ({ refresh, setrefresh }) => {
  const [loading, setloading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const form = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formData = new FormData(form.current);
      formData.append("admin_id", user._id);
      formData.append("admin_name", user.name);
      console.log("Form data: " + formData);
      axios
        .post(
          "http://localhost:4000/api/admin/dashboard/add-product",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log("Got the response", res);
          if (res.data.success) {
            setloading(false);
            toast.success("Your product listed successfully");
            setrefresh(refresh + 1);
            console.log(refresh);
            navigate("/admin/dashboard");
          } else {
            setloading(false);
            toast.error("Product could not be listed. Try again later");
          }
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
          toast.error("Error occured.Try again later");
        });
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Error! Please try again later");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Add Product
          </h1>
          <div className="w-16 h-0.5 bg-black mx-auto"></div>
        </div>
        {/* Main Form Container */}
        <form className="max-w-2xl mx-auto" ref={form} onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="p-8 space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Product Image
                </label>
                <div className="border border-gray-200 rounded-lg p-8 hover:border-gray-300 transition-colors relative">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-white text-gray-600 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">Upload image</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                    style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                  />
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Product Name
                </label>
                <input
                  type="number"
                  step="1"
                  placeholder="0"
                  name="price"
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                  required
                />
              </div>

              {/* Product Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                  name="type"
                  required
                >
                  <option value="">Select category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="electronics">Electronics</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              {/* Price */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    name="price"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter product description..."
                  name="description"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all resize-none text-sm"
                  required
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  {!loading && "Add Product"}
                  {loading && <ProductLoader />}
                </button>
                <Link
                  to="/admin/dashboard"
                  type="button"
                  className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProduct;
