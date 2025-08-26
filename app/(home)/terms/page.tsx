"use client";

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
  FileText,
  Download,
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const handleDownloadPDF = () => {
    // Mock PDF download
    alert("Terms and Conditions PDF download would start here");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Terms and Conditions
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Last updated: January 1, 2024
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        {/* Important Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  By using Cart Royal's seller platform, you agree to be bound
                  by these Terms and Conditions. Please read them carefully
                  before proceeding with your seller account registration or
                  product listings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table of Contents */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <a
                  href="#acceptance"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  1. Acceptance of Terms
                </a>
                <a
                  href="#seller-eligibility"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  2. Seller Eligibility
                </a>
                <a
                  href="#account-registration"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  3. Account Registration
                </a>
                <a
                  href="#product-listings"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  4. Product Listings
                </a>
                <a
                  href="#fees-payments"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  5. Fees and Payments
                </a>
                <a
                  href="#prohibited-items"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  6. Prohibited Items
                </a>
                <a
                  href="#intellectual-property"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  7. Intellectual Property
                </a>
                <a
                  href="#seller-responsibilities"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  8. Seller Responsibilities
                </a>
                <a
                  href="#order-fulfillment"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  9. Order Fulfillment
                </a>
                <a
                  href="#returns-refunds"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  10. Returns and Refunds
                </a>
                <a
                  href="#account-suspension"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  11. Account Suspension
                </a>
                <a
                  href="#limitation-liability"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  12. Limitation of Liability
                </a>
                <a
                  href="#termination"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  13. Termination
                </a>
                <a
                  href="#governing-law"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  14. Governing Law
                </a>
                <a
                  href="#contact-information"
                  className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  15. Contact Information
                </a>
              </nav>
            </CardContent>
          </Card>

          {/* Terms Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Section 1 */}
            <Card id="acceptance">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>1. Acceptance of Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  By accessing and using Cart Royal's seller platform, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these Terms and Conditions and our Privacy Policy. If
                  you do not agree to these terms, you may not use our services.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you
                  ("Seller") and Cart Royal ("Company", "we", "us", or "our").
                  We reserve the right to modify these terms at any time, and
                  such modifications will be effective immediately upon posting.
                </p>
              </CardContent>
            </Card>

            {/* Section 2 */}
            <Card id="seller-eligibility">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>2. Seller Eligibility</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>To become a seller on Cart Royal, you must:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Be at least 18 years old or the age of majority in your
                    jurisdiction
                  </li>
                  <li>
                    Have the legal capacity to enter into binding contracts
                  </li>
                  <li>
                    Provide accurate and complete registration information
                  </li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>
                    Have a valid Nigerian bank account for payment processing
                  </li>
                </ul>
                <p>
                  We reserve the right to verify your identity and eligibility
                  at any time. False or misleading information may result in
                  account suspension or termination.
                </p>
              </CardContent>
            </Card>

            {/* Section 3 */}
            <Card id="account-registration">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>3. Account Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>When registering for a seller account, you agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate, current, and complete information</li>
                  <li>
                    Maintain and update your information to keep it accurate
                  </li>
                  <li>Keep your login credentials secure and confidential</li>
                  <li>
                    Notify us immediately of any unauthorized use of your
                    account
                  </li>
                  <li>
                    Accept responsibility for all activities under your account
                  </li>
                </ul>
                <p>
                  You may only create one seller account per individual or
                  business entity. Multiple accounts may result in suspension of
                  all associated accounts.
                </p>
              </CardContent>
            </Card>

            {/* Section 4 */}
            <Card id="product-listings">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span>4. Product Listings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>When creating product listings, you must:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate and detailed product descriptions</li>
                  <li>Use high-quality, authentic product images</li>
                  <li>Set fair and competitive pricing</li>
                  <li>Maintain accurate inventory levels</li>
                  <li>Comply with all applicable product safety standards</li>
                  <li>Ensure products are legal to sell in Nigeria</li>
                </ul>
                <p>
                  All product listings are subject to our approval process. We
                  reserve the right to remove or modify listings that violate
                  our policies or applicable laws.
                </p>
              </CardContent>
            </Card>

            {/* Section 5 */}
            <Card id="fees-payments">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <span>5. Fees and Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>Cart Royal charges the following fees:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    <strong>Commission Fee:</strong> 5% of the total sale price
                    (including shipping)
                  </li>
                  <li>
                    <strong>Payment Processing Fee:</strong> 2.9% + ₦100 per
                    transaction
                  </li>
                  <li>
                    <strong>Withdrawal Fee:</strong> ₦100 per withdrawal request
                  </li>
                  <li>
                    <strong>Listing Fee:</strong> Free for the first 50
                    products, ₦200 per additional product
                  </li>
                </ul>
                <p>
                  Payments are processed within 3-7 business days after order
                  completion. We reserve the right to hold payments for up to 21
                  days for new sellers or high-risk transactions.
                </p>
                <p>
                  Fee structures may change with 30 days' notice. Continued use
                  of the platform constitutes acceptance of new fee structures.
                </p>
              </CardContent>
            </Card>

            {/* Section 6 */}
            <Card id="prohibited-items">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>6. Prohibited Items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>
                  The following items are strictly prohibited on Cart Royal:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Illegal drugs, controlled substances, and drug paraphernalia
                  </li>
                  <li>Weapons, ammunition, and explosive materials</li>
                  <li>Counterfeit or replica items</li>
                  <li>Stolen goods or items obtained through illegal means</li>
                  <li>Adult content and services</li>
                  <li>
                    Live animals and animal products from endangered species
                  </li>
                  <li>Hazardous materials and chemicals</li>
                  <li>Items that infringe on intellectual property rights</li>
                  <li>Prescription medications and medical devices</li>
                  <li>Tobacco products and e-cigarettes</li>
                </ul>
                <p>
                  Violation of prohibited items policy may result in immediate
                  account suspension and legal action where applicable.
                </p>
              </CardContent>
            </Card>

            {/* Section 7 */}
            <Card id="intellectual-property">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>7. Intellectual Property</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>You represent and warrant that:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You own or have the right to sell all listed products</li>
                  <li>
                    Your listings do not infringe on any third-party
                    intellectual property rights
                  </li>
                  <li>
                    You have the right to use all images, descriptions, and
                    content in your listings
                  </li>
                  <li>
                    You will not use Cart Royal's trademarks without written
                    permission
                  </li>
                </ul>
                <p>
                  Cart Royal respects intellectual property rights and will
                  respond to valid takedown notices in accordance with
                  applicable laws. Repeat infringers will have their accounts
                  terminated.
                </p>
              </CardContent>
            </Card>

            {/* Section 8 */}
            <Card id="seller-responsibilities">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>8. Seller Responsibilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <p>As a seller, you are responsible for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Maintaining accurate product information and inventory
                  </li>
                  <li>Processing orders promptly and professionally</li>
                  <li>Providing excellent customer service</li>
                  <li>Handling customer inquiries and complaints</li>
                  <li>Complying with all applicable laws and regulations</li>
                  <li>Paying all applicable taxes and fees</li>
                  <li>Maintaining appropriate business licenses and permits</li>
                  <li>Protecting customer data and privacy</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card
              id="contact-information"
              className="border-blue-200 bg-blue-50"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-900">
                  <Info className="w-5 h-5" />
                  <span>15. Contact Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-4">
                  If you have any questions about these Terms and Conditions,
                  please contact us:
                </p>
                <div className="space-y-2 text-blue-800">
                  <p>
                    <strong>Email:</strong> legal@cartroyal.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +234 (0) 800 CART-ROYAL
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Commerce Street, Victoria
                    Island, Lagos, Nigeria
                  </p>
                  <p>
                    <strong>Business Hours:</strong> Monday - Friday, 9:00 AM -
                    6:00 PM (WAT)
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="text-blue-600 border-blue-300 hover:bg-blue-100"
                    >
                      Contact Support Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <Card className="border-gray-200 bg-gray-50">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  These Terms and Conditions are effective as of January 1,
                  2024.
                </p>
                <p className="text-sm text-gray-600">
                  © 2024 Cart Royal. All rights reserved.
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
