"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

const wallets = [
  {
    id: "1",
    name: "Main Checking",
    type: "Bank Account",
    balance: 24580,
    currency: "USD",
    icon: "🏦",
    lastTransaction: "2 hours ago",
    status: "connected",
  },
  {
    id: "2",
    name: "High-Yield Savings",
    type: "Savings Account",
    balance: 85420,
    currency: "USD",
    icon: "💰",
    lastTransaction: "1 day ago",
    status: "connected",
  },
  {
    id: "3",
    name: "Investment Account",
    type: "Brokerage",
    balance: 121080,
    currency: "USD",
    icon: "📈",
    lastTransaction: "3 hours ago",
    status: "connected",
  },
  {
    id: "4",
    name: "Bitcoin Wallet",
    type: "Crypto",
    balance: 12500,
    currency: "BTC",
    icon: "₿",
    lastTransaction: "5 hours ago",
    status: "connected",
  },
  {
    id: "5",
    name: "Emergency Fund",
    type: "Savings Account",
    balance: 15000,
    currency: "USD",
    icon: "🛡️",
    lastTransaction: "1 week ago",
    status: "connected",
  },
];

const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

export default function WalletsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Wallets</h2>
              <p className="text-muted-foreground">
                Manage your connected accounts
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Link Account
            </Button>
          </div>

          {/* Total Balance Card */}
          <Card className="mb-6 bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Total Balance</p>
                  <p className="text-4xl font-bold mt-1">
                    ${totalBalance.toLocaleString()}
                  </p>
                  <p className="text-sm opacity-70 mt-2">
                    {wallets.length} connected accounts
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-0"
                  >
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                    Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wallets Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {wallets.map((wallet) => (
              <Card
                key={wallet.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                        {wallet.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {wallet.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {wallet.type}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-500"
                    >
                      Connected
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold text-foreground">
                        ${wallet.balance.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Last activity: {wallet.lastTransaction}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add Account Card */}
            <Card className="border-dashed hover:border-primary hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground">Link New Account</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect a bank, card, or crypto wallet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
