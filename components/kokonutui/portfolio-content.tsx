"use client"

import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  ArrowRight,
  Search,
  Calendar,
  Plus,
  Users,
  CreditCard,
  Building2,
  BadgeCheck,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share,
  BarChart3,
  TrendingUp,
  Clock,
  DollarSign,
  ArrowLeft,
  PieChart,
  Target,
  Receipt,
  Banknote
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import AssetDetail from "./asset-detail"
import TFSADetail from "./tfsa-detail"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Simple Trading Activity Chart (Line Chart of Value Over Time)
const SimpleTradingActivityChart = ({ assetId, assetName }: { assetId: string, assetName: string }) => {
  // Example: Simulated value history for the asset
  const valueHistory = [
    { date: '2024-01-01', value: 10000 },
    { date: '2024-02-01', value: 10500 },
    { date: '2024-03-01', value: 11000 },
    { date: '2024-04-01', value: 10800 },
    { date: '2024-05-01', value: 11500 },
    { date: '2024-06-01', value: 12000 },
    { date: '2024-07-01', value: 12500 },
  ]

  const minValue = Math.min(...valueHistory.map(d => d.value))
  const maxValue = Math.max(...valueHistory.map(d => d.value))
  const valueRange = maxValue - minValue || 1

    return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{assetName} Value Trend</h3>
        <p className="text-xs text-gray-500">Total value over time</p>
          </div>
      <div className="w-full h-64 relative">
        <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet" className="block">
          {/* Chart area with responsive padding */}
          <defs>
            <clipPath id="chartArea">
              <rect x="80" y="20" width="700" height="240" />
            </clipPath>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
              key={`grid-x-${i}`}
              x1={80 + (i * 700 / 6)}
              y1="20"
              x2={80 + (i * 700 / 6)}
              y2="260"
              stroke="#F3F4F6"
                  strokeWidth="1"
            />
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                      <line
              key={`grid-y-${i}`}
              x1="80"
              y1={20 + t * 240}
              x2="780"
              y2={20 + t * 240}
              stroke="#F3F4F6"
              strokeWidth="1"
            />
          ))}

          {/* Axis */}
          <line x1="80" y1="260" x2="780" y2="260" stroke="#E5E7EB" strokeWidth="2" />
          <line x1="80" y1="20" x2="80" y2="260" stroke="#E5E7EB" strokeWidth="2" />
          
          {/* Value Line */}
                <polyline
                  fill="none"
            stroke="#2563EB"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
            clipPath="url(#chartArea)"
            points={valueHistory.map((d, i) => {
              const x = 80 + (i / (valueHistory.length - 1)) * 700
              const y = 260 - ((d.value - minValue) / valueRange) * 240
                    return `${x},${y}`
            }).join(' ')}
          />
          
          {/* Dots */}
          {valueHistory.map((d, i) => {
            const x = 80 + (i / (valueHistory.length - 1)) * 700
            const y = 260 - ((d.value - minValue) / valueRange) * 240
                  return (
              <circle key={i} cx={x} cy={y} r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            )
          })}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                <text
              key={i}
              x="70"
              y={20 + t * 240}
              textAnchor="end"
              alignmentBaseline="middle"
              className="text-xs fill-gray-500 font-medium"
            >
              {`$${(minValue + t * valueRange).toLocaleString()}`}
                </text>
          ))}
          
          {/* X-axis labels */}
          {valueHistory.map((d, i) => (
                <text
              key={i}
              x={80 + (i / (valueHistory.length - 1)) * 700}
              y="280"
                  textAnchor="middle"
              className="text-xs fill-gray-500 font-medium"
                >
              {d.date.slice(5, 7) + '/' + d.date.slice(2, 4)}
                </text>
          ))}
          </svg>
      </div>
    </div>
  )
}

// Type definitions
interface TradingActivity {
  date: string
  type: "Buy" | "Sell"
  units: string
  price: string
  value: string
  status: string
}

interface TrustTransaction {
  date: string
  type: "Deposit" | "Withdrawal"
  amount: string
  description: string
}

