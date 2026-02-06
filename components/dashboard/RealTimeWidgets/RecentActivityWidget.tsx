"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { recentActivity } from "@/lib/finance-data";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

export function RecentActivityWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Recent Activity
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    activity.amount >= 0 ? "bg-emerald-500/10" : "bg-muted",
                  )}
                >
                  {activity.amount >= 0 ? (
                    <ArrowDownLeft className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  activity.amount >= 0 ? "text-emerald-500" : "text-foreground",
                )}
              >
                {activity.amount >= 0 ? "+" : ""}$
                {Math.abs(activity.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
