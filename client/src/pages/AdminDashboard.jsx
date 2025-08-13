import React, { useContext, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Menu,
  X,
  Plus,
} from "lucide-react";
import SettingsPage from "./SetttingsPage";
import AdminHome from "./AdminHome";
import AdminProducts from "./AdminProducts";
import AdminOrder from "./AdminOrder";
import AdminAnalytics from "./AdminAnalytics";
import AdminCustomer from "./AdminCustomer";
const AdminDashboard = ({refresh}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2.5 mb-1 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
      {activeTab === "settings" && (
        <div className="flex-1 flex items-center justify-center">
          <SettingsPage setActiveTab={setActiveTab}/>
        </div>
      )}
      {activeTab === "products" && (
        <div className="flex-1 flex items-center justify-center">
          <AdminProducts activeTab={activeTab}/>
        </div>
      )}
      {activeTab === "orders" && (
        <div className="flex-1 flex items-center justify-center">
          <AdminOrder activeTab={activeTab}/>
        </div>
      )}
      {activeTab === "analytics" && (
        <div className="flex-1 flex items-center justify-center">
          <AdminAnalytics/>
        </div>
      )}
      {activeTab === "customers" && (
        <div className="flex-1 flex items-center justify-center">
          <AdminCustomer/>
        </div>
      )}
      {activeTab === "dashboard" && <AdminHome setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen} refresh={refresh} activeTab={activeTab}/>}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
