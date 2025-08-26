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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  CreditCard,
  DollarSign,
  TrendingUp,
  Download,
  Plus,
  Edit,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Banknote,
  Wallet,
  Building,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatCurrency, formatDate } from "@/lib/utils";

const bankAccountSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 10 digits"),
  accountName: z.string().min(2, "Account name is required"),
  accountType: z.string().min(1, "Account type is required"),
});

const withdrawalSchema = z.object({
  amount: z.number().min(1000, "Minimum withdrawal amount is ₦1,000"),
  bankAccountId: z.string().min(1, "Please select a bank account"),
});

type BankAccountFormData = z.infer<typeof bankAccountSchema>;
type WithdrawalFormData = z.infer<typeof withdrawalSchema>;

// Mock data
const mockFinanceData = {
  totalEarnings: 1250000,
  availableBalance: 850000,
  pendingBalance: 125000,
  totalWithdrawn: 275000,
  monthlyEarnings: [
    { month: "Jan", earnings: 85000, withdrawals: 50000 },
    { month: "Feb", earnings: 92000, withdrawals: 60000 },
    { month: "Mar", earnings: 78000, withdrawals: 45000 },
    { month: "Apr", earnings: 105000, withdrawals: 70000 },
    { month: "May", earnings: 98000, withdrawals: 50000 },
    { month: "Jun", earnings: 112000, withdrawals: 80000 },
  ],
};

const mockBankAccounts = [
  {
    id: "1",
    bankName: "First Bank",
    accountNumber: "1234567890",
    accountName: "John Doe",
    accountType: "Savings",
    isDefault: true,
  },
  {
    id: "2",
    bankName: "GTBank",
    accountNumber: "0987654321",
    accountName: "John Doe",
    accountType: "Current",
    isDefault: false,
  },
];

const mockTransactions = [
  {
    id: "1",
    type: "earning",
    description: "Sale of Nike Air Max 270",
    amount: 85000,
    status: "completed",
    date: "2024-01-20",
  },
  {
    id: "2",
    type: "withdrawal",
    description: "Withdrawal to First Bank",
    amount: -50000,
    status: "completed",
    date: "2024-01-19",
  },
  {
    id: "3",
    type: "earning",
    description: "Sale of iPhone 15 Pro",
    amount: 120000,
    status: "pending",
    date: "2024-01-18",
  },
  {
    id: "4",
    type: "withdrawal",
    description: "Withdrawal to GTBank",
    amount: -75000,
    status: "processing",
    date: "2024-01-17",
  },
  {
    id: "5",
    type: "earning",
    description: "Sale of Samsung Galaxy Watch",
    amount: 32000,
    status: "completed",
    date: "2024-01-16",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case "processing":
      return <Clock className="w-4 h-4 text-blue-500" />;
    case "failed":
      return <XCircle className="w-4 h-4 text-red-500" />;
    default:
      return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "text-green-700 bg-green-50 border-green-200";
    case "pending":
      return "text-yellow-700 bg-yellow-50 border-yellow-200";
    case "processing":
      return "text-blue-700 bg-blue-50 border-blue-200";
    case "failed":
      return "text-red-700 bg-red-50 border-red-200";
    default:
      return "text-gray-700 bg-gray-50 border-gray-200";
  }
};

