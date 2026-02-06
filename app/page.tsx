import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { MetricCard } from "@/components/dashboard/MetricsCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { MarketWidget } from "@/components/dashboard/RealTimeWidgets/MarketWidget";
import { QuickStatsWidget } from "@/components/dashboard/RealTimeWidgets/QuickStatsWidget";
import { RecentActivityWidget } from "@/components/dashboard/RealTimeWidgets/RecentActivityWidget";
import { UpcomingBillsWidget } from "@/components/dashboard/RealTimeWidgets/UpcomingBillsWidget";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { dashboardMetrics } from "@/lib/finance-data";

export default function Home() {
  return (
    <main>
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <BalanceChart />
          <PortfolioChart />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <IncomeExpenseChart />
          <SpendingChart />
        </div>

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <div className="lg:col-span-2">
            <TransactionsTable limit={5} showFilters={false} />
          </div>
          <div className="space-y-4">
            <QuickStatsWidget />
            <MarketWidget />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <UpcomingBillsWidget />
          <RecentActivityWidget />
        </div>
      </div>
    </main>
  );
}
