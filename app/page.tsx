import { MetricCard } from "@/components/dashboard/MetricsCard";
import { DashboardHeader } from "@/components/dashboard/Sidebar";
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
      </div>
    </main>
  );
}
