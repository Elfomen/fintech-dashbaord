"use client";

import { TransactionsTable } from "@/components/dashboard/TransactionsTable";

export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="w-full">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Transactions</h2>
            <p className="text-muted-foreground">
              View and manage all your transactions
            </p>
          </div>
          <TransactionsTable />
        </div>
      </main>
    </div>
  );
}
