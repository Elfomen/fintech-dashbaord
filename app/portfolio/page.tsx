"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { portfolioAssets } from "@/lib/finance-data";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function PortfolioPage() {
  const totalValue = portfolioAssets.reduce(
    (acc, asset) => acc + asset.value,
    0,
  );
  const totalChange = portfolioAssets.reduce(
    (acc, asset) => acc + asset.change,
    0,
  );
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="flex min-h-screen bg-background">
      <main className="w-full">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Portfolio</h2>
            <p className="text-muted-foreground">
              Track your investment performance
            </p>
          </div>

          {/* Portfolio Summary */}
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold text-foreground">
                  ${totalValue.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Gain/Loss</p>
                <p
                  className={cn(
                    "text-3xl font-bold",
                    totalChange >= 0 ? "text-emerald-500" : "text-red-500",
                  )}
                >
                  {totalChange >= 0 ? "+" : ""}${totalChange.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Return</p>
                <p
                  className={cn(
                    "text-3xl font-bold",
                    totalChangePercent >= 0
                      ? "text-emerald-500"
                      : "text-red-500",
                  )}
                >
                  {totalChangePercent >= 0 ? "+" : ""}
                  {totalChangePercent.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart and Holdings */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioAssets}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {portfolioAssets.map((asset, index) => (
                          <Cell key={`cell-${index}`} fill={asset.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                                <p className="text-sm font-medium text-foreground">
                                  {data.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  ${data.value.toLocaleString()} (
                                  {data.allocation}%)
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioAssets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                          style={{ backgroundColor: asset.color }}
                        >
                          {asset.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {asset.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {asset.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">
                          ${asset.value.toLocaleString()}
                        </p>
                        <div
                          className={cn(
                            "flex items-center justify-end text-sm",
                            asset.changePercent >= 0
                              ? "text-emerald-500"
                              : "text-red-500",
                          )}
                        >
                          {asset.changePercent >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {asset.changePercent >= 0 ? "+" : ""}
                          {asset.changePercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
