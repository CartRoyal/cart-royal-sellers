"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import {
  ArrowLeft,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  DollarSign,
  Calendar,
  Tag,
  Image as ImageIcon,
  Star,
  MessageSquare,
  Share2,
} from "lucide-react";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Nike Air Max 270 Running Shoes",
  description:
    "Experience ultimate comfort and style with the Nike Air Max 270. Featuring Nike's largest heel Air unit yet, these shoes provide exceptional cushioning and a modern look that's perfect for everyday wear. The engineered mesh upper offers breathability while the rubber outsole provides durable traction.",
  productType: "Shoes",
  categories: ["Men", "Sport & Outdoor"],
  status: "approved",
  variants: [
    {
      id: "1",
      color: "Black",
      size: "42",
      price: 85000,
      stock: 25,
      sku: "NIK-BLA-42-ABC",
    },
    {
      id: "2",
      color: "White",
      size: "43",
      price: 85000,
      stock: 18,
      sku: "NIK-WHI-43-DEF",
    },
    {
      id: "3",
      color: "Red",
      size: "44",
      price: 90000,
      stock: 12,
      sku: "NIK-RED-44-GHI",
    },
  ],
  images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ],
  views: 145,
  earnings: 255000,
  totalSold: 8,
  averageRating: 4.5,
  reviewCount: 12,
  createdAt: "2024-01-15",
  updatedAt: "2024-01-15",
  approvedAt: "2024-01-16",
};

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    customerName: "John D.",
    rating: 5,
    comment: "Excellent quality shoes! Very comfortable and stylish.",
    date: "2024-01-20",
  },
  {
    id: "2",
    customerName: "Sarah M.",
    rating: 4,
    comment:
      "Good shoes, fast delivery. Slightly tight fit but overall satisfied.",
    date: "2024-01-18",
  },
  {
    id: "3",
    customerName: "Mike R.",
    rating: 5,
    comment: "Perfect for running and daily wear. Highly recommend!",
    date: "2024-01-17",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "pending":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "rejected":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${
        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));
};

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(mockProduct);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleDeleteProduct = () => {
    if (
      confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      // Mock delete - in real app, this would call your API
      console.log("Deleting product:", id);
      router.push("/products");
    }
  };

  const totalStock = product.variants.reduce(
    (sum, variant) => sum + variant.stock,
    0
  );
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxPrice = Math.max(...product.variants.map((v) => v.price));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    product.status
                  )}`}
                >
                  {getStatusIcon(product.status)}
                  <span className="ml-2 capitalize">{product.status}</span>
                </span>
                <span className="text-sm text-gray-500">
                  Created {formatDate(product.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Link href={`/products/${id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteProduct}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {product.images.length > 0 ? (
                      <img
                        src={product.images[selectedImageIndex]}
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
                    <div className="hidden flex items-center justify-center h-full">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  {/* Thumbnail Images */}
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                            selectedImageIndex === index
                              ? "border-blue-500"
                              : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                          <div className="hidden flex items-center justify-center h-full">
                            <ImageIcon className="w-6 h-6 text-gray-400" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Product Type
                    </p>
                    <p className="text-gray-900">{product.productType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Stock
                    </p>
                    <p className="text-gray-900">{totalStock} units</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Price Range
                    </p>
                    <p className="text-gray-900">
                      {minPrice === maxPrice
                        ? formatCurrency(minPrice)
                        : `${formatCurrency(minPrice)} - ${formatCurrency(
                            maxPrice
                          )}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Sold
                    </p>
                    <p className="text-gray-900">{product.totalSold} units</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Categories
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{product.views}</p>
                      <p className="text-sm text-gray-500">Total Views</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {formatCurrency(product.earnings)}
                      </p>
                      <p className="text-sm text-gray-500">Total Earnings</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">
                        {product.averageRating}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.reviewCount} Reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Product Variants</CardTitle>
                <CardDescription>
                  Different variations of your product with their pricing and
                  stock levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Color</th>
                        <th className="text-left py-2">Size</th>
                        <th className="text-left py-2">Price</th>
                        <th className="text-left py-2">Stock</th>
                        <th className="text-left py-2">SKU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((variant) => (
                        <tr key={variant.id} className="border-b">
                          <td className="py-3">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{
                                  backgroundColor: variant.color.toLowerCase(),
                                }}
                              />
                              <span>{variant.color}</span>
                            </div>
                          </td>
                          <td className="py-3">{variant.size || "One Size"}</td>
                          <td className="py-3 font-medium">
                            {formatCurrency(variant.price)}
                          </td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                variant.stock > 10
                                  ? "bg-green-100 text-green-800"
                                  : variant.stock > 0
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {variant.stock} units
                            </span>
                          </td>
                          <td className="py-3 text-sm text-gray-500">
                            {variant.sku}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            {product.status === "approved" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Customer Reviews</span>
                  </CardTitle>
                  <CardDescription>
                    What customers are saying about your product.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {review.customerName}
                            </span>
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {formatDate(review.date)}
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
