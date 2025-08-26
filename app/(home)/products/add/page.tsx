"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  X,
  Plus,
  Minus,
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  categories,
  productTypes,
  generateSKU,
  uploadToCloudinary,
} from "@/lib/utils";
import Link from "next/link";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  productType: z.string().min(1, "Please select a product type"),
  categories: z.array(z.string()).min(1, "Please select at least one category"),
  variants: z
    .array(
      z.object({
        color: z.string().min(1, "Color is required"),
        size: z.string().optional(),
        price: z.number().min(1, "Price must be greater than 0"),
        stock: z.number().min(0, "Stock cannot be negative"),
        sku: z.string().optional(),
      })
    )
    .min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductImage {
  file: File;
  preview: string;
  uploading: boolean;
  cloudinaryUrl?: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [{ color: "", size: "", price: 0, stock: 0 }],
      categories: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const watchedProductName = watch("name");

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        continue;
      }

      const preview = URL.createObjectURL(file);
      const newImage: ProductImage = {
        file,
        preview,
        uploading: true,
      };

      setImages((prev) => [...prev, newImage]);

      try {
        const { url } = await uploadToCloudinary(file);
        setImages((prev) =>
          prev.map((img) =>
            img.preview === preview
              ? { ...img, uploading: false, cloudinaryUrl: url }
              : img
          )
        );
      } catch (error) {
        console.error("Upload failed:", error);
        setImages((prev) => prev.filter((img) => img.preview !== preview));
        alert(`Failed to upload ${file.name}`);
      }
    }
  };

  const removeImage = (preview: string) => {
    setImages((prev) => prev.filter((img) => img.preview !== preview));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories: string[];
    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(newCategories);
    setValue("categories", newCategories);
  };

  const generateVariantSKU = (index: number) => {
    const variant = watch(`variants.${index}`);
    if (watchedProductName && variant.color) {
      const sku = generateSKU(watchedProductName, variant.color, variant.size);
      setValue(`variants.${index}.sku`, sku);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (images.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    if (images.some((img) => img.uploading)) {
      alert("Please wait for all images to finish uploading");
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API call - in real app, this would submit to your backend
      const productData = {
        ...data,
        images: images.map((img) => img.cloudinaryUrl),
        status: "draft",
        createdAt: new Date().toISOString(),
      };

      console.log("Submitting product:", productData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Product added successfully!");
      router.push("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Create a new product listing for your store.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Provide the basic details about your product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select
                    onValueChange={(value) => setValue("productType", value)}
                  >
                    <SelectTrigger
                      className={errors.productType ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.productType && (
                    <p className="text-sm text-red-500">
                      {errors.productType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in detail"
                  rows={4}
                  {...register("description")}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Select the categories that best describe your product.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category, checked as boolean)
                      }
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-500 mt-2">
                  {errors.categories.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Upload high-quality images of your product. The first image will
                be the main image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Drag and drop images here, or click to select
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    PNG, JPG up to 5MB each. Maximum 10 images.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={images.length >= 10}
                  />
                  <Label
                    htmlFor="image-upload"
                    className={`inline-block cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-100 ${
                      images.length >= 10 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Choose Files
                  </Label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {images.map((image, index) => (
                      <div key={image.preview} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image.preview}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {image.uploading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <Loader2 className="w-6 h-6 text-white animate-spin" />
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(image.preview)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            Main
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Product Variants</CardTitle>
              <CardDescription>
                Add different variants of your product (color, size, price,
                stock).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Variant {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`variants.${index}.color`}>
                          Color *
                        </Label>
                        <Input
                          placeholder="e.g., Red, Blue"
                          {...register(`variants.${index}.color`)}
                          className={
                            errors.variants?.[index]?.color
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors.variants?.[index]?.color && (
                          <p className="text-sm text-red-500">
                            {errors.variants[index]?.color?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`variants.${index}.size`}>Size</Label>
                        <Input
                          placeholder="e.g., M, L, XL"
                          {...register(`variants.${index}.size`)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`variants.${index}.price`}>
                          Price (₦) *
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          {...register(`variants.${index}.price`, {
                            valueAsNumber: true,
                          })}
                          className={
                            errors.variants?.[index]?.price
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors.variants?.[index]?.price && (
                          <p className="text-sm text-red-500">
                            {errors.variants[index]?.price?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`variants.${index}.stock`}>
                          Stock *
                        </Label>
                        <Input
                          type="number"
                          placeholder="0"
                          {...register(`variants.${index}.stock`, {
                            valueAsNumber: true,
                          })}
                          className={
                            errors.variants?.[index]?.stock
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {errors.variants?.[index]?.stock && (
                          <p className="text-sm text-red-500">
                            {errors.variants[index]?.stock?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`variants.${index}.sku`}>SKU:</Label>
                      <Input
                        placeholder="Auto-generated"
                        {...register(`variants.${index}.sku`)}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => generateVariantSKU(index)}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({ color: "", size: "", price: 0, stock: 0 })
                  }
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Variant
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Link href="/products">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting || images.some((img) => img.uploading)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Product...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Add Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
