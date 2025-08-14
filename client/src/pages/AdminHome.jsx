import axios from "axios";
import {
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Menu,
  X,
  DollarSign,
  Eye,
  Plus,
  IndianRupee,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import { UserContext } from "../contexts/UserContext";
import { toast } from "react-toastify";
const AdminHome = ({ setSidebarOpen, refresh, activeTab,setActiveTab }) => {
  const [User, setuser] = useState(null);
  const { user } = useContext(UserContext);
  const [topProducts, settopProducts] = useState([]);
  const [topOrders, settopOrders] = useState([]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:4000/api/admin/dashboard/user",
        { UserId: user._id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          setuser(res.data.user);
          const newProduct=[];
          let x=4;
          for (let i=res.data.products.length-1;i>=0 && x>0;i--){
            newProduct.push(res.data.products[i]);
            x--;
          }
          const newOrders=[];
          x=4;
          for (let i=res.data.orders.length-1;i>=0 && x>0;i--){
            newOrders.push(res.data.orders[i]);
            x--;
          }
          settopProducts(newProduct);
          settopOrders(newOrders);
        } else {
          toast.error("Error while fetching data");
        }
      })
      .catch((error) => {
        toast.error("Error while fetching data");
      });
  }, [refresh, activeTab]);
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Placed":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
   const calculateProfit=(order)=>{
    let totalAmount=0;
    order.products.forEach(product=>{
      totalAmount+=product.price*product.quantity;
    });
    return totalAmount;
  }
  const StatCard = ({ title, value, growth, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {/* <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600 font-medium">
              +{growth}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div> */}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
  return (
    <>
      {!User && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
          <RiseLoader />
        </div>
      )}
      {User && (
        <div className="flex-1 lg:ml-64">
          <>
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="flex items-center justify-between px-6 py-4">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-2 md:mr-0">
                    Welcome back, {User.name.split(" ")[0]}
                  </h2>
                <div className="flex items-center space-x-4">
                  <Link
                    to="/admin/dashboard/add-product"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors  items-center hidden md:flex"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Link>
                  <Link
                    to="/admin/dashboard/add-product"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-3 rounded-lg font-medium transition-colors flex items-center md:hidden"
                  >
                    <Plus className="w-5 h-5" />
                  </Link>
                  <img src={User.image} className="w-10 h-10 rounded-full" />
                </div>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard
                  title="Total Orders"
                  value={User.orders}
                  icon={ShoppingCart}
                  color="bg-gradient-to-r from-blue-500 to-blue-600"
                />
                <StatCard
                  title="Total Products"
                  value={User.products}
                  icon={Package}
                  color="bg-gradient-to-r from-green-500 to-green-600"
                />
                <StatCard
                  title="Revenue"
                  value={`₹${User.revenue}`}
                  icon={IndianRupee}
                  color="bg-gradient-to-r from-purple-500 to-purple-600"
                />
              </div>

              {/* Charts and Tables Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recent Orders
                      </h3>
                      {User.orders > 0 && (
                        <button onClick={()=>{
                          setActiveTab("orders");
                        }} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          View All
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      {User.orders === 0 && (
                        <tbody>
                          <tr>
                            <td colSpan={4}>
                              <p className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg shadow-inner text-lg font-medium">
                                <span className="inline-flex items-center gap-2">
                                  <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 17v-2a4 4 0 018 0v2m-4-4v4m0 0v4m0-4h4m-4 0H7"
                                    ></path>
                                  </svg>
                                  No orders to show
                                </span>
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      )}
                      {User.orders > 0 && (
                        <tbody className="divide-y divide-gray-200">
                          {topOrders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {`ORD-${new Date().getFullYear()}-${order._id[order._id.length-3]}${order._id[order._id.length-2]}${order._id[order._id.length-1]}`}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {order.address.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                ₹{calculateProfit(order)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Featured Products
                    </h3>
                  </div>
                  <div className="p-6">
                    {topProducts.length === 0 ? (
                      <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg shadow-inner">
                        <div className="flex flex-col items-center gap-3">
                          <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                            />
                          </svg>
                          <div>
                            <p className="text-lg font-medium">
                              No products to show
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                              Start adding products to see them here
                            </p>
                          </div>
                          <Link
                            to="/admin/dashboard/add-product"
                            className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Your First Product
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {topProducts.map((product, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {product.sales} sales
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                ₹{product.price}
                              </p>
                              <p className="text-xs text-gray-500">Price</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: "Add New Product",
                      desc: "Create a new product listing",
                      color: "bg-blue-500",
                      icon: Package,
                    },
                    {
                      title: "Process Orders",
                      desc: "Review pending orders",
                      color: "bg-green-500",
                      icon: ShoppingCart,
                      link: "",
                    },
                    {
                      title: "View Analytics",
                      desc: "Check detailed reports",
                      color: "bg-purple-500",
                      icon: BarChart3,
                    },
                    {
                      title: "Manage Users",
                      desc: "User management panel",
                      color: "bg-orange-500",
                      icon: Users,
                    },
                  ].map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <div
                        key={index}
                        className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
                      >
                        <div
                          className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600">{action.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </>
        </div>
      )}
    </>
  );
};
export default AdminHome;
