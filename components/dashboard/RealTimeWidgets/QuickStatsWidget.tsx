"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "../../ui/Card";

export function QuickStatsWidget() {
  const [animatedValues, setAnimatedValues] = useState({
    balance: 0,
    income: 0,
    savings: 0,
  });

  useEffect(() => {
    const targets = { balance: 128880, income: 12450, savings: 6170 };
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues({
        balance: Math.floor(targets.balance * easeOut),
        income: Math.floor(targets.income * easeOut),
        savings: Math.floor(targets.savings * easeOut),
      });

      if (step >= steps) {
        clearInterval(interval);
        setAnimatedValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-6">
        <p className="text-sm opacity-80">Total Balance</p>
        <p className="text-3xl font-bold mt-1">
          ${animatedValues.balance.toLocaleString()}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div>
            <p className="text-xs opacity-70">Monthly Income</p>
            <p className="text-lg font-semibold">
              ${animatedValues.income.toLocaleString()}
            </p>
          </div>
          <div className="h-8 w-px bg-primary-foreground/20" />
          <div>
            <p className="text-xs opacity-70">Monthly Savings</p>
            <p className="text-lg font-semibold">
              ${animatedValues.savings.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
