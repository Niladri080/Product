import React, { useState, useEffect, useContext } from "react";
import {
  Search,
  ShoppingBag,
  Package,
  Calendar,
  Eye,
  MapPin,
  RefreshCw,
  SendToBack,
} from "lucide-react";
import { RiseLoader } from "react-spinners";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router";
import axios from "axios";

const UserOrders = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      axios
        .post(
          "http://localhost:4000/api/dashboard/get-orders",
          { userId: user._id },
          { withCredentials: true }
        )
        .then((response) => {
          setTimeout(() => {
            setOrders(response.data.orders || []);
            setLoading(false);
          }, 1000);
        });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.products.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      `ORD-2025-00${orders.indexOf(order)}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RiseLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header with Buttons & Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
            My Orders
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-gray-50">
              <Search className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search orders..."
                className="bg-transparent outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/user/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded-xl hover:bg-gray-700 flex items-center gap-2"
              >
                <SendToBack className="h-4 w-4" />
                Back to Home
              </button>
              <button
                onClick={fetchOrders}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">
              No Orders Found
            </h3>
            <p className="text-gray-600">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => {
              const isExpanded = expandedOrder === order._id;
              return (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-100 p-3 rounded-xl">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {`ORD-${new Date().getFullYear()}-${order._id[order._id.length-3]}${order._id[order._id.length-2]}${order._id[order._id.length-1]}`}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Placed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                          <span>{order.products.length} item(s)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{order.totalAmount}
                      </p>
                      <button
                        onClick={() => toggleOrderExpansion(order._id)}
                        className="bg-gray-100 hover:bg-gray-200 p-2 rounded-xl"
                      >
                        <Eye className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {isExpanded && (
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Products */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-600" />
                            Order Items
                          </h4>
                          <div className="space-y-4">
                            {order.products.map((product, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-4 bg-white p-4 rounded-xl"
                              >
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">
                                    {product.name}
                                  </h5>
                                  <p className="text-gray-600">
                                    Qty: {product.quantity}
                                  </p>
                                </div>
                                <p className="text-lg font-semibold text-gray-900">
                                  ₹{product.price}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Info */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-blue-600" />
                            Delivery Information
                          </h4>
                          <div className="bg-white p-4 rounded-xl">
                            <p className="text-sm text-gray-600">
                              Delivery Address
                            </p>
                            <p className="font-medium text-gray-900">
                              {order.address.line1}
                            </p>
                            <p className="text-gray-700">
                              {order.address.city}, {order.address.state} -{" "}
                              {order.address.pin}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
