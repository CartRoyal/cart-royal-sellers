"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  BarChart3,
  CreditCard,
  FileText,
  Phone,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  ShoppingBag,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Statistics",
    href: "/statistics",
    icon: BarChart3,
  },
  {
    name: "Finance",
    href: "/finance",
    icon: CreditCard,
  },
  {
    name: "Account Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Terms & Conditions",
    href: "/terms",
    icon: FileText,
  },
  {
    name: "Contact Cart Royal",
    href: "/contact",
    icon: Phone,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    // Mock seller data - in real app, this would come from authentication context
    const mockSeller = {
      id: "1",
      email: "seller@example.com",
      storeName: "My Amazing Store",
      storeLogoUrl: "",
      isVerified: true,
    };
    setSeller(mockSeller);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("seller_token");
    localStorage.removeItem("seller_data");
    router.push("/login");
  };

  const isCurrentPath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-row relative">
      {/* Sidebar */}
      <div className="overflow-x-hidden fixed left-0 top-0 bottom-0 z-50 w-72 h-screen bg-white shadow-lg hidden lg:flex lg:flex-col lg:flex-shrink-0">
        <div className="flex flex-col w-full h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                Cart Royal
              </span>
            </div>
          </div>

          {/* Store Info */}
          {seller && (
            <div className="px-6 py-4 border-b bg-gray-50">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={seller.storeLogoUrl} />
                  <AvatarFallback>
                    <Store className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {seller.storeName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {seller.isVerified
                      ? "Verified Seller"
                      : "Pending Verification"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = isCurrentPath(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-blue-700"
                        : "text-gray-400 group-hover:text-gray-500"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="border-t px-4 py-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback>
                  {seller?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {seller?.email}
                </p>
                <p className="text-xs text-gray-500">Seller Account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-1 flex-col lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 w-full items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col w-full h-full">
                  {/* Logo */}
                  <div className="flex items-center justify-between h-16 px-6 border-b">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">
                        Cart Royal
                      </span>
                    </div>
                  </div>

                  {/* Store Info */}
                  {seller && (
                    <div className="px-6 py-4 border-b bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={seller.storeLogoUrl} />
                          <AvatarFallback>
                            <Store className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {seller.storeName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {seller.isVerified
                              ? "Verified Seller"
                              : "Pending Verification"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                      const isActive = isCurrentPath(item.href);
                      return (
                        <SheetClose asChild key={item.name}>
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                              isActive
                                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                          >
                            <item.icon
                              className={cn(
                                "mr-3 h-5 w-5 flex-shrink-0",
                                isActive
                                  ? "text-blue-700"
                                  : "text-gray-400 group-hover:text-gray-500"
                              )}
                            />
                            {item.name}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>

                  {/* User info */}
                  <div className="border-t px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {seller?.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {seller?.email}
                        </p>
                        <p className="text-xs text-gray-500">Seller Account</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            {/* Search */}
            <form
              className="relative flex flex-1 max-w-md"
              action="#"
              method="GET"
            >
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 pl-3" />
              <input
                id="search-field"
                className="block h-full w-full border-0 py-0 pl-10 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
                placeholder="Search products..."
                type="search"
                name="search"
              />
            </form>

            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {seller?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {seller?.storeName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {seller?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Account Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/statistics" className="cursor-pointer">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>Statistics</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/finance" className="cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Finance</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
