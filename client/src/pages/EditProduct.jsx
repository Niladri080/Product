import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductLoader from "../components/ProductLoader";
import { RiseLoader } from "react-spinners";
const EditProduct = () => {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const form = useRef(null);
  const [product, setproduct] = useState(null);
  useEffect(() => {
    console.log(id);
    if (!id) {
      toast.error("Invalid request");
      navigate("/admin/dashboard");
    }
    setloading(true);
    axios
      .post(
        "http://localhost:4000/api/admin/dashboard/single-product",
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        setloading(false);
        setproduct(res.data.product);
      })
      .catch((err) => {
        setloading(false);
        toast.error("Error occured while fetching details");
        navigate("/admin/dashboard");
      });
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const formData = new FormData(form.current);
      formData.append("id", id);
      axios
        .post(
          "http://localhost:4000/api/admin/dashboard/edit-product",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            setloading(false);
            toast.success("Your product updated successfully");
            navigate("/admin/dashboard");
          } else {
            setloading(false);
            toast.error("Product could not be edited. Try again later");
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
      {loading && (
        <div className="flex items-center justify-center min-h-[300px]">
          <RiseLoader />
        </div>
      )}
      {product && !loading && (
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Edit Product
            </h1>
            <div className="w-16 h-0.5 bg-black mx-auto"></div>
          </div>
          {/* Main Form Container */}
          <form
            className="max-w-2xl mx-auto"
            ref={form}
            onSubmit={handleSubmit}
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-8 space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Product Image
                  </label>
                  <div className="border border-gray-200 rounded-lg p-8 hover:border-gray-300 transition-colors relative">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Name */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    required
                    name="name"
                    defaultValue={product.name}
                    onChange={(e) =>
                      setproduct({ ...product, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-sm"
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
                    defaultValue={product.type}
                    onChange={(e) =>
                      setproduct({ ...product, type: e.target.value })
                    }
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
                      step="1"
                      placeholder="0"
                      name="price"
                      value={product.price ?? ""}
                      onChange={(e) =>
                        setproduct({ ...product, price: e.target.value })
                      }
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
                    defaultValue={product.description}
                    onChange={(e) =>
                      setproduct({ ...product, description: e.target.value })
                    }
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
                    {!loading && "Update Product"}
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
      )}
    </div>
  );
};
export default EditProduct;
