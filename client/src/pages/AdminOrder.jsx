import React, { useContext, useEffect, useState } from "react";
import { Search, Eye, Package, User, MapPin, Mail } from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function AdminOrder({activeTab}) {
  const {user}=useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios.post('http://localhost:4000/api/admin/dashboard/get-orders', {id:user._id}
      , {
        withCredentials: true,
      }
    )
    .then(res=>{
      if (res.data.success) {
        setLoading(false);
        setOrders(res.data.orders);
      }
      else {
        setLoading(false);
        toast.error("Something unexpected happened.");
      }
    })
    .catch(err=>{
      console.log(err.message);
      setLoading(false);
      toast.error("Something unexpected happened.");
    })
  }, [activeTab]);
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch;
  });
  const calculateProfit=(order)=>{
    let totalAmount=0;
    order.products.forEach(product=>{
      totalAmount+=product.price*product.quantity;
    });
    return totalAmount;
  }
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "amount-high":
        return b.totalAmount - a.totalAmount;
      case "amount-low":
        return a.totalAmount - b.totalAmount;
      default:
        return 0;
    }
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const OrderRow = ({ order }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="font-semibold text-gray-900">{`ORD-${new Date().getFullYear()}-${order._id[order._id.length-3]}${order._id[order._id.length-2]}${order._id[order._id.length-1]}`}</div>
        <div className="text-sm text-gray-600">{formatDate(order.createdAt)}</div>
      </td>
      <td className="px-4 py-3">
        <div className="font-medium text-gray-900">{order.address.name}</div>
        <div className="text-sm text-gray-600">{order.address.phone}</div>
      </td>
      <td className="px-4 py-3 text-center">{order.products.length}</td>
      <td className="px-4 py-3 font-semibold">₹{calculateProfit(order)}</td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && <div className="flex justify-center items-center h-screen"><RiseLoader/></div>}
      {
        !loading &&
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Order Management
          </h1>
          <div className="w-16 h-0.5 bg-black"></div>
        </div>

        {/* Search & Sort */}
        <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  Customer
                </th>
                <th className="px-4 py-3 text-center font-medium text-gray-900">
                  Items
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedOrders.map((order,index) => (
                <OrderRow key={order._id} order={order} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search query."
                : "Orders will appear here once customers start placing them."}
            </p>
          </div>
        )}
      </div>
}
    </div>
  );
}
