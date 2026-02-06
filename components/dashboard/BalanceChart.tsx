"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { monthlyChartData, weeklyPerformance } from "@/lib/finance-data";

export function BalanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Portfolio Performance
        </CardTitle>
        <Tabs defaultValue="monthly" className="w-auto">
          <TabsList className="h-8">
            <TabsTrigger value="weekly" className="text-xs px-3">
              7D
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs px-3">
              12M
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsContent value="weekly" className="mt-0">
            <ChartContent data={weeklyPerformance} />
          </TabsContent>
          <TabsContent value="monthly" className="mt-0">
            <ChartContent data={monthlyChartData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function ChartContent({ data }: { data: typeof monthlyChartData }) {
  return (
    <div className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            dx={-10}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground">
                      ${payload[0].value?.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payload[0].payload.date}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
