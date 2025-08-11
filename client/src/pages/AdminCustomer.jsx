import React, { useState } from "react";
import {
  Search,
  Grid,
  List,
  MoreVertical,
  Mail,
  Download,
  RefreshCw,
  Phone,
  MapPin,
  Users,
} from "lucide-react";

export default function AdminCustomer() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCustomers, setSelectedCustomers] = useState(new Set());

  // Sample customers data
  const customers = [
    {
      _id: "1",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinedDate: new Date("2023-06-15"),
      lastOrder: new Date("2024-01-28"),
      totalOrders: 8,
      totalSpent: 2340,
      status: "active",
      segment: "vip",
      averageOrderValue: 292.5,
      loyaltyPoints: 2340,
      favoriteCategory: "Electronics",
    },
    {
      _id: "2",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Oak Ave, Los Angeles, CA 90210",
      joinedDate: new Date("2023-08-22"),
      lastOrder: new Date("2024-01-30"),
      totalOrders: 5,
      totalSpent: 1850,
      status: "active",
      segment: "regular",
      averageOrderValue: 370,
      loyaltyPoints: 1850,
      favoriteCategory: "Electronics",
    },
    {
      _id: "3",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 456-7890",
      address: "789 Pine St, Chicago, IL 60601",
      joinedDate: new Date("2023-04-10"),
      lastOrder: new Date("2024-01-25"),
      totalOrders: 12,
      totalSpent: 3420,
      status: "active",
      segment: "vip",
      averageOrderValue: 285,
      loyaltyPoints: 3420,
      favoriteCategory: "Fashion",
    },
    {
      _id: "4",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 321-0987",
      address: "321 Elm St, Houston, TX 77001",
      joinedDate: new Date("2023-11-05"),
      lastOrder: new Date("2023-12-20"),
      totalOrders: 2,
      totalSpent: 280,
      status: "inactive",
      segment: "new",
      averageOrderValue: 140,
      loyaltyPoints: 280,
      favoriteCategory: "Fashion",
    },
    {
      _id: "5",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 654-3210",
      address: "654 Maple Dr, Miami, FL 33101",
      joinedDate: new Date("2023-09-18"),
      lastOrder: new Date("2024-02-01"),
      totalOrders: 6,
      totalSpent: 1680,
      status: "active",
      segment: "regular",
      averageOrderValue: 280,
      loyaltyPoints: 1680,
      favoriteCategory: "Electronics",
    },
    {
      _id: "6",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      name: "James Anderson",
      email: "james.anderson@email.com",
      phone: "+1 (555) 789-0123",
      address: "987 Cedar Ln, Seattle, WA 98101",
      joinedDate: new Date("2024-01-10"),
      lastOrder: new Date("2024-01-15"),
      totalOrders: 1,
      totalSpent: 150,
      status: "active",
      segment: "new",
      averageOrderValue: 150,
      loyaltyPoints: 150,
      favoriteCategory: "Fashion",
    },
  ];

  const segments = [
    { id: "all", name: "All Customers", count: customers.length },
    {
      id: "vip",
      name: "VIP Customers",
      count: customers.filter((c) => c.segment === "vip").length,
    },
    {
      id: "regular",
      name: "Regular Customers",
      count: customers.filter((c) => c.segment === "regular").length,
    },
    {
      id: "new",
      name: "New Customers",
      count: customers.filter((c) => c.segment === "new").length,
    },
    {
      id: "inactive",
      name: "Inactive",
      count: customers.filter((c) => c.status === "inactive").length,
    },
  ];
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);
    const matchesSegment =
      selectedSegment === "all" ||
      customer.segment === selectedSegment ||
      (selectedSegment === "inactive" && customer.status === "inactive");
    return matchesSearch && matchesSegment;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.joinedDate) - new Date(a.joinedDate);
      case "oldest":
        return new Date(a.joinedDate) - new Date(b.joinedDate);
      case "spending-high":
        return b.totalSpent - a.totalSpent;
      case "spending-low":
        return a.totalSpent - b.totalSpent;
      case "orders":
        return b.totalOrders - a.totalOrders;
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const CustomerCard = ({ customer }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-600">{customer.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              {customer.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              {customer.address}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CustomerRow = ({ customer }) => {
    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">{customer.name}</div>
              <div className="text-sm text-gray-600">{customer.email}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm text-gray-600">{customer.phone}</td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Send Email"
            >
              <Mail className="w-4 h-4 text-gray-600" />
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
                Customer Management
              </h1>
              <div className="w-16 h-0.5 bg-black"></div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
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
                placeholder="Search customers by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
              />
            </div>

            {/* Segment Filter */}
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            >
              {segments.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name} ({segment.count})
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
              <option value="spending-high">Highest Spending</option>
              <option value="spending-low">Lowest Spending</option>
              <option value="orders">Most Orders</option>
              <option value="alphabetical">Alphabetical</option>
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
          {selectedCustomers.size > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedCustomers.size} customer
                  {selectedCustomers.size !== 1 ? "s" : ""} selected
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Customers Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCustomers.map((customer) => (
              <CustomerCard key={customer._id} customer={customer} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-100 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedCustomers.map((customer) => (
                  <CustomerRow key={customer._id} customer={customer} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {sortedCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No customers found
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedSegment !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Customer data will appear here as orders are placed."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
