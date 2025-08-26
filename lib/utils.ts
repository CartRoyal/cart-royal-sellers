import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categories = [
  "Men",
  "Women",
  "Kids & Mom",
  "Health & Beauty",
  "Phones & Tablets",
  "Toys & Games",
  "Sport & Outdoor",
  "Electronics",
  "Accessories",
  "Vehicles",
  "Office & Stationaries",
];

export const productTypes = [
  "Shoes",
  "Clothing",
  "Laptop",
  "Washing Machine",
  "Phone",
  "Tablet",
  "Watch",
  "Bag",
  "Jewelry",
  "Book",
  "Toy",
  "Game",
  "Sports Equipment",
  "Car",
  "Motorcycle",
  "Office Supplies",
  "Furniture",
  "Electronics",
  "Beauty Products",
  "Health Products",
];

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
};

export const generateSKU = (
  productName: string,
  color?: string,
  size?: string
) => {
  const prefix = productName.substring(0, 3).toUpperCase();
  const colorCode = color ? color.substring(0, 3).toUpperCase() : "DEF";
  const sizeCode = size ? size.toUpperCase() : "OS";
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();

  return `${prefix}-${colorCode}-${sizeCode}-${random}`;
};

export const uploadToCloudinary = async (
  file: File
): Promise<{ url: string; publicId: string }> => {
  // Mock implementation for frontend-only version
  // In real implementation, this would upload to Cloudinary
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockUrl = URL.createObjectURL(file);
      const mockPublicId = `mock_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2)}`;
      resolve({ url: mockUrl, publicId: mockPublicId });
    }, 1000);
  });
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
  return phoneRegex.test(phone);
};

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
      return "text-green-600 bg-green-50 border-green-200";
    case "pending":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "rejected":
      return "text-red-600 bg-red-50 border-red-200";
    case "draft":
      return "text-gray-600 bg-gray-50 border-gray-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const mockApiCall = <T>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};
