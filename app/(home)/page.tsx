import React from "react";
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
  Package,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// Mock data - in real app, this would come from API
const mockStats = {
  totalProducts: 24,
  totalViews: 1250,
  totalEarnings: 45000,
  pendingOrders: 8,
  approvedProducts: 18,
  pendingProducts: 4,
  rejectedProducts: 2,
};

const mockRecentProducts = [
  {
    id: "1",
    name: "Nike Air Max 270",
    status: "approved",
    views: 45,
    earnings: 12000,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "iPhone 15 Pro",
    status: "pending",
    views: 23,
    earnings: 0,
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Samsung Galaxy Watch",
    status: "approved",
    views: 67,
    earnings: 8500,
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    name: "MacBook Pro M3",
    status: "rejected",
    views: 12,
    earnings: 0,
    createdAt: "2024-01-12",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "rejected":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "text-green-700 bg-green-50 border-green-200";
    case "pending":
      return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "rejected":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link href="/products/add">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.totalProducts}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +2 from last month
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
                {mockStats.totalViews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12% from last week
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(mockStats.totalEarnings)}
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
                Pending Orders
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockStats.pendingOrders}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                  -2 from yesterday
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Product Status Overview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Product Status</CardTitle>
              <CardDescription>
                Overview of your product approval status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Approved</span>
                </div>
                <span className="text-sm font-medium">
                  {mockStats.approvedProducts}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Pending</span>
                </div>
                <span className="text-sm font-medium">
                  {mockStats.pendingProducts}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">Rejected</span>
                </div>
                <span className="text-sm font-medium">
                  {mockStats.rejectedProducts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Recent Products</CardTitle>
              <CardDescription>Your latest product submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(product.status)}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Created on{" "}
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {product.views} views
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(product.earnings)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          product.status
                        )}`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    View All Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/products/add">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-sm">Add Product</span>
                </Button>
              </Link>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Package className="w-6 h-6" />
                  <span className="text-sm">Manage Products</span>
                </Button>
              </Link>
              <Link href="/statistics">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span className="text-sm">View Statistics</span>
                </Button>
              </Link>
              <Link href="/finance">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <DollarSign className="w-6 h-6" />
                  <span className="text-sm">Finance</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
