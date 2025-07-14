"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownLeft, TrendingUp, Users, PieChart, Target } from "lucide-react"
import { useRouter } from "next/navigation"

interface AccountItem {
  id: string
  title: string
  description?: string
  balance: string
  type: "portfolio" | "mutual-fund" | "client" | "trading" | "retirement" | "tfsa" | "rrsp" | "resp" | "rdsp" | "rrif"
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
    id: "070G225184",
    title: "070225184",
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Estate)",
    balance: "$14,582.16",
    type: "tfsa",
    change: "+1.99%",
    isPositive: true,
    clientCount: 1,
    totalAssets: "$14,582.16",
    lastUpdated: "2024-01-09"
  },
  {
    id: "070G225194",
    title: "070225194",
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Estate)",
    balance: "$77,477.32",
    type: "rrsp",
    change: "+1.62%",
    isPositive: true,
    clientCount: 1,
    totalAssets: "$77,477.32",
    lastUpdated: "2024-01-09"
  },
  {
    id: "1",
    title: "001000001",
    description: "Registered Education Savings Plan (RESP) • (Beneficiary: Individual)",
    balance: "$847,392",
    type: "resp",
    change: "+12.4%",
    isPositive: true,
    clientCount: 23,
    totalAssets: "$847,392",
    lastUpdated: "2024-01-09"
  },
  {
    id: "2",
    title: "002000001",
    description: "Registered Disability Savings Plan (RDSP) • (Beneficiary: Individual)",
    balance: "$623,150",
    type: "rdsp",
    change: "+8.2%",
    isPositive: true,
    clientCount: 18,
    totalAssets: "$623,150",
    lastUpdated: "2024-01-09"
  },
  {
    id: "3",
    title: "003000001",
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Multiple Clients)",
    balance: "$1,376,850",
    type: "tfsa",
    change: "+15.1%",
    isPositive: true,
    clientCount: 47,
    totalAssets: "$1,376,850",
    lastUpdated: "2024-01-09"
  },
  {
    id: "4",
    title: "004000001",
    description: "Registered Retirement Income Fund (RRIF) • (Beneficiary: Individual)",
    balance: "$892,000",
    type: "rrif",
    change: "-2.1%",
    isPositive: false,
    clientCount: 12,
    totalAssets: "$892,000",
    lastUpdated: "2024-01-09"
  },
  {
    id: "5",
    title: "005000001",
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Individual)",
    balance: "$456,000",
    type: "rrsp",
    change: "+6.8%",
    isPositive: true,
    clientCount: 31,
    totalAssets: "$456,000",
    lastUpdated: "2024-01-09"
  },
]

export default function List01({ totalBalance = "$4,287,451", accounts = ACCOUNTS, className }: List01Props) {
  const router = useRouter()
  
  const handleAccountClick = (accountId: string) => {
    // Navigate to portfolio page with account parameter
    router.push(`/portfolio?account=${accountId}`)
  }
  return (
    <div
      className={cn(
        "w-full max-w-xl mx-auto",
        "card-elevated",
        className,
      )}
    >
      {/* Total Balance Section */}
      <div className="p-4 border-b border-zinc-100">
        <p className="text-xs text-zinc-600">Total Assets Under Management</p>
        <h1 className="text-heading-1 text-zinc-900">{totalBalance}</h1>
        <p className="text-xs text-emerald-600 mt-1">+11.2% this month</p>
      </div>

      {/* Accounts List */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium text-zinc-900">Investment Accounts</h2>
          <span className="text-xs text-zinc-600">{accounts.length} Accounts</span>
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
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100">
                  {account.type === "tfsa" && <PieChart className="w-4 h-4 text-zinc-600" />}
                  {account.type === "rrsp" && <PieChart className="w-4 h-4 text-zinc-600" />}
                  {account.type === "resp" && <PieChart className="w-4 h-4 text-zinc-600" />}
                  {account.type === "rdsp" && <PieChart className="w-4 h-4 text-zinc-600" />}
                  {account.type === "rrif" && <PieChart className="w-4 h-4 text-zinc-600" />}
                  {account.type === "portfolio" && <TrendingUp className="w-4 h-4 text-zinc-600" />}
                  {account.type === "mutual-fund" && <Target className="w-4 h-4 text-zinc-600" />}
                  {account.type === "client" && <Users className="w-4 h-4 text-zinc-600" />}
                  {account.type === "trading" && <ArrowUpRight className="w-4 h-4 text-zinc-600" />}
                  {account.type === "retirement" && <PieChart className="w-4 h-4 text-zinc-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">{account.title}</p>
                  <p className="text-xs text-zinc-600">{account.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-zinc-900">{account.balance}</p>
                <div className="flex items-center gap-1">
                  {account.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <ArrowDownLeft className="w-3 h-3 text-red-600" />
                  )}
                  <span
                    className={cn(
                      "text-xs",
                      account.isPositive ? "text-emerald-600" : "text-red-600"
                    )}
                  >
                    {account.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
