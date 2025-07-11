"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Users, PieChart, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface AccountItem {
  id: string
  title: string
  description?: string
  balance: string
  type: "portfolio" | "mutual-fund" | "client" | "trading" | "retirement"
  change?: string
  isPositive?: boolean
  clientCount?: number
  totalAssets?: string
  lastUpdated?: string
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
    clientCount: 23,
    totalAssets: "$847,392",
    lastUpdated: "2024-01-09"
  },
  {
    id: "2",
    title: "Conservative Fund",
    description: "Bonds & Blue Chips",
    balance: "$623,150",
    type: "mutual-fund",
    change: "+8.2%",
    isPositive: true,
    clientCount: 18,
    totalAssets: "$623,150",
    lastUpdated: "2024-01-09"
  },
  {
    id: "3",
    title: "Client Accounts",
    description: "47 Active Clients",
    balance: "$1,376,850",
    type: "client",
    change: "+15.1%",
    isPositive: true,
    clientCount: 47,
    totalAssets: "$1,376,850",
    lastUpdated: "2024-01-09"
  },
  {
    id: "4",
    title: "Trading Account",
    description: "Active Trading",
    balance: "$892,000",
    type: "trading",
    change: "-2.1%",
    isPositive: false,
    clientCount: 12,
    totalAssets: "$892,000",
    lastUpdated: "2024-01-09"
  },
  {
    id: "5",
    title: "Retirement Fund",
    description: "401(k) & IRA",
    balance: "$456,000",
    type: "retirement",
    change: "+6.8%",
    isPositive: true,
    clientCount: 31,
    totalAssets: "$456,000",
    lastUpdated: "2024-01-09"
  },
]

export default function List01({ totalBalance = "$4,195,392", accounts = ACCOUNTS, className }: List01Props) {
  const router = useRouter()
  
  const handleAccountClick = (accountId: string) => {
    // Navigate to portfolio page with account parameter
    router.push(`/portfolio?account=${accountId}`)
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
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-600">Total Assets Under Management</p>
        <h1 className="text-2xl font-semibold text-zinc-900">{totalBalance}</h1>
        <p className="text-xs text-emerald-600 mt-1">+11.2% this month</p>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900">Investment Plans</h2>
          <span className="text-xs text-zinc-600">{accounts.length} Plans</span>
        </div>

        <div className="space-y-1">
          {accounts.map((account) => (
            <div
              key={account.id}
              onClick={() => handleAccountClick(account.id)}
              className={cn(
                "group flex items-center justify-between",
                "p-2 rounded-lg",
                "hover:bg-zinc-100",
                "transition-all duration-200",
                "cursor-pointer",
                "hover:shadow-sm",
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn("p-1.5 rounded-lg", {
                    "bg-emerald-100": account.type === "portfolio",
                    "bg-blue-100": account.type === "mutual-fund",
                    "bg-purple-100": account.type === "client",
                    "bg-orange-100": account.type === "trading",
                    "bg-indigo-100": account.type === "retirement",
                  })}
                >
                  {account.type === "portfolio" && (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                  {account.type === "mutual-fund" && <PieChart className="w-3.5 h-3.5 text-blue-600" />}
                  {account.type === "client" && (
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                  )}
                  {account.type === "trading" && <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />}
                  {account.type === "retirement" && <Target className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div>
                  <h3 className="text-xs font-medium text-zinc-900">{account.title}</h3>
                  {account.description && (
                    <p className="text-[11px] text-zinc-600">{account.description}</p>
                  )}
                  {account.clientCount && (
                    <p className="text-[10px] text-zinc-500">{account.clientCount} clients</p>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-medium text-zinc-900">{account.balance}</span>
                {account.change && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {account.isPositive ? (
                      <ArrowUpRight className="w-2.5 h-2.5 text-emerald-600" />
                    ) : (
                      <ArrowDownLeft className="w-2.5 h-2.5 text-red-600" />
                    )}
                    <span className={`text-[10px] font-medium ${account.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {account.change}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
