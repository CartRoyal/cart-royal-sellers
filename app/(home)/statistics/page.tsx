"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Package,
  DollarSign,
  Users,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  ShoppingCart,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Mock data for charts
const salesData = [
  { month: "Jan", sales: 45000, orders: 12, views: 450 },
  { month: "Feb", sales: 52000, orders: 15, views: 520 },
  { month: "Mar", sales: 48000, orders: 13, views: 480 },
  { month: "Apr", sales: 61000, orders: 18, views: 610 },
  { month: "May", sales: 55000, orders: 16, views: 550 },
  { month: "Jun", sales: 67000, orders: 20, views: 670 },
  { month: "Jul", sales: 72000, orders: 22, views: 720 },
  { month: "Aug", sales: 68000, orders: 19, views: 680 },
  { month: "Sep", sales: 75000, orders: 24, views: 750 },
  { month: "Oct", sales: 82000, orders: 26, views: 820 },
  { month: "Nov", sales: 78000, orders: 23, views: 780 },
  { month: "Dec", sales: 85000, orders: 28, views: 850 },
];

const categoryData = [
  { name: "Electronics", value: 35, sales: 245000, color: "#3B82F6" },
  { name: "Clothing", value: 25, sales: 175000, color: "#10B981" },
  { name: "Sports", value: 20, sales: 140000, color: "#F59E0B" },
  { name: "Accessories", value: 15, sales: 105000, color: "#EF4444" },
  { name: "Others", value: 5, sales: 35000, color: "#8B5CF6" },
];

const topProducts = [
  {
    name: "Nike Air Max 270",
    sales: 45,
    revenue: 255000,
    views: 1250,
    rating: 4.8,
  },
  {
    name: "iPhone 15 Pro",
    sales: 32,
    revenue: 384000,
    views: 980,
    rating: 4.9,
  },
  {
    name: "Samsung Galaxy Watch",
    sales: 28,
    revenue: 168000,
    views: 750,
    rating: 4.6,
  },
  {
    name: "MacBook Pro M3",
    sales: 15,
    revenue: 375000,
    views: 450,
    rating: 4.7,
  },
  {
    name: "Sony Headphones",
    sales: 38,
    revenue: 171000,
    views: 890,
    rating: 4.5,
  },
];

const recentActivity = [
  {
    type: "sale",
    product: "Nike Air Max 270",
    amount: 85000,
    time: "2 hours ago",
  },
  { type: "view", product: "iPhone 15 Pro", count: 15, time: "3 hours ago" },
  {
    type: "sale",
    product: "Samsung Galaxy Watch",
    amount: 320000,
    time: "5 hours ago",
  },
  { type: "review", product: "MacBook Pro M3", rating: 5, time: "1 day ago" },
  {
    type: "sale",
    product: "Sony Headphones",
    amount: 450000,
    time: "1 day ago",
  },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "sale":
      return <ShoppingCart className="w-4 h-4 text-green-500" />;
    case "view":
      return <Eye className="w-4 h-4 text-blue-500" />;
    case "review":
      return <Star className="w-4 h-4 text-yellow-500" />;
    default:
      return <Package className="w-4 h-4 text-gray-500" />;
  }
};

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("12months");
  const [chartType, setChartType] = useState("sales");

  const currentMonthSales = salesData[salesData.length - 1].sales;
  const previousMonthSales = salesData[salesData.length - 2].sales;
  const salesGrowth =
    ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
  const totalViews = salesData.reduce((sum, item) => sum + item.views, 0);
  const averageOrderValue = totalSales / totalOrders;

  const renderChart = () => {
    switch (chartType) {
      case "sales":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value) => [
                  formatCurrency(value as number),
                  "Sales",
                ]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "orders":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Orders"]} />
              <Bar dataKey="orders" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "views":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [value, "Views"]} />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#F59E0B"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Statistics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your store performance and analyze sales data.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalSales)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${
                    salesGrowth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {salesGrowth >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(salesGrowth).toFixed(1)}% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +8% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Order Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(averageOrderValue)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +5% from last month
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>
                    Track your store's performance over time
                  </CardDescription>
                </div>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>{renderChart()}</CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>
                Revenue distribution across product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {categoryData.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{category.value}%</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(category.sales)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Products</CardTitle>
              <CardDescription>
                Your best-selling products this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">
                          {product.sales} sold
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">
                          {product.views} views
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-500">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest activities in your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.type === "sale" && (
                          <>
                            <span className="font-medium">Sale:</span>{" "}
                            {activity.product}
                          </>
                        )}
                        {activity.type === "view" && (
                          <>
                            <span className="font-medium">
                              {activity.count} views
                            </span>{" "}
                            on {activity.product}
                          </>
                        )}
                        {activity.type === "review" && (
                          <>
                            <span className="font-medium">
                              {activity.rating}-star review
                            </span>{" "}
                            on {activity.product}
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    {activity.type === "sale" && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          {formatCurrency(activity.amount!)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
