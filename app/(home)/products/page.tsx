"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  Image as ImageIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency, getStatusColor, truncateText } from "@/lib/utils";

// Mock products data
const mockProducts = [
  {
    id: "1",
    name: "Nike Air Max 270 Running Shoes",
    productType: "Shoes",
    categories: ["Men", "Sport & Outdoor"],
    status: "approved",
    price: 85000,
    stock: 25,
    views: 145,
    earnings: 255000,
    images: ["https://example.com/image1.jpg"],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max 256GB",
    productType: "Phone",
    categories: ["Electronics", "Phones & Tablets"],
    status: "pending",
    price: 1200000,
    stock: 10,
    views: 89,
    earnings: 0,
    images: ["https://example.com/image2.jpg"],
    createdAt: "2024-01-14",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "Samsung Galaxy Watch 6",
    productType: "Watch",
    categories: ["Electronics", "Accessories"],
    status: "approved",
    price: 320000,
    stock: 15,
    views: 67,
    earnings: 960000,
    images: ["https://example.com/image3.jpg"],
    createdAt: "2024-01-13",
    updatedAt: "2024-01-13",
  },
  {
    id: "4",
    name: "MacBook Pro M3 14-inch",
    productType: "Laptop",
    categories: ["Electronics", "Office & Stationaries"],
    status: "rejected",
    price: 2500000,
    stock: 5,
    views: 34,
    earnings: 0,
    images: ["https://example.com/image4.jpg"],
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "5",
    name: "Adidas Ultraboost 22",
    productType: "Shoes",
    categories: ["Men", "Women", "Sport & Outdoor"],
    status: "approved",
    price: 95000,
    stock: 30,
    views: 78,
    earnings: 190000,
    images: ["https://example.com/image5.jpg"],
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
  {
    id: "6",
    name: "Sony WH-1000XM5 Headphones",
    productType: "Electronics",
    categories: ["Electronics", "Accessories"],
    status: "pending",
    price: 450000,
    stock: 12,
    views: 56,
    earnings: 0,
    images: ["https://example.com/image6.jpg"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
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
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((product) =>
        product.categories.includes(categoryFilter)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, statusFilter, categoryFilter]);

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const stats = {
    total: products.length,
    approved: products.filter((p) => p.status === "approved").length,
    pending: products.filter((p) => p.status === "pending").length,
    rejected: products.filter((p) => p.status === "rejected").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your product listings and track their performance.
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.approved}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.rejected}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Sport & Outdoor">
                    Sport & Outdoor
                  </SelectItem>
                  <SelectItem value="Phones & Tablets">
                    Phones & Tablets
                  </SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Office & Stationaries">
                    Office & Stationaries
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-gray-100 relative">
                {product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                ) : null}
                <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute top-2 right-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/products/${product.id}`}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/products/${product.id}/edit`}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Product
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="absolute top-2 left-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {getStatusIcon(product.status)}
                    <span className="ml-1 capitalize">{product.status}</span>
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg leading-tight">
                    {truncateText(product.name, 50)}
                  </h3>
                  <p className="text-sm text-gray-600">{product.productType}</p>
                  <div className="flex flex-wrap gap-1">
                    {product.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                    {product.categories.length > 2 && (
                      <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        +{product.categories.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.stock} in stock
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {product.views} views
                      </p>
                      <p className="text-sm text-green-600">
                        {formatCurrency(product.earnings)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 text-center mb-4">
                {searchTerm ||
                statusFilter !== "all" ||
                categoryFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by adding your first product."}
              </p>
              <Link href="/products/add">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Product
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