// Trading activity data for each asset
const TRADING_ACTIVITY: Record<string, TradingActivity[]> = {
  "FID-2302": [
    { date: "2024-12-15", type: "Buy", units: "50.0000", price: "$14.1588", value: "$707.94", status: "Completed" },
    { date: "2024-12-10", type: "Sell", units: "25.0000", price: "$14.2500", value: "$356.25", status: "Completed" },
    { date: "2024-12-05", type: "Buy", units: "100.0000", price: "$14.1000", value: "$1,410.00", status: "Completed" }
  ],
  "FID-2502": [
    { date: "2024-12-12", type: "Buy", units: "200.0000", price: "$14.1588", value: "$2,831.76", status: "Completed" },
    { date: "2024-12-08", type: "Buy", units: "150.0000", price: "$14.2000", value: "$2,130.00", status: "Completed" }
  ],
  "TSLA-001": [
    { date: "2024-12-14", type: "Buy", units: "100.0000", price: "$245.32", value: "$24,532.00", status: "Completed" },
    { date: "2024-12-10", type: "Sell", units: "50.0000", price: "$248.50", value: "$12,425.00", status: "Completed" },
    { date: "2024-12-05", type: "Buy", units: "200.0000", price: "$242.00", value: "$48,400.00", status: "Completed" }
  ],
  "AAPL-001": [
    { date: "2024-12-13", type: "Buy", units: "500.0000", price: "$185.64", value: "$92,820.00", status: "Completed" },
    { date: "2024-12-08", type: "Buy", units: "300.0000", price: "$184.00", value: "$55,200.00", status: "Completed" }
  ],
  "NVDA-001": [
    { date: "2024-12-15", type: "Buy", units: "100.0000", price: "$428.56", value: "$42,856.00", status: "Completed" },
    { date: "2024-12-10", type: "Buy", units: "150.0000", price: "$425.00", value: "$63,750.00", status: "Completed" }
  ]
}

// Trust transactions data
const TRUST_TRANSACTIONS: Record<string, TrustTransaction[]> = {
  "FID-2302": [
    { date: "2024-12-15", type: "Deposit", amount: "$707.94", description: "Purchase of FIDELITY GLOBAL INCOME PORTFOLIO" },
    { date: "2024-12-10", type: "Withdrawal", amount: "$356.25", description: "Sale of FIDELITY GLOBAL INCOME PORTFOLIO" }
  ],
  "TSLA-001": [
    { date: "2024-12-14", type: "Deposit", amount: "$24,532.00", description: "Purchase of TESLA INC COMMON STOCK" },
    { date: "2024-12-10", type: "Withdrawal", amount: "$12,425.00", description: "Sale of TESLA INC COMMON STOCK" }
  ],
  "AAPL-001": [
    { date: "2024-12-13", type: "Deposit", amount: "$92,820.00", description: "Purchase of APPLE INC COMMON STOCK" },
    { date: "2024-12-08", type: "Deposit", amount: "$55,200.00", description: "Purchase of APPLE INC COMMON STOCK" }
  ]
}

