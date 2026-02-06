"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { spendingByCategory } from "@/lib/finance-data";

const categoryColors: Record<string, string> = {
  Housing: "bg-emerald-500",
  Food: "bg-blue-500",
  Transportation: "bg-purple-500",
  Entertainment: "bg-amber-500",
  Utilities: "bg-cyan-500",
  Healthcare: "bg-rose-500",
  Shopping: "bg-indigo-500",
  Other: "bg-gray-500",
};

export function SpendingChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {spendingByCategory.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.category}</span>
                <span className="text-muted-foreground">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`absolute left-0 top-0 h-full rounded-full ${categoryColors[item.category] || "bg-gray-500"}`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
