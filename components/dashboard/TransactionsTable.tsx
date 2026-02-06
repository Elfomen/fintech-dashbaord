"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { transactions, type Transaction } from "@/lib/finance-data";
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Investment",
  "Salary",
  "Freelance",
  "Transfer",
];
const statuses = ["All", "completed", "pending", "failed"];
const types = ["All", "income", "expense", "transfer"];

interface TransactionsTableProps {
  limit?: number;
  showFilters?: boolean;
}

export function TransactionsTable({
  limit,
  showFilters = true,
}: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    if (search) {
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (categoryFilter !== "All") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    return limit ? filtered.slice(0, limit) : filtered;
  }, [search, categoryFilter, statusFilter, typeFilter, limit]);

  const getTypeIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "income":
        return <ArrowDownLeft className="h-4 w-4 text-emerald-500" />;
      case "expense":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "transfer":
        return <ArrowLeftRight className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    return (
      <Badge
        variant="secondary"
        className={cn(
          "text-xs",
          status === "completed" && "bg-emerald-500/10 text-emerald-500",
          status === "pending" && "bg-amber-500/10 text-amber-500",
          status === "failed" && "bg-red-500/10 text-red-500",
        )}
      >
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="text-base font-medium">
            Recent Transactions
          </CardTitle>
          {showFilters && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 w-[200px]"
                />
              </div>
            </div>
          )}
        </div>
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type} className="text-xs">
                    {type === "All"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-xs">
                    {cat === "All" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-8 w-[120px] text-xs">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status} className="text-xs">
                    {status === "All"
                      ? "All Status"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">Transaction</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="cursor-pointer">
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      {getTypeIcon(transaction.type)}
                    </div>
                    <span className="font-medium text-foreground">
                      {transaction.description}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.category}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell
                  className={cn(
                    "text-right font-medium pr-6",
                    transaction.amount >= 0
                      ? "text-emerald-500"
                      : "text-foreground",
                  )}
                >
                  {transaction.amount >= 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
