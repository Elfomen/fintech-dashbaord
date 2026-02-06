"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { marketIndicators } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { RefreshCw, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function MarketWidget() {
  const [markets, setMarkets] = useState(marketIndicators);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const seed = Date.now();
      setMarkets((prev) =>
        prev.map((market, i) => {
          const changeValue = (seededRandom(seed + i) - 0.5) * 0.5;
          const currentChange = parseFloat(
            market.change.replace("%", "").replace("+", ""),
          );
          const newChange = currentChange + changeValue;
          return {
            ...market,
            change: `${newChange >= 0 ? "+" : ""}${newChange.toFixed(2)}%`,
            trend: newChange >= 0 ? ("up" as const) : ("down" as const),
          };
        }),
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Market Overview
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RefreshCw className="h-3 w-3 animate-spin" />
            <span>Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {markets.map((market) => (
            <div
              key={market.name}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {market.name}
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {market.value}
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium",
                  market.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-red-500/10 text-red-500",
                )}
              >
                {market.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {market.change}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </CardContent>
    </Card>
  );
}
