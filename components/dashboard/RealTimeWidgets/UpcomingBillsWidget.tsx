"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { upcomingBills } from "@/lib/finance-data";
import { Calendar, DollarSign } from "lucide-react";

export function UpcomingBillsWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Upcoming Bills
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingBills.map((bill) => {
            const dueDate = new Date(bill.dueDate);
            const today = new Date();
            const daysUntil = Math.ceil(
              (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
            );

            return (
              <div
                key={bill.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {bill.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Due in {daysUntil} days
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  ${bill.amount.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
