import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  IndianRupee, 
  Package, 
  Users, 
  Eye,
  ShoppingCart,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const revenueData = [
    { date: 'Jan 1', revenue: 1200, orders: 12, customers: 8 },
    { date: 'Jan 5', revenue: 1890, orders: 18, customers: 15 },
    { date: 'Jan 10', revenue: 2100, orders: 21, customers: 18 },
    { date: 'Jan 15', revenue: 1750, orders: 16, customers: 14 },
    { date: 'Jan 20', revenue: 2400, orders: 24, customers: 20 },
    { date: 'Jan 25', revenue: 2800, orders: 28, customers: 25 },
    { date: 'Jan 30', revenue: 3200, orders: 32, customers: 28 },
    { date: 'Feb 1', revenue: 2900, orders: 29, customers: 26 },
    { date: 'Feb 5', revenue: 3400, orders: 34, customers: 30 },
    { date: 'Feb 10', revenue: 3800, orders: 38, customers: 33 },
    { date: 'Feb 15', revenue: 4200, orders: 42, customers: 36 },
    { date: 'Feb 20', revenue: 4600, orders: 46, customers: 40 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#3B82F6' },
    { name: "Men's Fashion", value: 25, color: '#10B981' },
    { name: "Women's Fashion", value: 20, color: '#F59E0B' },
    { name: 'Accessories', value: 10, color: '#EF4444' }
  ];

  const topProductsData = [
    { name: 'Premium Headphones', sales: 45, revenue: 13455 },
    { name: 'Smart Watch', sales: 32, revenue: 6368 },
    { name: 'Laptop Pro', sales: 12, revenue: 15588 },
    { name: 'Summer Dress', sales: 18, revenue: 1602 },
    { name: 'Cotton T-Shirt', sales: 28, revenue: 1372 }
  ];

  const conversionData = [
    { step: 'Visitors', count: 1000, percentage: 100 },
    { step: 'Product Views', count: 450, percentage: 45 },
    { step: 'Add to Cart', count: 180, percentage: 18 },
    { step: 'Checkout', count: 90, percentage: 9 },
    { step: 'Purchase', count: 72, percentage: 7.2 }
  ];

  const performanceMetrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(42350),
      change: '+15.3%',
      trend: 'up',
      icon: IndianRupee,
      color: 'green',
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: '1,284',
      change: '+12.5%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'blue',
      description: 'vs last month'
    },
    {
      title: 'New Customers',
      value: '348',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'purple',
      description: 'vs last month'
    },
    {
      title: 'Conversion Rate',
      value: '7.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'orange',
      description: 'vs last month'
    },
    {
      title: 'Avg. Order Value',
      value: formatCurrency(156),
      change: '+5.8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'green',
      description: 'vs last month'
    },
    {
      title: 'Page Views',
      value: '12,845',
      change: '+22.1%',
      trend: 'up',
      icon: Eye,
      color: 'blue',
      description: 'vs last month'
    }
  ];

  const quickStats = [
    { label: "Today's Sales", value: formatCurrency(2340), icon: IndianRupee },
    { label: 'This Week', value: formatCurrency(18750), icon: Calendar },
    { label: 'Active Products', value: '127', icon: Package },
    { label: 'Pending Orders', value: '23', icon: Activity }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'revenue' ? formatCurrency(entry.value) : entry.value} {entry.name}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">Analytics Dashboard</h1>
              <div className="w-16 h-0.5 bg-black"></div>
            </div>
            <div className="flex gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
              <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <stat.icon className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend */}
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-1 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-black focus:border-black"
              >
                <option value="revenue">Revenue</option>
                <option value="orders">Orders</option>
                <option value="customers">Customers</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Sales by Category */}
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Selling Products</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#666" fontSize={12} />
                <YAxis type="category" dataKey="name" stroke="#666" fontSize={12} width={120} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'sales' ? `${value} sales` : formatCurrency(value),
                    name === 'sales' ? 'Sales' : 'Revenue'
                  ]}
                />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel</h3>
            <div className="space-y-4">
              {conversionData.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{step.step}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{step.count.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">({step.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${step.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-blue-900">Growth Insight</h4>
            </div>
            <p className="text-blue-800 text-sm">
              Your revenue has increased by 15.3% this month. Electronics category is performing exceptionally well.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-green-900">Top Performer</h4>
            </div>
            <p className="text-green-800 text-sm">
              Premium Headphones are your best-selling product with 45 sales and {formatCurrency(13455)} in revenue this month.
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-600 rounded-lg">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-semibold text-orange-900">Opportunity</h4>
            </div>
            <p className="text-orange-800 text-sm">
              Conversion rate has dropped by 2.1%. Consider optimizing your checkout process to improve conversions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
