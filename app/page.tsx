import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { MetricCard } from "@/components/dashboard/MetricsCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { DashboardHeader, Sidebar } from "@/components/dashboard/Sidebar";
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
      </div>
    </main>
  );
}
