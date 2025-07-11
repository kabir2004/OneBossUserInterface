"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Bell,
  Star,
  Activity,
  Eye,
  ExternalLink,
  RefreshCw
} from "lucide-react"

interface AssetDetailProps {
  assetId: string
  onBack: () => void
}

// Sample asset data - this would normally come from an API
export const ASSET_DATA = {
  "FID-2302": {
    id: "FID-2302",
    name: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
    symbol: "FGIB",
    currentPrice: "$14.1588",
    priceChange: "+$0.12",
    priceChangePercent: "+0.85%",
    isPositive: true,
    marketValue: "$2,774.81",
    bookValue: "$2,799.99",
    units: "196.9722",
    totalGainLoss: "-$25.18",
    dailyGainLoss: "+$23.64",
    portfolioWeight: "3.02%",
    assetClass: "Fixed Income",
    sector: "Diversified",
    currency: "CAD",
    expense: "0.65%",
    lastUpdated: "2024-01-09 4:00 PM EST",
    description: "The Fidelity Global Income Portfolio seeks to provide regular income and the potential for capital appreciation by investing primarily in a diversified portfolio of global income-generating securities.",
    holdings: [
      { name: "Government Bonds", allocation: "45.2%", value: "$1,254.62" },
      { name: "Corporate Bonds", allocation: "35.8%", value: "$993.58" },
      { name: "Dividend Stocks", allocation: "15.3%", value: "$424.55" },
      { name: "Cash & Equivalents", allocation: "3.7%", value: "$102.66" }
    ],
    performance: [
      { period: "1 Day", return: "+0.85%", benchmark: "+0.72%" },
      { period: "1 Week", return: "+2.14%", benchmark: "+1.95%" },
      { period: "1 Month", return: "+3.45%", benchmark: "+3.12%" },
      { period: "3 Months", return: "+8.92%", benchmark: "+8.15%" },
      { period: "6 Months", return: "+12.67%", benchmark: "+11.89%" },
      { period: "1 Year", return: "+15.42%", benchmark: "+14.23%" },
      { period: "3 Years", return: "+24.85%", benchmark: "+22.76%" },
      { period: "5 Years", return: "+45.32%", benchmark: "+42.11%" }
    ],
    transactions: [
      { date: "2024-01-08", type: "Buy", units: "25.5000", price: "$14.05", amount: "$358.28", status: "Settled" },
      { date: "2024-01-05", type: "Dividend", units: "0.0000", price: "$0.00", amount: "$12.45", status: "Settled" },
      { date: "2023-12-28", type: "Buy", units: "50.0000", price: "$13.98", amount: "$699.00", status: "Settled" },
      { date: "2023-12-15", type: "Buy", units: "121.4722", price: "$14.12", amount: "$1,714.73", status: "Settled" }
    ]
  }
}

export default function AssetDetail({ assetId, onBack }: AssetDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const asset = ASSET_DATA[assetId as keyof typeof ASSET_DATA]

  if (!asset) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Asset Not Found</h3>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="p-2 border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{asset.symbol}</h1>
            <p className="text-sm text-gray-600 mt-1">{asset.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-200">
            <Bell className="w-4 h-4 mr-2" />
            Alert
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Star className="w-4 h-4 mr-2" />
            Watch
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Current Price</span>
              <div className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">Live</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">{asset.currentPrice}</span>
              <div className={`flex items-center gap-1 ${asset.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {asset.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{asset.priceChange}</span>
                <span className="text-sm">({asset.priceChangePercent})</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Last updated: {asset.lastUpdated}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <span className="text-sm text-gray-600">Market Value</span>
            <p className="text-2xl font-bold text-gray-900 mt-2">{asset.marketValue}</p>
            <p className="text-sm text-gray-500 mt-1">Book Value: {asset.bookValue}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <span className="text-sm text-gray-600">Total Gain/Loss</span>
            <p className={`text-2xl font-bold mt-2 ${asset.totalGainLoss.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {asset.totalGainLoss}
            </p>
            <p className="text-sm text-emerald-600 mt-1">Today: {asset.dailyGainLoss}</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <span className="text-sm text-gray-600">Units Held</span>
            <p className="text-2xl font-bold text-gray-900 mt-2">{asset.units}</p>
            <p className="text-sm text-gray-500 mt-1">Weight: {asset.portfolioWeight}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border border-gray-200">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="holdings" className="text-sm">Holdings</TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
          <TabsTrigger value="transactions" className="text-sm">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Information */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Asset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Asset Class</span>
                    <p className="font-medium text-gray-900">{asset.assetClass}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Sector</span>
                    <p className="font-medium text-gray-900">{asset.sector}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Currency</span>
                    <p className="font-medium text-gray-900">{asset.currency}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense Ratio</span>
                    <p className="font-medium text-gray-900">{asset.expense}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Description</span>
                  <p className="text-sm text-gray-700 mt-1">{asset.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Buy More Units
                </Button>
                <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell Units
                </Button>
                <Button variant="outline" className="w-full border-gray-200">
                  <Eye className="w-4 h-4 mr-2" />
                  View Fund Details
                </Button>
                <Button variant="outline" className="w-full border-gray-200">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Fund Fact Sheet
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
              <p className="text-sm text-gray-600">Breakdown of underlying holdings</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {asset.holdings.map((holding, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-500" style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}></div>
                      <span className="font-medium text-gray-900">{holding.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{holding.allocation}</p>
                      <p className="text-sm text-gray-600">{holding.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Performance vs Benchmark</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Fund Return</TableHead>
                    <TableHead>Benchmark</TableHead>
                    <TableHead>Difference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asset.performance.map((perf, index) => {
                    const fundReturn = parseFloat(perf.return.replace('%', ''))
                    const benchmarkReturn = parseFloat(perf.benchmark.replace('%', ''))
                    const difference = (fundReturn - benchmarkReturn).toFixed(2)
                    const isOutperforming = fundReturn > benchmarkReturn
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{perf.period}</TableCell>
                        <TableCell className={fundReturn > 0 ? 'text-emerald-600' : 'text-red-600'}>
                          {perf.return}
                        </TableCell>
                        <TableCell className={benchmarkReturn > 0 ? 'text-emerald-600' : 'text-red-600'}>
                          {perf.benchmark}
                        </TableCell>
                        <TableCell className={isOutperforming ? 'text-emerald-600' : 'text-red-600'}>
                          {isOutperforming ? '+' : ''}{difference}%
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {asset.transactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${transaction.type === 'Buy' ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : ''}
                            ${transaction.type === 'Dividend' ? 'border-blue-200 text-blue-700 bg-blue-50' : ''}
                            ${transaction.type === 'Sell' ? 'border-red-200 text-red-700 bg-red-50' : ''}
                          `}
                        >
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.units}</TableCell>
                      <TableCell>{transaction.price}</TableCell>
                      <TableCell className={transaction.type === 'Dividend' ? 'text-emerald-600' : ''}>
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 text-gray-600">
                          {transaction.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}