const ACCOUNTS = [
  {
    id: "070G225184",
    name: "070225184",
    accountType: "Tax-Free Savings Account (TFSA)",
    beneficiary: "Estate",
    totalValue: "$14,582.16",
    holdings: [
      {
        id: "FID-2302",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
        supplierAccount: "7848697653",
        units: "196.9722",
        price: "$14.1588",
        marketValue: "$2,774.81",
        bookValue: "$2,799.99"
      },
      {
        id: "FID-2502",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO DSC DSC CAD",
        supplierAccount: "625.6722",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,036.90"
      },
      {
        id: "FID-2928",
        subject: "FIDELITY GLOBAL INTRINSIC VALUE CLASS SERIES B ISC FEL CAD",
        supplierAccount: "8682703124",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,838.90"
      }
    ],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$14,584.16"
  },
  {
    id: "070G225194",
    name: "070225194",
    accountType: "Registered Retirement Savings Plan (RRSP)",
    beneficiary: "Estate",
    totalValue: "$77,477.32",
    holdings: [],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$77,477.32"
  },
  // Dashboard accounts mapped to portfolio accounts
  {
    id: "1",
    name: "001000001",
    accountType: "Registered Education Savings Plan (RESP)",
    beneficiary: "Individual",
    totalValue: "$847,392",
    holdings: [
      {
        id: "TSLA-001",
        subject: "TESLA INC COMMON STOCK",
        supplierAccount: "NASDAQ-TSLA",
        units: "1,250.00",
        price: "$245.32",
        marketValue: "$306,650.00",
        bookValue: "$290,000.00"
      },
      {
        id: "AAPL-001",
        subject: "APPLE INC COMMON STOCK",
        supplierAccount: "NASDAQ-AAPL",
        units: "2,100.00",
        price: "$185.64",
        marketValue: "$389,844.00",
        bookValue: "$378,000.00"
      },
      {
        id: "NVDA-001",
        subject: "NVIDIA CORP COMMON STOCK",
        supplierAccount: "NASDAQ-NVDA",
        units: "350.00",
        price: "$428.56",
        marketValue: "$149,996.00",
        bookValue: "$140,000.00"
      }
    ],
    settledCAD: "$902.00",
    settledUSD: "$0.00",
    totalInCAD: "$847,392"
  },
  {
    id: "2",
    name: "002000001",
    accountType: "Registered Disability Savings Plan (RDSP)",
    beneficiary: "Individual",
    totalValue: "$623,150",
    holdings: [
      {
        id: "TDB902",
        subject: "TD CANADIAN BOND INDEX FUND",
        supplierAccount: "TD-TDB902",
        units: "15,450.00",
        price: "$10.85",
        marketValue: "$167,632.50",
        bookValue: "$165,000.00"
      },
      {
        id: "JNJ-001",
        subject: "JOHNSON & JOHNSON COMMON STOCK",
        supplierAccount: "NYSE-JNJ",
        units: "1,890.00",
        price: "$158.75",
        marketValue: "$300,037.50",
        bookValue: "$295,000.00"
      },
      {
        id: "PG-001",
        subject: "PROCTER & GAMBLE CO COMMON STOCK",
        supplierAccount: "NYSE-PG",
        units: "1,020.00",
        price: "$152.00",
        marketValue: "$155,040.00",
        bookValue: "$150,000.00"
      }
    ],
    settledCAD: "$440.00",
    settledUSD: "$0.00",
    totalInCAD: "$623,150"
  },
  {
    id: "3",
    name: "003000001",
    accountType: "Tax-Free Savings Account (TFSA)",
    beneficiary: "Multiple Clients",
    totalValue: "$1,376,850",
    holdings: [
      {
        id: "CLIENT-001",
        subject: "DIVERSIFIED EQUITY PORTFOLIO A",
        supplierAccount: "MANAGED-001",
        units: "2,850.00",
        price: "$285.50",
        marketValue: "$813,675.00",
        bookValue: "$800,000.00"
      },
      {
        id: "CLIENT-002",
        subject: "BALANCED INCOME PORTFOLIO B",
        supplierAccount: "MANAGED-002",
        units: "1,890.00",
        price: "$298.25",
        marketValue: "$563,692.50",
        bookValue: "$550,000.00"
      }
    ],
    settledCAD: "$-517.50",
    settledUSD: "$0.00",
    totalInCAD: "$1,376,850"
  },
  {
    id: "4",
    name: "004000001",
    accountType: "Registered Retirement Income Fund (RRIF)",
    beneficiary: "Individual",
    totalValue: "$892,000",
    holdings: [
      {
        id: "SPY-001",
        subject: "SPDR S&P 500 ETF TRUST",
        supplierAccount: "ARCA-SPY",
        units: "1,200.00",
        price: "$445.80",
        marketValue: "$534,960.00",
        bookValue: "$528,000.00"
      },
      {
        id: "QQQ-001",
        subject: "INVESCO QQQ TRUST SERIES 1",
        supplierAccount: "NASDAQ-QQQ",
        units: "950.00",
        price: "$375.83",
        marketValue: "$357,038.50",
        bookValue: "$360,000.00"
      }
    ],
    settledCAD: "$1.50",
    settledUSD: "$0.00",
    totalInCAD: "$892,000"
  },
  {
    id: "5",
    name: "005000001",
    accountType: "Registered Retirement Savings Plan (RRSP)",
    beneficiary: "Individual",
    totalValue: "$456,000",
    holdings: [
      {
        id: "VTSAX",
        subject: "VANGUARD TOTAL STOCK MARKET INDEX FUND",
        supplierAccount: "VANGUARD-VTSAX",
        units: "3,800.00",
        price: "$98.50",
        marketValue: "$374,300.00",
        bookValue: "$370,000.00"
      },
      {
        id: "VTIAX",
        subject: "VANGUARD TOTAL INTERNATIONAL STOCK INDEX FUND",
        supplierAccount: "VANGUARD-VTIAX",
        units: "2,950.00",
        price: "$27.68",
        marketValue: "$81,656.00",
        bookValue: "$80,000.00"
      }
    ],
    settledCAD: "$44.00",
    settledUSD: "$0.00",
    totalInCAD: "$456,000"
  }
]

