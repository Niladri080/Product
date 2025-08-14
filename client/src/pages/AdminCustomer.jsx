import React, { useContext, useEffect, useState } from "react";
import {
  Search,
  Grid,
  List,
  Mail,
  Download,
  RefreshCw,
  Phone,
  MapPin,
  Users,
} from "lucide-react";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

export default function AdminCustomer() {
  const { user } = useContext(UserContext);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(
        "http://localhost:4000/api/admin/dashboard/get-customers",
        { id: user._id },
        { withCredentials: true }
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          setCustomers(res.data.customers);
        } else {
          toast.error("Failed to fetch customers");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to fetch customers");
        console.log(err);
      });
  }, [user._id]);

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.address.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.address.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.address.phone.includes(searchTerm)
    );
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.address.createdAt) - new Date(a.address.createdAt);
      case "oldest":
        return new Date(a.address.createdAt) - new Date(b.address.createdAt);
      case "alphabetical":
        return a.address.name.localeCompare(b.address.name);
      default:
        return 0;
    }
  });

  const CustomerCard = ({ customer }) => (
    <div className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-semibold text-gray-900">{customer.address.name}</h3>
              <p className="text-sm text-gray-600">{customer.email}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 mb-4">
  {/* Phone */}
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <Phone className="w-4 h-4" />
    <span>{customer.address.phone}</span>
  </div>

  {/* Address */}
  <div className="flex items-start gap-2 text-sm text-gray-600">
    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
    <div className="flex flex-col">
      <span>{customer.address.city}</span>
      <span>{customer.address.state}</span>
      <span>{customer.address.pin}</span>
    </div>
  </div>
</div>
      </div>
    </div>
  );

  const CustomerRow = ({ customer }) => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
      
          <div>
            <div className="font-semibold text-gray-900">{customer.address.name}</div>
            <div className="text-sm text-gray-600">{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{customer.address.phone}</td>
    </tr>
  );

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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
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
        </div>

        {/* Customers Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCustomers.map((customer) => (
              <CustomerCard key={customer.address._id} customer={customer} />
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
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedCustomers.map((customer) => (
                  <CustomerRow key={customer.address._id} customer={customer} />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {sortedCustomers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No customers found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search."
                : "Customer data will appear here as orders are placed."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
