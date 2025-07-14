import { Calendar, CreditCard, Wallet } from "lucide-react"
import List01 from "./list-01"
import List02 from "./list-02"
import List03 from "./list-03"

// Define the data directly to avoid import issues
const ASSET_DATA = {
  "FID-2302": {
    id: "FID-2302",
    name: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
    symbol: "FGIB",
    assetClass: "Fixed Income",
    transactions: [
      { date: "2024-01-08", type: "Buy", units: "25.5000", price: "$14.05", amount: "$358.28", status: "Settled" },
      { date: "2024-01-05", type: "Dividend", units: "0.0000", price: "$0.00", amount: "$12.45", status: "Settled" },
      { date: "2023-12-28", type: "Buy", units: "50.0000", price: "$13.98", amount: "$699.00", status: "Settled" },
      { date: "2023-12-15", type: "Buy", units: "121.4722", price: "$14.12", amount: "$1,714.73", status: "Settled" }
    ]
  }
}

const TFSA_DATA = {
  "070G225184": {
    id: "070G225184",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    accountType: "Tax-Free Savings Account (TFSA)",
    transactions: [
      { date: "2024-01-08", type: "Buy", security: "FGIB", units: "25.5000", price: "$14.05", amount: "$358.28" },
      { date: "2024-01-05", type: "Dividend", security: "FGIB", units: "0.0000", price: "$0.00", amount: "$12.45" },
      { date: "2023-12-28", type: "Buy", security: "FGID", units: "50.0000", price: "$13.98", amount: "$699.00" },
      { date: "2023-12-15", type: "Contribution", security: "Cash", units: "0.0000", price: "$0.00", amount: "$2,000.00" }
    ]
  },
  "070G225194": {
    id: "070G225194", 
    name: "TFSA Client Name, Individual Data Entry Wizard",
    accountType: "Tax-Free Savings Account (TFSA)",
    transactions: [
      { date: "2024-01-01", type: "Contribution", security: "Cash", units: "0.0000", price: "$0.00", amount: "$7,000.00" },
      { date: "2023-12-31", type: "Interest", security: "Cash", units: "0.0000", price: "$0.00", amount: "$156.43" }
    ]
  }
}

// Comprehensive Investment Plans Data
const INVESTMENT_PLANS = {
  "070G225184": {
    id: "070G225184",
    type: "tfsa",
    title: "070225184",
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Estate)",
    balance: "$14,582.16",
    change: "+1.99%",
    isPositive: true,
    accounts: ["070G225184"],
    clientCount: 1,
    totalAssets: "$14,582.16",
    lastUpdated: "2024-01-09"
  },
  "070G225194": {
    id: "070G225194", 
    type: "rrsp",
    title: "070225194",
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Estate)",
    balance: "$77,477.32",
    change: "+1.62%",
    isPositive: true,
    accounts: ["070G225194"],
    clientCount: 1,
    totalAssets: "$77,477.32",
    lastUpdated: "2024-01-09"
  },
  "1": {
    id: "1",
    type: "resp", 
    title: "001000001",
    description: "Registered Education Savings Plan (RESP) • (Beneficiary: Individual)",
    balance: "$847,392",
    change: "+12.4%",
    isPositive: true,
    accounts: ["1"],
    clientCount: 1,
    totalAssets: "$847,392",
    lastUpdated: "2024-01-09"
  },
  "2": {
    id: "2",
    type: "rdsp",
    title: "002000001",
    description: "Registered Disability Savings Plan (RDSP) • (Beneficiary: Individual)",
    balance: "$623,150",
    change: "+8.2%",
    isPositive: true,
    accounts: ["2"],
    clientCount: 1,
    totalAssets: "$623,150",
    lastUpdated: "2024-01-09"
  },
  "3": {
    id: "3",
    type: "tfsa",
    title: "003000001",
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Multiple Clients)",
    balance: "$1,376,850",
    change: "+15.1%",
    isPositive: true,
    accounts: ["3"],
    clientCount: 1,
    totalAssets: "$1,376,850",
    lastUpdated: "2024-01-09"
  },
  "4": {
    id: "4",
    type: "rrif",
    title: "004000001",
    description: "Registered Retirement Income Fund (RRIF) • (Beneficiary: Individual)",
    balance: "$892,000",
    change: "-2.1%",
    isPositive: false,
    accounts: ["4"],
    clientCount: 1,
    totalAssets: "$892,000",
    lastUpdated: "2024-01-09"
  },
  "5": {
    id: "5",
    type: "rrsp",
    title: "005000001",
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Individual)",
    balance: "$456,000",
    change: "+6.8%",
    isPositive: true,
    accounts: ["5"],
    clientCount: 1,
    totalAssets: "$456,000",
    lastUpdated: "2024-01-09"
  }
}

