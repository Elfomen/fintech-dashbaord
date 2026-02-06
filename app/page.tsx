import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { MetricCard } from "@/components/dashboard/MetricsCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { DashboardHeader, Sidebar } from "@/components/dashboard/Sidebar";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { dashboardMetrics } from "@/lib/finance-data";

export default function Home() {
  return (
    <main>
      <DashboardHeader />

      <div className="p-6">
        {/* Metrics Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.title} metric={metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <BalanceChart />
          <PortfolioChart />
        </div>

        {/* Second Charts Row */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <IncomeExpenseChart />
          <SpendingChart />
        </div>

        {/* Widgets and Table Row */}
        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <div className="lg:col-span-2">
            <TransactionsTable limit={5} showFilters={false} />
          </div>
        </div>
      </div>
    </main>
  );
}
