// Seeded random for deterministic data
function seededRandom(seed: number): () => number {
  return function () {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

export interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  type: "income" | "expense" | "transfer";
}

export interface PortfolioAsset {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  allocation: number;
  color: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  income?: number;
  expenses?: number;
}

export interface MetricData {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: "up" | "down" | "neutral";
}

// Generate transaction history
const categories = [
  "Shopping",
  "Food & Dining",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Investment",
  "Salary",
  "Freelance",
  "Transfer",
];
const merchants = [
  "Amazon",
  "Uber Eats",
  "Netflix",
  "Spotify",
  "Electric Company",
  "Gas Station",
  "Grocery Store",
  "Coffee Shop",
  "Restaurant",
  "Online Store",
  "Pharmacy",
  "Bank Transfer",
  "Client Payment",
  "Monthly Salary",
];

export const transactions: Transaction[] = Array.from(
  { length: 50 },
  (_, i) => {
    const random = seededRandom(i * 100);
    const isIncome = random() > 0.7;
    const isTransfer = !isIncome && random() > 0.85;
    const type: Transaction["type"] = isIncome
      ? "income"
      : isTransfer
        ? "transfer"
        : "expense";

    const amount = isIncome
      ? Math.floor(random() * 5000) + 500
      : Math.floor(random() * 500) + 10;

    const daysAgo = Math.floor(random() * 30);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const statusRand = random();
    const status: Transaction["status"] =
      statusRand > 0.1 ? "completed" : statusRand > 0.05 ? "pending" : "failed";

    return {
      id: `txn-${i + 1}`,
      description: merchants[Math.floor(random() * merchants.length)],
      category: categories[Math.floor(random() * categories.length)],
      amount: type === "expense" ? -amount : amount,
      date: date.toISOString().split("T")[0],
      status,
      type,
    };
  },
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Portfolio assets
export const portfolioAssets: PortfolioAsset[] = [
  {
    id: "1",
    name: "US Stocks",
    symbol: "VTI",
    value: 45230,
    change: 1250,
    changePercent: 2.84,
    allocation: 35,
    color: "#10b981",
  },
  {
    id: "2",
    name: "International",
    symbol: "VXUS",
    value: 28150,
    change: -420,
    changePercent: -1.47,
    allocation: 22,
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Bonds",
    symbol: "BND",
    value: 19800,
    change: 180,
    changePercent: 0.92,
    allocation: 15,
    color: "#8b5cf6",
  },
  {
    id: "4",
    name: "Real Estate",
    symbol: "VNQ",
    value: 15400,
    change: 620,
    changePercent: 4.19,
    allocation: 12,
    color: "#f59e0b",
  },
  {
    id: "5",
    name: "Crypto",
    symbol: "BTC",
    value: 12500,
    change: 2100,
    changePercent: 20.19,
    allocation: 10,
    color: "#ef4444",
  },
  {
    id: "6",
    name: "Cash",
    symbol: "USD",
    value: 7800,
    change: 0,
    changePercent: 0,
    allocation: 6,
    color: "#6b7280",
  },
];

// Generate chart data for the past 12 months
export const monthlyChartData: ChartDataPoint[] = Array.from(
  { length: 12 },
  (_, i) => {
    const random = seededRandom(i * 500);
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));

    const baseValue = 100000 + i * 5000;
    const variance = (random() - 0.5) * 20000;

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      value: Math.floor(baseValue + variance),
      income: Math.floor(8000 + random() * 4000),
      expenses: Math.floor(5000 + random() * 3000),
    };
  },
);

// Weekly performance data
export const weeklyPerformance: ChartDataPoint[] = Array.from(
  { length: 7 },
  (_, i) => {
    const random = seededRandom(i * 200);
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      value: Math.floor(128000 + (random() - 0.5) * 5000),
      income: Math.floor(1500 + random() * 500),
      expenses: Math.floor(800 + random() * 400),
    };
  },
);

// Dashboard metrics
export const dashboardMetrics: MetricData[] = [
  {
    title: "Total Balance",
    value: "$128,880",
    change: 12.5,
    changeLabel: "vs last month",
    trend: "up",
  },
  {
    title: "Monthly Income",
    value: "$12,450",
    change: 8.2,
    changeLabel: "vs last month",
    trend: "up",
  },
  {
    title: "Monthly Expenses",
    value: "$6,280",
    change: -3.1,
    changeLabel: "vs last month",
    trend: "down",
  },
  {
    title: "Investments",
    value: "$121,080",
    change: 15.3,
    changeLabel: "YTD return",
    trend: "up",
  },
];

// Category spending breakdown
export const spendingByCategory = [
  { category: "Housing", amount: 2100, percentage: 33.4 },
  { category: "Food", amount: 850, percentage: 13.5 },
  { category: "Transportation", amount: 620, percentage: 9.9 },
  { category: "Entertainment", amount: 480, percentage: 7.6 },
  { category: "Utilities", amount: 380, percentage: 6.0 },
  { category: "Healthcare", amount: 320, percentage: 5.1 },
  { category: "Shopping", amount: 780, percentage: 12.4 },
  { category: "Other", amount: 750, percentage: 11.9 },
];

// Real-time market data simulation
export const marketIndicators = [
  {
    name: "S&P 500",
    value: "5,234.18",
    change: "+0.82%",
    trend: "up" as const,
  },
  {
    name: "NASDAQ",
    value: "16,428.82",
    change: "+1.24%",
    trend: "up" as const,
  },
  { name: "DOW", value: "39,512.84", change: "-0.15%", trend: "down" as const },
  {
    name: "BTC/USD",
    value: "67,842.50",
    change: "+3.42%",
    trend: "up" as const,
  },
];

// Upcoming bills
export const upcomingBills = [
  {
    id: "1",
    name: "Rent",
    amount: 2100,
    dueDate: "2026-02-01",
    status: "upcoming" as const,
  },
  {
    id: "2",
    name: "Electric Bill",
    amount: 145,
    dueDate: "2026-02-05",
    status: "upcoming" as const,
  },
  {
    id: "3",
    name: "Internet",
    amount: 79,
    dueDate: "2026-02-10",
    status: "upcoming" as const,
  },
  {
    id: "4",
    name: "Phone",
    amount: 85,
    dueDate: "2026-02-15",
    status: "upcoming" as const,
  },
  {
    id: "5",
    name: "Insurance",
    amount: 320,
    dueDate: "2026-02-20",
    status: "upcoming" as const,
  },
];

// Recent activity for real-time widget
export const recentActivity = [
  {
    id: "1",
    type: "deposit",
    description: "Direct Deposit",
    amount: 4500,
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "withdrawal",
    description: "ATM Withdrawal",
    amount: -200,
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "payment",
    description: "Credit Card Payment",
    amount: -1250,
    time: "1 day ago",
  },
  {
    id: "4",
    type: "transfer",
    description: "Transfer to Savings",
    amount: -500,
    time: "2 days ago",
  },
  {
    id: "5",
    type: "dividend",
    description: "Dividend Payment",
    amount: 125,
    time: "3 days ago",
  },
];
