import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  Package,
  TrendingUp,
  DollarSign,
  Clock,
  Calendar,
  Grid,
  List,
  MoreVertical,
  User,
  MapPin,
  Phone,
  Mail,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function AdminOrder() {
  const [viewMode, setViewMode] = useState("list"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Sample orders data
  const orders = [
    {
      _id: "1",
      orderId: "ORD-2024-001",
      customer: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
      },
      products: [
        { name: "Premium Wireless Headphones", quantity: 1, price: 299 },
        { name: "Smart Fitness Watch", quantity: 1, price: 199 },
      ],
      totalAmount: 498,
      status: "processing",
      paymentStatus: "paid",
      createdAt: new Date("2024-02-01T10:30:00"),
      updatedAt: new Date("2024-02-01T14:20:00"),
      shippingMethod: "Standard Delivery",
      estimatedDelivery: new Date("2024-02-05"),
    },
    {
      _id: "2",
      orderId: "ORD-2024-002",
      customer: {
        name: "Michael Chen",
        email: "michael.chen@email.com",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Ave, Los Angeles, CA 90210",
      },
      products: [{ name: "Professional Laptop", quantity: 1, price: 1299 }],
      totalAmount: 1299,
      status: "shipped",
      paymentStatus: "paid",
      createdAt: new Date("2024-01-30T15:45:00"),
      updatedAt: new Date("2024-02-01T09:15:00"),
      shippingMethod: "Express Delivery",
      estimatedDelivery: new Date("2024-02-03"),
    },
    {
      _id: "3",
      orderId: "ORD-2024-003",
      customer: {
        name: "Emily Rodriguez",
        email: "emily.rodriguez@email.com",
        phone: "+1 (555) 456-7890",
        address: "789 Pine St, Chicago, IL 60601",
      },
      products: [
        { name: "Elegant Summer Dress", quantity: 2, price: 89 },
        { name: "Luxury Handbag", quantity: 1, price: 159 },
      ],
      totalAmount: 337,
      status: "delivered",
      paymentStatus: "paid",
      createdAt: new Date("2024-01-28T12:20:00"),
      updatedAt: new Date("2024-01-31T16:30:00"),
      shippingMethod: "Standard Delivery",
      estimatedDelivery: new Date("2024-02-01"),
    },
    {
      _id: "4",
      orderId: "ORD-2024-004",
      customer: {
        name: "David Wilson",
        email: "david.wilson@email.com",
        phone: "+1 (555) 321-0987",
        address: "321 Elm St, Houston, TX 77001",
      },
      products: [{ name: "Designer Cotton T-Shirt", quantity: 3, price: 49 }],
      totalAmount: 147,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date("2024-02-01T18:00:00"),
      updatedAt: new Date("2024-02-01T18:00:00"),
      shippingMethod: "Standard Delivery",
      estimatedDelivery: new Date("2024-02-06"),
    },
    {
      _id: "5",
      orderId: "ORD-2024-005",
      customer: {
        name: "Lisa Thompson",
        email: "lisa.thompson@email.com",
        phone: "+1 (555) 654-3210",
        address: "654 Maple Dr, Miami, FL 33101",
      },
      products: [
        { name: "Premium Wireless Headphones", quantity: 1, price: 299 },
        { name: "Designer Cotton T-Shirt", quantity: 2, price: 49 },
      ],
      totalAmount: 397,
      status: "cancelled",
      paymentStatus: "refunded",
      createdAt: new Date("2024-01-25T14:30:00"),
      updatedAt: new Date("2024-01-26T10:15:00"),
      shippingMethod: "Express Delivery",
      estimatedDelivery: null,
    },
  ];

  const statusOptions = [
    { id: "all", name: "All Orders", count: orders.length },
    {
      id: "pending",
      name: "Pending",
      count: orders.filter((o) => o.status === "pending").length,
    },
    {
      id: "processing",
      name: "Processing",
      count: orders.filter((o) => o.status === "processing").length,
    },
    {
      id: "shipped",
      name: "Shipped",
      count: orders.filter((o) => o.status === "shipped").length,
    },
    {
      id: "delivered",
      name: "Delivered",
      count: orders.filter((o) => o.status === "delivered").length,
    },
    {
      id: "cancelled",
      name: "Cancelled",
      count: orders.filter((o) => o.status === "cancelled").length,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

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

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return Clock;
      case "processing":
        return RefreshCw;
      case "shipped":
        return Truck;
      case "delivered":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      default:
        return AlertCircle;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const OrderCard = ({ order }) => {
    const StatusIcon = getStatusIcon(order.status);

    return (
      <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {order.orderId}
              </h3>
              <p className="text-sm text-gray-600">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="font-medium text-gray-900">
                {order.customer.name}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {order.customer.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {order.customer.address}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Products ({order.products.length})
            </h4>
            <div className="space-y-1">
              {order.products.map((product, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {product.quantity}x {product.name}
                  </span>
                  <span className="font-medium">
                    ₹{product.price * product.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold text-gray-900">
              ₹{order.totalAmount}
            </span>
            <div className="flex gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status
                )} flex items-center gap-1`}
              >
                <StatusIcon className="w-3 h-3" />
                {order.status}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                  order.paymentStatus
                )}`}
              >
                {order.paymentStatus}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const OrderRow = ({ order }) => {
    const StatusIcon = getStatusIcon(order.status);

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
          <div className="font-semibold text-gray-900">{order.orderId}</div>
          <div className="text-sm text-gray-600">
            {formatDate(order.createdAt)}
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="font-medium text-gray-900">{order.customer.name}</div>
          <div className="text-sm text-gray-600">{order.customer.email}</div>
        </td>
        <td className="px-4 py-3 text-center">{order.products.length}</td>
        <td className="px-4 py-3 font-semibold">₹{order.totalAmount}</td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              order.status
            )} flex items-center gap-1 w-fit`}
          >
            <StatusIcon className="w-3 h-3" />
            {order.status}
          </span>
        </td>
        <td className="px-4 py-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
              order.paymentStatus
            )}`}
          >
            {order.paymentStatus}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-1">
            <button className="p-1 hover:bg-blue-100 rounded transition-colors">
              <Eye className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Order Management
              </h1>
              <div className="w-16 h-0.5 bg-black"></div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-6 rounded-lg border border-gray-100 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
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

              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
              >
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name} ({status.count})
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
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
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

            {/* Bulk Actions */}
            {/* Removed Bulk Actions section */}
          </div>

          {/* Orders Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </div>
          ) : (
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
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Payment
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sortedOrders.map((order) => (
                    <OrderRow key={order._id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {sortedOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-600">
                {searchTerm || selectedStatus !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Orders will appear here once customers start placing them."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
