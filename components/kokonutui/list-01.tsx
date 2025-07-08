import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownLeft, Wallet, SendHorizontal, QrCode, Plus, ArrowRight, CreditCard, TrendingUp, Users, PieChart, Target } from "lucide-react"

interface AccountItem {
  id: string
  title: string
  description?: string
  balance: string
  type: "portfolio" | "mutual-fund" | "client" | "trading" | "retirement"
  change?: string
  isPositive?: boolean
}

interface List01Props {
  totalBalance?: string
  accounts?: AccountItem[]
  className?: string
}

const ACCOUNTS: AccountItem[] = [
  {
    id: "1",
    title: "Growth Portfolio",
    description: "Tech & Growth Stocks",
    balance: "$847,392",
    type: "portfolio",
    change: "+12.4%",
    isPositive: true,
  },
  {
    id: "2",
    title: "Conservative Fund",
    description: "Bonds & Blue Chips",
    balance: "$623,150",
    type: "mutual-fund",
    change: "+8.2%",
    isPositive: true,
  },
  {
    id: "3",
    title: "Client Accounts",
    description: "47 Active Clients",
    balance: "$1,376,850",
    type: "client",
    change: "+15.1%",
    isPositive: true,
  },
  {
    id: "4",
    title: "Trading Account",
    description: "Active Trading",
    balance: "$892,000",
    type: "trading",
    change: "-2.1%",
    isPositive: false,
  },
  {
    id: "5",
    title: "Retirement Fund",
    description: "401(k) & IRA",
    balance: "$456,000",
    type: "retirement",
    change: "+6.8%",
    isPositive: true,
  },
]

export default function List01({ totalBalance = "$4,195,392", accounts = ACCOUNTS, className }: List01Props) {
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
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
        <p className="text-xs text-zinc-600 dark:text-zinc-400">Total Portfolio Value</p>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{totalBalance}</h1>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+11.2% this month</p>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">Investment Accounts</h2>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                "transition-all duration-200",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100 dark:bg-emerald-900/30": account.type === "portfolio",
                    "bg-blue-100 dark:bg-blue-900/30": account.type === "mutual-fund",
                    "bg-purple-100 dark:bg-purple-900/30": account.type === "client",
                    "bg-orange-100 dark:bg-orange-900/30": account.type === "trading",
                    "bg-indigo-100 dark:bg-indigo-900/30": account.type === "retirement",
                  })}
                >
                  {account.type === "portfolio" && (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {account.type === "mutual-fund" && <PieChart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  {account.type === "client" && (
                    <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  )}
                  {account.type === "trading" && <ArrowUpRight className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />}
                  {account.type === "retirement" && <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.title}</h3>
                  {account.description && (
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400">{account.description}</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{account.balance}</span>
                {account.change && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {account.isPositive ? (
                      <ArrowUpRight className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ArrowDownLeft className="w-2.5 h-2.5 text-red-600 dark:text-red-400" />
                    )}
                    <span className={`text-[10px] font-medium ${account.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {account.change}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Updated footer with portfolio management actions */}
      <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Trade</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Clients</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Allocate</span>
          </button>
          <button
            type="button"
            className={cn(
              "flex items-center justify-center gap-2",
              "py-2 px-3 rounded-lg",
              "text-xs font-medium",
              "bg-zinc-900 dark:bg-zinc-50",
              "text-zinc-50 dark:text-zinc-900",
              "hover:bg-zinc-800 dark:hover:bg-zinc-200",
              "shadow-sm hover:shadow",
              "transition-all duration-200",
            )}
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>More</span>
          </button>
        </div>
      </div>
    </div>
  )
}
