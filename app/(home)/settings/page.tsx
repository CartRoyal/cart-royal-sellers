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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Store,
  Shield,
  Trash2,
  Upload,
  X,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2,
  Camera,
  CheckCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { uploadToCloudinary, validateEmail, validatePhone } from "@/lib/utils";

const accountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  storeName: z.string().min(2, "Store name must be at least 2 characters"),
  cac: z.string().optional(),
  address: z.string().min(10, "Please provide a complete address"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AccountFormData = z.infer<typeof accountSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

// Mock seller data
const mockSeller = {
  id: "1",
  email: "seller@example.com",
  phone: "+234 801 234 5678",
  storeName: "My Amazing Store",
  cac: "RC123456789",
  address: "123 Business Street, Victoria Island, Lagos, Nigeria",
  storeLogoUrl: "",
  storeBackgroundUrl: "",
  isVerified: true,
  joinedDate: "2024-01-01",
  totalProducts: 24,
  totalSales: 156,
  rating: 4.8,
};

export default function SettingsPage() {
  const router = useRouter();
  const [seller, setSeller] = useState(mockSeller);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [storeLogo, setStoreLogo] = useState<File | null>(null);
  const [storeBackground, setStoreBackground] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState(seller.storeLogoUrl);
  const [backgroundPreview, setBackgroundPreview] = useState(
    seller.storeBackgroundUrl
  );
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBackground, setUploadingBackground] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: seller.email,
      phone: seller.phone,
      storeName: seller.storeName,
      cac: seller.cac,
      address: seller.address,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handleLogoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Logo file size must be less than 5MB");
      return;
    }

    setUploadingLogo(true);
    try {
      const preview = URL.createObjectURL(file);
      setLogoPreview(preview);
      setStoreLogo(file);

      // Mock upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleBackgroundUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Background image file size must be less than 10MB");
      return;
    }

    setUploadingBackground(true);
    try {
      const preview = URL.createObjectURL(file);
      setBackgroundPreview(preview);
      setStoreBackground(file);

      // Mock upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Error uploading background:", error);
    } finally {
      setUploadingBackground(false);
    }
  };

  const onAccountSubmit = async (data: AccountFormData) => {
    setIsUpdating(true);
    try {
      // Mock API call
      console.log("Updating account:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSeller((prev) => ({ ...prev, ...data }));
      alert("Account updated successfully!");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("Failed to update account. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsChangingPassword(true);
    try {
      // Mock API call
      console.log("Changing password:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      resetPasswordForm();
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Mock API call
      console.log("Deleting account");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      localStorage.removeItem("seller_token");
      localStorage.removeItem("seller_data");
      router.push("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account details and store information.
          </p>
        </div>

        {/* Account Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Account Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={logoPreview} />
                <AvatarFallback className="text-lg">
                  <Store className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{seller.storeName}</h3>
                <p className="text-gray-600">{seller.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">
                      {seller.isVerified
                        ? "Verified Seller"
                        : "Pending Verification"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Joined {new Date(seller.joinedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {seller.totalProducts}
                    </p>
                    <p className="text-xs text-gray-500">Products</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {seller.totalSales}
                    </p>
                    <p className="text-xs text-gray-500">Sales</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">
                      {seller.rating}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your account details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleAccountSubmit(onAccountSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerAccount("email")}
                    className={accountErrors.email ? "border-red-500" : ""}
                  />
                  {accountErrors.email && (
                    <p className="text-sm text-red-500">
                      {accountErrors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...registerAccount("phone")}
                    className={accountErrors.phone ? "border-red-500" : ""}
                  />
                  {accountErrors.phone && (
                    <p className="text-sm text-red-500">
                      {accountErrors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    {...registerAccount("storeName")}
                    className={accountErrors.storeName ? "border-red-500" : ""}
                  />
                  {accountErrors.storeName && (
                    <p className="text-sm text-red-500">
                      {accountErrors.storeName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cac">CAC Number (Optional)</Label>
                  <Input id="cac" {...registerAccount("cac")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    {...registerAccount("address")}
                    className={accountErrors.address ? "border-red-500" : ""}
                  />
                  {accountErrors.address && (
                    <p className="text-sm text-red-500">
                      {accountErrors.address.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Account
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Store Images */}
          <Card>
            <CardHeader>
              <CardTitle>Store Images</CardTitle>
              <CardDescription>
                Update your store logo and background image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Store Logo */}
              <div className="space-y-2">
                <Label>Store Logo</Label>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={logoPreview} />
                    <AvatarFallback>
                      <Store className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                      disabled={uploadingLogo}
                    />
                    <Label
                      htmlFor="logo-upload"
                      className="inline-flex items-center cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-100"
                    >
                      {uploadingLogo ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Change Logo
                        </>
                      )}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Store Background */}
              <div className="space-y-2">
                <Label>Store Background</Label>
                <div className="space-y-2">
                  {backgroundPreview && (
                    <div className="relative">
                      <img
                        src={backgroundPreview}
                        alt="Store background"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                    id="background-upload"
                    disabled={uploadingBackground}
                  />
                  <Label
                    htmlFor="background-upload"
                    className="inline-flex items-center cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-md text-sm hover:bg-blue-100"
                  >
                    {uploadingBackground ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        {backgroundPreview
                          ? "Change Background"
                          : "Upload Background"}
                      </>
                    )}
                  </Label>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 10MB. Recommended size: 1200x400px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Security Settings</span>
            </CardTitle>
            <CardDescription>
              Manage your password and account security.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handlePasswordSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...registerPassword("currentPassword")}
                      className={
                        passwordErrors.currentPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...registerPassword("newPassword")}
                      className={
                        passwordErrors.newPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerPassword("confirmPassword")}
                      className={
                        passwordErrors.confirmPassword
                          ? "border-red-500 pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isChangingPassword}
                className="bg-green-600 hover:bg-green-700"
              >
                {isChangingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Changing Password...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span>Danger Zone</span>
            </CardTitle>
            <CardDescription>
              Irreversible and destructive actions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
              <div>
                <h4 className="font-medium text-red-900">Delete Account</h4>
                <p className="text-sm text-red-700">
                  Permanently delete your seller account and all associated
                  data.
                </p>
              </div>
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={(open) => {
                  setDeleteDialogOpen(open);
                  if (!open) {
                    setDeleteConfirmation(""); // Reset on close
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-red-600 border-red-300 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Delete Account</span>
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your seller account, remove all your products, and delete
                      all associated data.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-600">
                      Are you absolutely sure you want to delete your account?
                      Type <strong>DELETE</strong> to confirm.
                    </p>
                    <Input
                      value={deleteConfirmation}
                      onChange={(e) => setDeleteConfirmation(e.target.value)}
                      placeholder="Type DELETE to confirm"
                      className="mt-2"
                      id="delete-confirmation"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setDeleteDialogOpen(false);
                        setDeleteConfirmation("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteAccount}
                      disabled={deleteConfirmation !== "DELETE"}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
