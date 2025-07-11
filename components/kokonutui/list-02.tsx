"use client"

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
import { useRouter } from "next/navigation"

interface Transaction {
  id: string
  title: string
  amount: string
  type: "buy" | "sell" | "dividend" | "rebalance" | "client-trade" | "contribution" | "interest"
  category: string
  icon: string | LucideIcon
  timestamp: string
  status: "completed" | "pending" | "failed"
  symbol?: string
  shares?: string
  account?: string
  plan?: string
}

interface List02Props {
  transactions?: Transaction[]
  className?: string
}

const categoryStyles = {
  stocks: "bg-zinc-100 text-zinc-900",
  etfs: "bg-zinc-100 text-zinc-900",
  "mutual-funds": "bg-zinc-100 text-zinc-900",
  bonds: "bg-zinc-100 text-zinc-900",
  rebalancing: "bg-zinc-100 text-zinc-900",
  "fixed income": "bg-zinc-100 text-zinc-900",
  tfsa: "bg-zinc-100 text-zinc-900",
  fund: "bg-zinc-100 text-zinc-900",
}

// Icon mapping for string identifiers
const iconMap: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "dollar-sign": DollarSign,
  "users": Users,
  "pie-chart": PieChart,
  "bar-chart-3": BarChart3,
  "target": Target,
  "wallet": Wallet,
  "shopping-cart": ShoppingCart,
  "credit-card": CreditCard,
}

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Buy AAPL",
    amount: "$45,000",
    type: "buy",
    category: "stocks",
    icon: "trending-up",
    timestamp: "Today, 2:45 PM",
    status: "completed",
    symbol: "AAPL",
    shares: "250 shares @ $180.00",
    plan: "Growth Portfolio"
  },
  {
    id: "2",
    title: "Dividend Payment",
    amount: "$2,847",
    type: "dividend",
    category: "stocks",
    icon: "dollar-sign",
    timestamp: "Today, 9:00 AM",
    status: "completed",
    symbol: "MSFT",
    shares: "Quarterly dividend",
    plan: "Conservative Fund"
  },
  {
    id: "3",
    title: "Sell TSLA",
    amount: "$32,500",
    type: "sell",
    category: "stocks",
    icon: "trending-down",
    timestamp: "Yesterday",
    status: "completed",
    symbol: "TSLA",
    shares: "200 shares @ $162.50",
    plan: "Growth Portfolio"
  },
  {
    id: "4",
    title: "Client Trade - GOOGL",
    amount: "$15,750",
    type: "client-trade",
    category: "stocks",
    icon: "users",
    timestamp: "Yesterday",
    status: "completed",
    symbol: "GOOGL",
    shares: "Client: John Smith",
    plan: "Conservative Fund"
  },
  {
    id: "5",
    title: "Fund Rebalancing",
    amount: "$28,900",
    type: "rebalance",
    category: "mutual-funds",
    icon: "pie-chart",
    timestamp: "2 days ago",
    status: "completed",
    symbol: "VTI",
    shares: "Portfolio rebalance",
    plan: "Retirement Fund"
  },
  {
    id: "6",
    title: "Buy SPY ETF",
    amount: "$67,200",
    type: "buy",
    category: "etfs",
    icon: "bar-chart-3",
    timestamp: "3 days ago",
    status: "completed",
    symbol: "SPY",
    shares: "400 shares @ $168.00",
    plan: "Growth Portfolio"
  },
]

export default function List02({ transactions = TRANSACTIONS, className }: List02Props) {
  const router = useRouter()

  const handleTransactionClick = (transaction: Transaction) => {
    // Navigate to portfolio page when a transaction is clicked
    router.push('/portfolio')
  }

  const formatTimestamp = (timestamp: string) => {
    // Convert YYYY-MM-DD format to relative time
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Today"
    if (diffDays === 2) return "Yesterday"
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    return date.toLocaleDateString()
  }

  const getIconComponent = (icon: string | LucideIcon) => {
    if (typeof icon === 'string') {
      return iconMap[icon] || DollarSign
    }
    return icon
  }

  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "bg-white",
        "border border-zinc-100",
        "rounded-xl shadow-sm backdrop-blur-xl",
        className,
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-900">
            Recent Trading Activity
            <span className="text-xs font-normal text-zinc-600 ml-1">({transactions.length} trades)</span>
          </h2>
          <span className="text-xs text-zinc-600">This Week</span>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => {
            const IconComponent = getIconComponent(transaction.icon)
            return (
              <div
                key={transaction.id}
                className={cn(
                  "group flex items-center gap-3",
                  "p-2 rounded-lg",
                  "hover:bg-zinc-100 cursor-pointer",
                  "transition-all duration-200",
                )}
                onClick={() => handleTransactionClick(transaction)}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    "bg-zinc-100",
                    "border border-zinc-200",
                  )}
                >
                  <IconComponent className="w-4 h-4 text-zinc-900" />
                </div>

                <div className="flex-1 flex items-center justify-between min-w-0">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-medium text-zinc-900">{transaction.title}</h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] text-zinc-600">{formatTimestamp(transaction.timestamp)}</p>
                      {transaction.plan && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                          {transaction.plan}
                        </span>
                      )}
                    </div>
                    {transaction.shares && (
                      <p className="text-[10px] text-zinc-500">{transaction.shares}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pl-3">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        transaction.type === "buy" || transaction.type === "dividend" || transaction.type === "contribution" || transaction.type === "interest"
                          ? "text-emerald-600"
                          : "text-red-600",
                      )}
                    >
                      {transaction.type === "buy" || transaction.type === "dividend" || transaction.type === "contribution" || transaction.type === "interest" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                    {transaction.type === "buy" || transaction.type === "dividend" || transaction.type === "contribution" || transaction.type === "interest" ? (
                      <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-2 border-t border-zinc-100">
        <button
          type="button"
          className={cn(
            "w-full flex items-center justify-center gap-2",
            "py-2 px-3 rounded-lg",
            "text-xs font-medium",
            "text-zinc-600 hover:text-zinc-900",
            "hover:bg-zinc-100",
            "transition-all duration-200",
          )}
          onClick={() => router.push('/portfolio')}
        >
          View All Activity
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