export default function PortfolioContent() {
  const [open, setOpen] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [selectedAssetForActivity, setSelectedAssetForActivity] = useState<string | null>(null)
  const [selectedAccountForActivity, setSelectedAccountForActivity] = useState<string | null>(null)
  const searchParams = useSearchParams()
  
  // Handle URL parameter for account navigation from dashboard
  useEffect(() => {
    if (searchParams) {
      const accountParam = searchParams.get('account')
      if (accountParam) {
        setOpen(accountParam)
        // Scroll to the account or focus on it
        setTimeout(() => {
          const accountElement = document.getElementById(`account-${accountParam}`)
          if (accountElement) {
            accountElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }, 100)
      } else {
        setOpen(ACCOUNTS[0].id)
      }
    } else {
      setOpen(ACCOUNTS[0].id)
    }
  }, [searchParams])
  
  // Handle navigation back to portfolio
  const handleBackToPortfolio = () => {
    setSelectedAsset(null)
    setSelectedAccount(null)
  }
  
  // Handle asset click for detail view
  const handleAssetClick = (assetId: string) => {
    setSelectedAsset(assetId)
  }
  
  // Handle account click for detail view
  const handleAccountClick = (accountId: string) => {
    setSelectedAccount(accountId)
  }

  // Handle asset click for activity view
  const handleAssetActivityClick = (assetId: string) => {
    setSelectedAssetForActivity(assetId)
    setSelectedAccountForActivity(null)
  }

  // Handle account activity click
  const handleAccountActivityClick = (accountId: string) => {
    setSelectedAccountForActivity(accountId)
    setSelectedAssetForActivity(null)
  }

  // Handle clicking outside to clear selection
  const handleOutsideClick = (e: React.MouseEvent) => {
    // Only clear if clicking on the main container, not on the chart or its controls
    if (e.target === e.currentTarget) {
      setSelectedAssetForActivity(null)
      setSelectedAccountForActivity(null)
    }
  }

  // Get trading activity for selected asset
  const getTradingActivity = () => {
    if (selectedAssetForActivity && TRADING_ACTIVITY[selectedAssetForActivity]) {
      return TRADING_ACTIVITY[selectedAssetForActivity]
    }
    return []
  }

  // Get trust transactions for selected asset
  const getTrustTransactions = () => {
    if (selectedAssetForActivity && TRUST_TRANSACTIONS[selectedAssetForActivity]) {
      return TRUST_TRANSACTIONS[selectedAssetForActivity]
    }
    return []
  }

  // Get asset details
  const getSelectedAssetDetails = () => {
    if (!selectedAssetForActivity) return null
    
    for (const account of ACCOUNTS) {
      const asset = account.holdings.find(h => h.id === selectedAssetForActivity)
      if (asset) {
        return { ...asset, accountName: account.name }
      }
    }
    return null
  }


  
  // Show asset detail if selected
  if (selectedAsset) {
    return <AssetDetail assetId={selectedAsset} onBack={handleBackToPortfolio} />
  }
  
  // Show account detail if selected
  if (selectedAccount) {
    // Check if it's a TFSA account
    const account = ACCOUNTS.find(acc => acc.id === selectedAccount)
    if (account && (account.id === "070G225184" || account.id === "070G225194")) {
    return <TFSADetail accountId={selectedAccount} onBack={handleBackToPortfolio} />
    } else {
      // For non-TFSA accounts, show a generic account detail view
      return (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={handleBackToPortfolio}
                className="p-2 border-gray-200 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <PieChart className="w-6 h-6 text-blue-600" />
                  <h1 className="text-heading-1 text-gray-900">{account?.name || 'Account'}</h1>
                  <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                    Active
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">Investment Account</p>
                <p className="text-xs text-gray-500">Account #{selectedAccount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-gray-200">
                <Receipt className="w-4 h-4 mr-2" />
                Statement
              </Button>
            </div>
          </div>

          {/* Account Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Account Value</span>
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-heading-1 text-gray-900">{account?.totalValue || '$0.00'}</p>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+$0.00 today</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Total Gain/Loss</span>
                  <Target className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-emerald-600">+$0.00</p>
                  <p className="text-sm text-gray-500">Book Value: $0.00</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Holdings</span>
                  <PieChart className="w-4 h-4 text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-heading-1 text-gray-900">{account?.holdings?.length || 0}</p>
                  <p className="text-sm text-gray-500">securities</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Holdings */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Holdings</CardTitle>
              <p className="text-sm text-gray-600">Investment breakdown in your account</p>
            </CardHeader>
            <CardContent>
              {!account?.holdings || account.holdings.length === 0 ? (
                <div className="text-center py-8">
                  <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Holdings</h3>
                  <p className="text-gray-600 mb-4">This account currently has no holdings.</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <PieChart className="w-4 h-4 mr-2" />
                    Explore Investment Options
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Security</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market Value</TableHead>
                      <TableHead>Gain/Loss</TableHead>
                      <TableHead>Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {account.holdings.map((holding) => (
                      <TableRow key={holding.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium text-blue-600">{holding.id}</p>
                            <p className="text-sm text-gray-600">{holding.subject.substring(0, 50)}...</p>
                          </div>
                        </TableCell>
                        <TableCell>{holding.units}</TableCell>
                        <TableCell>{holding.price}</TableCell>
                        <TableCell className="font-medium">{holding.marketValue}</TableCell>
                        <TableCell className="text-emerald-600">+$0.00</TableCell>
                        <TableCell>0.0%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  return (
    <div className="space-y-6" onClick={handleOutsideClick}>
      {/* Top Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
                          <h2 className="text-heading-3 text-gray-900">Assets</h2>
          <div className="text-xs text-gray-500">As of August 7, 2020</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button variant="outline" className="text-xs px-3 py-1 border-zinc-200">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <div className="text-right">
            <div className="text-xs text-gray-500">Total value:</div>
            <div className="font-bold text-lg text-gray-900">$4,287,451</div>
          </div>
        </div>
      </div>

      {/* Quick Account Switcher */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Quick Account Switch</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {ACCOUNTS.map((account) => (
            <Button
              key={account.id}
              variant="outline"
              size="sm"
              className="text-xs border-gray-200 hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => setOpen(account.id)}
            >
              {account.name} - {account.accountType}
            </Button>
          ))}
        </div>
      </div>

      {/* Accounts Accordion */}
      <Accordion type="single" collapsible value={open ?? undefined} onValueChange={setOpen} className="bg-white rounded-xl border border-gray-200">
        {ACCOUNTS.map((account, idx) => {
          const isFromDashboard = searchParams ? searchParams.get('account') === account.id : false
          return (
            <AccordionItem 
              key={account.id} 
              value={account.id} 
              id={`account-${account.id}`} 
              className={`border-b border-gray-200 ${isFromDashboard ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full">
                  <span 
                    className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer underline transition-colors duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAccountClick(account.id)
                    }}
                  >
                    ({account.name} - {account.accountType})
                  </span>
                  <span className="text-xs text-gray-500 ml-2">(Beneficiary: {account.beneficiary})</span>
                </div>
                <div className="text-xs text-gray-900 font-semibold ml-auto">Total value: {account.totalValue}</div>
              </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Holdings Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Supplier Account</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market value</TableHead>
                      <TableHead>Book Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {account.holdings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">No Holdings Found</TableCell>
                      </TableRow>
                    ) : (
                      account.holdings.map((h) => (
                        <TableRow key={h.id} className={selectedAssetForActivity === h.id ? 'bg-blue-50' : ''}>
                          <TableCell 
                            className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAssetActivityClick(h.id)
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4" />
                              {h.id} {h.subject}
                            </div>
                          </TableCell>
                          <TableCell>{h.supplierAccount}</TableCell>
                          <TableCell>{h.units}</TableCell>
                          <TableCell>{h.price}</TableCell>
                          <TableCell>{h.marketValue}</TableCell>
                          <TableCell>{h.bookValue}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="text-xs px-2 py-1 border-zinc-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleAssetClick(h.id)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAssetActivityClick(h.id)}>
                                  <BarChart3 className="w-4 h-4 mr-2" />
                                  View Activity
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share className="w-4 h-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Settled rows */}
              <div className="mt-2 text-xs text-gray-500">
                <div>Settled Trust Account Balance CAD</div>
                <div>Settled Trust Account Balance USD</div>
              </div>
              <div className="mt-2 text-right font-semibold text-gray-900">Total in CAD <span className="ml-4">{account.totalInCAD}</span></div>
            </AccordionContent>
          </AccordionItem>
          )
        })}
      </Accordion>

      {/* Activity Section - Shows Selected Asset Activity */}
      {selectedAssetForActivity && (
        <div className="bg-white rounded-xl border border-gray-200 mt-6" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Activity for: {getSelectedAssetDetails()?.subject}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Account: {getSelectedAssetDetails()?.accountName}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedAssetForActivity(null)}
                className="border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Clear Selection
              </Button>
            </div>
          </div>
          <div className="p-6" onClick={(e) => e.stopPropagation()}>
            <SimpleTradingActivityChart 
              assetId={selectedAssetForActivity} 
              assetName={getSelectedAssetDetails()?.subject || ''} 
            />
          </div>
        </div>
      )}

      {/* Trading Activity */}
      <div className="bg-white rounded-xl border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Trading Activity</h2>
            {selectedAssetForActivity && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Clock className="w-3 h-3 mr-1" />
                Showing activity for selected asset
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" className="w-36 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" />
            <Input type="date" className="w-36 bg-gray-50 border-gray-200 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95" />
            <Button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 px-4 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95">
              Search
            </Button>
          </div>
          
          {selectedAssetForActivity && getTradingActivity().length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTradingActivity().map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(activity.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={activity.type === 'Buy' ? 'default' : 'secondary'}
                          className={activity.type === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.units}</TableCell>
                      <TableCell>{activity.price}</TableCell>
                      <TableCell>{activity.value}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {selectedAssetForActivity ? 'No trading activity found for this asset' : 'No Transaction Found'}
            </div>
          )}
        </div>
      </div>

      {/* Trust Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Trust Transactions</h2>
            {selectedAssetForActivity && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <DollarSign className="w-3 h-3 mr-1" />
                Showing transactions for selected asset
              </Badge>
            )}
          </div>
        </div>
        <div className="p-6">
          {selectedAssetForActivity && getTrustTransactions().length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getTrustTransactions().map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={transaction.type === 'Deposit' ? 'default' : 'secondary'}
                          className={transaction.type === 'Deposit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{transaction.amount}</TableCell>
                      <TableCell className="text-sm text-gray-600">{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {selectedAssetForActivity ? 'No trust transactions found for this asset' : 'No Trading Activities Found'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 