export default function FinancePage() {
  const [bankAccounts, setBankAccounts] = useState(mockBankAccounts);
  const [transactions, setTransactions] = useState(mockTransactions);
  const [addAccountDialogOpen, setAddAccountDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [timeRange, setTimeRange] = useState("6months");

  const {
    register: registerBankAccount,
    handleSubmit: handleBankAccountSubmit,
    reset: resetBankAccountForm,
    formState: { errors: bankAccountErrors },
  } = useForm<BankAccountFormData>({
    resolver: zodResolver(bankAccountSchema),
  });

  const {
    register: registerWithdrawal,
    handleSubmit: handleWithdrawalSubmit,
    reset: resetWithdrawalForm,
    formState: { errors: withdrawalErrors },
  } = useForm<WithdrawalFormData>({
    resolver: zodResolver(withdrawalSchema),
  });

  const onAddBankAccount = async (data: BankAccountFormData) => {
    setIsAddingAccount(true);
    try {
      // Mock API call
      console.log("Adding bank account:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newAccount = {
        id: Date.now().toString(),
        ...data,
        isDefault: bankAccounts.length === 0,
      };

      setBankAccounts((prev) => [...prev, newAccount]);
      resetBankAccountForm();
      setAddAccountDialogOpen(false);
      alert("Bank account added successfully!");
    } catch (error) {
      console.error("Error adding bank account:", error);
      alert("Failed to add bank account. Please try again.");
    } finally {
      setIsAddingAccount(false);
    }
  };

  const onWithdraw = async (data: WithdrawalFormData) => {
    setIsWithdrawing(true);
    try {
      // Mock API call
      console.log("Processing withdrawal:", data);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const selectedAccount = bankAccounts.find(
        (acc) => acc.id === data.bankAccountId
      );
      const newTransaction = {
        id: Date.now().toString(),
        type: "withdrawal" as const,
        description: `Withdrawal to ${selectedAccount?.bankName}`,
        amount: -data.amount,
        status: "processing" as const,
        date: new Date().toISOString().split("T")[0],
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      resetWithdrawalForm();
      setWithdrawDialogOpen(false);
      alert("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      alert("Failed to process withdrawal. Please try again.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const deleteBankAccount = (accountId: string) => {
    if (confirm("Are you sure you want to delete this bank account?")) {
      setBankAccounts((prev) => prev.filter((acc) => acc.id !== accountId));
    }
  };

  const currentMonthEarnings =
    mockFinanceData.monthlyEarnings[mockFinanceData.monthlyEarnings.length - 1]
      .earnings;
  const previousMonthEarnings =
    mockFinanceData.monthlyEarnings[mockFinanceData.monthlyEarnings.length - 2]
      .earnings;
  const earningsGrowth =
    ((currentMonthEarnings - previousMonthEarnings) / previousMonthEarnings) *
    100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Finance</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your earnings, withdrawals, and payment methods.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(mockFinanceData.totalEarnings)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${
                    earningsGrowth >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {earningsGrowth >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(earningsGrowth).toFixed(1)}% from last month
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(mockFinanceData.availableBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for withdrawal
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Balance
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {formatCurrency(mockFinanceData.pendingBalance)}
              </div>
              <p className="text-xs text-muted-foreground">
                Processing payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Withdrawn
              </CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(mockFinanceData.totalWithdrawn)}
              </div>
              <p className="text-xs text-muted-foreground">
                Lifetime withdrawals
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bank Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>
                    Manage your withdrawal bank accounts
                  </CardDescription>
                </div>
                <Dialog
                  open={addAccountDialogOpen}
                  onOpenChange={setAddAccountDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Account
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Bank Account</DialogTitle>
                      <DialogDescription>
                        Add a new bank account for withdrawals.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleBankAccountSubmit(onAddBankAccount)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Select
                          onValueChange={(value) =>
                            registerBankAccount("bankName").onChange({
                              target: { value },
                            })
                          }
                        >
                          <SelectTrigger
                            className={
                              bankAccountErrors.bankName ? "border-red-500" : ""
                            }
                          >
                            <SelectValue placeholder="Select your bank" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="First Bank">
                              First Bank
                            </SelectItem>
                            <SelectItem value="GTBank">GTBank</SelectItem>
                            <SelectItem value="Access Bank">
                              Access Bank
                            </SelectItem>
                            <SelectItem value="Zenith Bank">
                              Zenith Bank
                            </SelectItem>
                            <SelectItem value="UBA">UBA</SelectItem>
                            <SelectItem value="Fidelity Bank">
                              Fidelity Bank
                            </SelectItem>
                            <SelectItem value="Sterling Bank">
                              Sterling Bank
                            </SelectItem>
                            <SelectItem value="Stanbic IBTC">
                              Stanbic IBTC
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {bankAccountErrors.bankName && (
                          <p className="text-sm text-red-500">
                            {bankAccountErrors.bankName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input
                          id="accountNumber"
                          placeholder="1234567890"
                          {...registerBankAccount("accountNumber")}
                          className={
                            bankAccountErrors.accountNumber
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {bankAccountErrors.accountNumber && (
                          <p className="text-sm text-red-500">
                            {bankAccountErrors.accountNumber.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountName">Account Name</Label>
                        <Input
                          id="accountName"
                          placeholder="John Doe"
                          {...registerBankAccount("accountName")}
                          className={
                            bankAccountErrors.accountName
                              ? "border-red-500"
                              : ""
                          }
                        />
                        {bankAccountErrors.accountName && (
                          <p className="text-sm text-red-500">
                            {bankAccountErrors.accountName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="accountType">Account Type</Label>
                        <Select
                          onValueChange={(value) =>
                            registerBankAccount("accountType").onChange({
                              target: { value },
                            })
                          }
                        >
                          <SelectTrigger
                            className={
                              bankAccountErrors.accountType
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select account type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Savings">Savings</SelectItem>
                            <SelectItem value="Current">Current</SelectItem>
                          </SelectContent>
                        </Select>
                        {bankAccountErrors.accountType && (
                          <p className="text-sm text-red-500">
                            {bankAccountErrors.accountType.message}
                          </p>
                        )}
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAddAccountDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isAddingAccount}>
                          {isAddingAccount ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Account"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{account.bankName}</p>
                        <p className="text-sm text-gray-500">
                          {account.accountNumber} • {account.accountType}
                        </p>
                        <p className="text-sm text-gray-500">
                          {account.accountName}
                        </p>
                        {account.isDefault && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBankAccount(account.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {bankAccounts.length === 0 && (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No bank accounts added yet</p>
                    <p className="text-sm text-gray-400">
                      Add a bank account to start withdrawing funds
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Withdrawal */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Withdrawal</CardTitle>
              <CardDescription>
                Withdraw your available balance to your bank account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Available Balance
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(mockFinanceData.availableBalance)}
                      </p>
                    </div>
                    <Wallet className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <Dialog
                  open={withdrawDialogOpen}
                  onOpenChange={setWithdrawDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={
                        bankAccounts.length === 0 ||
                        mockFinanceData.availableBalance < 1000
                      }
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount you want to withdraw and select your
                        bank account.
                      </DialogDescription>
                    </DialogHeader>
                    <form
                      onSubmit={handleWithdrawalSubmit(onWithdraw)}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="amount">Withdrawal Amount (₦)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="10000"
                          {...registerWithdrawal("amount", {
                            valueAsNumber: true,
                          })}
                          className={
                            withdrawalErrors.amount ? "border-red-500" : ""
                          }
                        />
                        {withdrawalErrors.amount && (
                          <p className="text-sm text-red-500">
                            {withdrawalErrors.amount.message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Available:{" "}
                          {formatCurrency(mockFinanceData.availableBalance)}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bankAccountId">Bank Account</Label>
                        <Select
                          onValueChange={(value) =>
                            registerWithdrawal("bankAccountId").onChange({
                              target: { value },
                            })
                          }
                        >
                          <SelectTrigger
                            className={
                              withdrawalErrors.bankAccountId
                                ? "border-red-500"
                                : ""
                            }
                          >
                            <SelectValue placeholder="Select bank account" />
                          </SelectTrigger>
                          <SelectContent>
                            {bankAccounts.map((account) => (
                              <SelectItem key={account.id} value={account.id}>
                                {account.bankName} - {account.accountNumber}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {withdrawalErrors.bankAccountId && (
                          <p className="text-sm text-red-500">
                            {withdrawalErrors.bankAccountId.message}
                          </p>
                        )}
                      </div>

                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          <strong>Note:</strong> Withdrawals are processed
                          within 1-3 business days. A processing fee of ₦100
                          will be deducted.
                        </p>
                      </div>

                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setWithdrawDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" disabled={isWithdrawing}>
                          {isWithdrawing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Withdraw"
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                {bankAccounts.length === 0 && (
                  <p className="text-sm text-gray-500 text-center">
                    Add a bank account to enable withdrawals
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>
              View all your earnings and withdrawal transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === "earning"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}
                    >
                      {transaction.type === "earning" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <Download className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-gray-500">
                          {formatDate(transaction.date)}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            transaction.status
                          )}`}
                        >
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">
                            {transaction.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}
                      {formatCurrency(Math.abs(transaction.amount))}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
