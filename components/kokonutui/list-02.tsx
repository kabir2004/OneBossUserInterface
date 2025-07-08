import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ShoppingCart,
  CreditCard,
  type LucideIcon,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  PieChart,
  Target,
  BarChart3,
} from "lucide-react"

interface Transaction {
  id: string
  title: string
  amount: string
  type: "buy" | "sell" | "dividend" | "rebalance" | "client-trade"
  category: string
  icon: LucideIcon
  timestamp: string
  status: "completed" | "pending" | "failed"
  symbol?: string
  shares?: string
}

interface List02Props {
  transactions?: Transaction[]
  className?: string
}

const categoryStyles = {
  stocks: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  etfs: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  "mutual-funds": "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  bonds: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
  rebalancing: "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Buy AAPL",
    amount: "$45,000",
    type: "buy",
    category: "stocks",
    icon: TrendingUp,
    timestamp: "Today, 2:45 PM",
    status: "completed",
    symbol: "AAPL",
    shares: "250 shares @ $180.00",
  },
  {
    id: "2",
    title: "Dividend Payment",
    amount: "$2,847",
    type: "dividend",
    category: "stocks",
    icon: DollarSign,
    timestamp: "Today, 9:00 AM",
    status: "completed",
    symbol: "MSFT",
    shares: "Quarterly dividend",
  },
  {
    id: "3",
    title: "Sell TSLA",
    amount: "$32,500",
    type: "sell",
    category: "stocks",
    icon: TrendingDown,
    timestamp: "Yesterday",
    status: "completed",
    symbol: "TSLA",
    shares: "200 shares @ $162.50",
  },
  {
    id: "4",
    title: "Client Trade - GOOGL",
    amount: "$15,750",
    type: "client-trade",
    category: "stocks",
    icon: Users,
    timestamp: "Yesterday",
    status: "completed",
    symbol: "GOOGL",
    shares: "Client: John Smith",
  },
  {
    id: "5",
    title: "Fund Rebalancing",
    amount: "$28,900",
    type: "rebalance",
    category: "mutual-funds",
    icon: PieChart,
    timestamp: "2 days ago",
    status: "completed",
    symbol: "VTI",
    shares: "Portfolio rebalance",
  },
  {
    id: "6",
    title: "Buy SPY ETF",
    amount: "$67,200",
    type: "buy",
    category: "etfs",
    icon: BarChart3,
    timestamp: "3 days ago",
    status: "completed",
    symbol: "SPY",
    shares: "400 shares @ $168.00",
  },
]

export default function List02({ transactions = TRANSACTIONS, className }: List02Props) {
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white dark:bg-zinc-900/70",
        "border border-zinc-100 dark:border-zinc-800",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Recent Trading Activity
            <span className="text-xs font-normal text-zinc-600 dark:text-zinc-400 ml-1">(47 trades)</span>
          </h2>
          <span className="text-xs text-zinc-600 dark:text-zinc-400">This Week</span>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={cn(
                "group flex items-center gap-3",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  "bg-zinc-100 dark:bg-zinc-800",
                  "border border-zinc-200 dark:border-zinc-700",
                )}
              >
                <transaction.icon className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
              </div>

              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{transaction.title}</h3>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{transaction.timestamp}</p>
                  {transaction.shares && (
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{transaction.shares}</p>
                  )}
                </div>

                <div className="flex items-center gap-1.5 pl-3">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      transaction.type === "buy" || transaction.type === "dividend"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {transaction.type === "buy" || transaction.type === "dividend" ? "+" : "-"}
                    {transaction.amount}
                  </span>
                  {transaction.type === "buy" || transaction.type === "dividend" ? (
                    <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "bg-gradient-to-r from-zinc-900 to-zinc-800",
            "dark:from-zinc-50 dark:to-zinc-200",
            "text-zinc-50 dark:text-zinc-900",
            "hover:from-zinc-800 hover:to-zinc-700",
            "dark:hover:from-zinc-200 dark:hover:to-zinc-300",
            "shadow-sm hover:shadow",
            "transform transition-all duration-200",
            "hover:-translate-y-0.5",
            "active:translate-y-0",
            "focus:outline-none focus:ring-2",
            "focus:ring-zinc-500 dark:focus:ring-zinc-400",
            "focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
          )}
        >
          <span>View All Trades</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