// Plan/Account associations
const PLAN_ACCOUNTS = {
  "070G225184": {
    id: "070G225184",
    type: "tfsa",
    accounts: ["070G225184"],
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Estate)"
  },
  "070G225194": {
    id: "070G225194", 
    type: "rrsp",
    accounts: ["070G225194"],
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Estate)"
  },
  "1": {
    id: "1",
    type: "resp", 
    accounts: ["1"],
    description: "Registered Education Savings Plan (RESP) • (Beneficiary: Individual)"
  },
  "2": {
    id: "2",
    type: "rdsp",
    accounts: ["2"],
    description: "Registered Disability Savings Plan (RDSP) • (Beneficiary: Individual)"
  },
  "3": {
    id: "3",
    type: "tfsa",
    accounts: ["3"],
    description: "Tax-Free Savings Account (TFSA) • (Beneficiary: Multiple Clients)"
  },
  "4": {
    id: "4",
    type: "rrif",
    accounts: ["4"],
    description: "Registered Retirement Income Fund (RRIF) • (Beneficiary: Individual)"
  },
  "5": {
    id: "5",
    type: "rrsp",
    accounts: ["5"],
    description: "Registered Retirement Savings Plan (RRSP) • (Beneficiary: Individual)"
  }
}

function normalizeAssetTransactions() {
  return Object.values(ASSET_DATA).flatMap((asset: any) =>
    (asset.transactions || []).map((tx: any, idx: number) => ({
      id: `${asset.id}-asset-${idx}`,
      title: `${tx.type} ${asset.symbol}`,
      amount: tx.amount,
      type: tx.type.toLowerCase(),
      category: asset.assetClass?.toLowerCase() || "fund",
      icon: tx.type === "Buy" ? "trending-up" : tx.type === "Sell" ? "trending-down" : "dollar-sign",
      timestamp: tx.date,
      status: tx.status?.toLowerCase() || "completed",
      symbol: asset.symbol,
      shares: tx.units ? `${tx.units} units @ ${tx.price}` : undefined,
      account: asset.name,
      plan: Object.keys(PLAN_ACCOUNTS).find(plan => 
        PLAN_ACCOUNTS[plan as keyof typeof PLAN_ACCOUNTS].accounts.includes(asset.id)
      ) || "Other"
    }))
  )
}

function normalizeTFSAAccountTransactions() {
  return Object.values(TFSA_DATA).flatMap((account: any) =>
    (account.transactions || []).map((tx: any, idx: number) => ({
      id: `${account.id}-tfsa-${idx}`,
      title: `${tx.type} ${tx.security || ""}`.trim(),
      amount: tx.amount,
      type: tx.type.toLowerCase(),
      category: account.accountType?.toLowerCase() || "tfsa",
      icon: tx.type === "Buy" ? "trending-up" : tx.type === "Sell" ? "trending-down" : "dollar-sign",
      timestamp: tx.date,
      status: "completed",
      symbol: tx.security,
      shares: tx.units ? `${tx.units} units @ ${tx.price}` : undefined,
      account: account.name,
      plan: Object.keys(PLAN_ACCOUNTS).find(plan => 
        PLAN_ACCOUNTS[plan as keyof typeof PLAN_ACCOUNTS].accounts.includes(account.id)
      ) || "Other"
    }))
  )
}

function getAllRecentTransactions() {
  const assetTxs = normalizeAssetTransactions()
  const tfsaTxs = normalizeTFSAAccountTransactions()
  // Combine and sort by date descending (assuming ISO or YYYY-MM-DD format)
  const all = [...assetTxs, ...tfsaTxs]
  all.sort((a, b) => (b.timestamp > a.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0))
  return all.slice(0, 10) // Show only the 10 most recent
}

function getAllInvestmentPlans() {
  return Object.values(INVESTMENT_PLANS).map(plan => ({
    id: plan.id,
    title: plan.title,
    description: plan.description,
    balance: plan.balance,
    type: plan.type as "tfsa" | "rrsp" | "resp" | "rdsp" | "rrif" | "portfolio" | "mutual-fund" | "client" | "trading" | "retirement",
    change: plan.change,
    isPositive: plan.isPositive,
    clientCount: plan.clientCount,
    totalAssets: plan.totalAssets,
    lastUpdated: plan.lastUpdated
  }))
}

function getTotalAssetsUnderManagement() {
  return Object.values(INVESTMENT_PLANS).reduce((total, plan) => {
    const balance = parseFloat(plan.balance.replace(/[$,]/g, ''))
    return total + balance
  }, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export default function () {
  const recentTransactions = getAllRecentTransactions()
  const investmentPlans = getAllInvestmentPlans()
  const totalAssets = getTotalAssetsUnderManagement()
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-elevated p-6 flex flex-col">
          <h2 className="text-heading-3 text-gray-900 mb-4 text-left flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gray-600" />
            Investment Plans
          </h2>
          <div className="flex-1">
            <List01 className="h-full" totalBalance={totalAssets} accounts={investmentPlans} />
          </div>
        </div>
        <div className="card-elevated p-6 flex flex-col">
          <h2 className="text-heading-3 text-gray-900 mb-4 text-left flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-600" />
            Recent Trading Activity
          </h2>
          <div className="flex-1">
            <List02 className="h-full" transactions={recentTransactions} />
          </div>
        </div>
      </div>
    </div>
  )
}
