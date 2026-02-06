"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MetricData } from "@/lib/finance-data";

interface MetricCardProps {
  metric: MetricData;
  className?: string;
}

export function MetricCard({ metric, className }: MetricCardProps) {
  const TrendIcon =
    metric.trend === "up"
      ? TrendingUp
      : metric.trend === "down"
        ? TrendingDown
        : Minus;

  return (
    <Card className={cn("bg-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </p>
            <p className="text-2xl font-bold text-foreground">{metric.value}</p>
          </div>
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              metric.trend === "up" && "bg-emerald-500/10 text-emerald-500",
              metric.trend === "down" && "bg-red-500/10 text-red-500",
              metric.trend === "neutral" && "bg-muted text-muted-foreground",
            )}
          >
            <TrendIcon className="h-3 w-3" />
            <span>
              {metric.change > 0 ? "+" : ""}
              {metric.change}%
            </span>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {metric.changeLabel}
        </p>
      </CardContent>
    </Card>
  );
}
