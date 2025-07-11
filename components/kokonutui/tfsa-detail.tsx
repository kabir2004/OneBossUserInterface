"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  PieChart,
  Shield,
  Download,
  Upload,
  CreditCard,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  Target,
  Banknote
} from "lucide-react"

interface TFSADetailProps {
  accountId: string
  onBack: () => void
}

// Sample TFSA data - this would normally come from an API
export const TFSA_DATA = {
  "070G225184": {
    id: "070G225184",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    accountType: "Tax-Free Savings Account (TFSA)",
    beneficiary: "Estate",
    totalValue: "$14,582.16",
    bookValue: "$14,635.68",
    totalGainLoss: "-$53.52",
    dailyChange: "+$127.83",
    isDailyPositive: true,
    contributionRoom: "$95,000",
    contributedThisYear: "$6,500",
    remainingRoom: "$88,500",
    contributionLimit: "$7,000",
    currency: "CAD",
    lastUpdated: "2024-01-09 4:00 PM EST",
    accountStatus: "Active",
    openDate: "2018-03-15",
    holdings: [
      {
        id: "FID-2302",
        name: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
        symbol: "FGIB",
        units: "196.9722",
        price: "$14.1588",
        marketValue: "$2,774.81",
        bookValue: "$2,799.99",
        gainLoss: "-$25.18",
        weight: "19.0%",
        assetClass: "Fixed Income"
      },
      {
        id: "FID-2502", 
        name: "FIDELITY GLOBAL INCOME PORTFOLIO DSC DSC CAD",
        symbol: "FGID",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$8,863.39",
        bookValue: "$8,836.90",
        gainLoss: "+$26.49",
        weight: "60.8%",
        assetClass: "Fixed Income"
      },
      {
        id: "FID-2928",
        name: "FIDELITY GLOBAL INTRINSIC VALUE CLASS SERIES B ISC FEL CAD",
        symbol: "FGIV",
        units: "196.4722",
        price: "$14.1588",
        marketValue: "$2,943.96",
        bookValue: "$2,998.79",
        gainLoss: "-$54.83",
        weight: "20.2%",
        assetClass: "Equity"
      }
    ],
    contributions: [
      { date: "2024-01-08", amount: "$2,000.00", type: "Regular Contribution", status: "Processed" },
      { date: "2024-01-01", amount: "$2,500.00", type: "Annual Contribution", status: "Processed" },
      { date: "2023-12-15", amount: "$2,000.00", type: "Regular Contribution", status: "Processed" },
      { date: "2023-11-30", amount: "$1,500.00", type: "Regular Contribution", status: "Processed" }
    ],
    transactions: [
      { date: "2024-01-08", type: "Buy", security: "FGIB", units: "25.5000", price: "$14.05", amount: "$358.28" },
      { date: "2024-01-05", type: "Dividend", security: "FGIB", units: "0.0000", price: "$0.00", amount: "$12.45" },
      { date: "2023-12-28", type: "Buy", security: "FGID", units: "50.0000", price: "$13.98", amount: "$699.00" },
      { date: "2023-12-15", type: "Contribution", security: "Cash", units: "0.0000", price: "$0.00", amount: "$2,000.00" }
    ],
    performanceHistory: [
      { period: "1 Month", value: "$14,582.16", change: "+$284.52", percentage: "+1.99%" },
      { period: "3 Months", value: "$14,297.64", change: "+$456.73", percentage: "+3.31%" },
      { period: "6 Months", value: "$13,840.91", change: "+$741.25", percentage: "+5.35%" },
      { period: "1 Year", value: "$13,125.43", change: "+$1,456.73", percentage: "+11.10%" },
      { period: "Since Inception", value: "$8,635.68", change: "+$5,946.48", percentage: "+68.84%" }
    ]
  },
  "070G225194": {
    id: "070G225194", 
    name: "TFSA Client Name, Individual Data Entry Wizard",
    accountType: "Tax-Free Savings Account (TFSA)",
    beneficiary: "Estate",
    totalValue: "$77,477.32",
    bookValue: "$75,200.00",
    totalGainLoss: "+$2,277.32",
    dailyChange: "+$234.67",
    isDailyPositive: true,
    contributionRoom: "$95,000",
    contributedThisYear: "$7,000",
    remainingRoom: "$88,000",
    contributionLimit: "$7,000",
    currency: "CAD",
    lastUpdated: "2024-01-09 4:00 PM EST",
    accountStatus: "Active",
    openDate: "2019-01-15",
    holdings: [],
    contributions: [
      { date: "2024-01-01", amount: "$7,000.00", type: "Annual Maximum", status: "Processed" },
      { date: "2023-01-01", amount: "$6,500.00", type: "Annual Maximum", status: "Processed" },
      { date: "2022-01-01", amount: "$6,000.00", type: "Annual Maximum", status: "Processed" }
    ],
    transactions: [
      { date: "2024-01-01", type: "Contribution", security: "Cash", units: "0.0000", price: "$0.00", amount: "$7,000.00" },
      { date: "2023-12-31", type: "Interest", security: "Cash", units: "0.0000", price: "$0.00", amount: "$156.43" }
    ],
    performanceHistory: [
      { period: "1 Month", value: "$77,477.32", change: "+$1,234.56", percentage: "+1.62%" },
      { period: "3 Months", value: "$76,242.76", change: "+$2,456.78", percentage: "+3.28%" },
      { period: "6 Months", value: "$74,785.98", change: "+$2,691.34", percentage: "+3.73%" },
      { period: "1 Year", value: "$72,094.64", change: "+$5,382.68", percentage: "+7.47%" },
      { period: "Since Inception", value: "$65,200.00", change: "+$12,277.32", percentage: "+18.83%" }
    ]
  }
}

export default function TFSADetail({ accountId, onBack }: TFSADetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const account = TFSA_DATA[accountId as keyof typeof TFSA_DATA]

  if (!account) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Account Not Found</h3>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    )
  }

  const contributionProgress = ((parseFloat(account.contributedThisYear.replace(/[$,]/g, '')) / parseFloat(account.contributionLimit.replace(/[$,]/g, ''))) * 100)

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
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">TFSA Account</h1>
              <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                {account.accountStatus}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{account.name}</p>
            <p className="text-xs text-gray-500">Account #{account.id} • Opened {account.openDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-gray-200">
            <Upload className="w-4 h-4 mr-2" />
            Contribute
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Download className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200">
            <Receipt className="w-4 h-4 mr-2" />
            Statement
          </Button>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Account Value</span>
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{account.totalValue}</p>
              <div className={`flex items-center gap-1 ${account.isDailyPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {account.isDailyPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{account.dailyChange} today</span>
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
              <p className={`text-2xl font-bold ${account.totalGainLoss.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {account.totalGainLoss}
              </p>
              <p className="text-sm text-gray-500">Book Value: {account.bookValue}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Contribution Room</span>
              <PieChart className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{account.remainingRoom}</p>
              <p className="text-sm text-gray-500">of {account.contributionRoom} available</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">This Year</span>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">{account.contributedThisYear}</p>
              <p className="text-sm text-gray-500">of {account.contributionLimit} limit</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contribution Progress */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">2024 Contribution Progress</h3>
              <p className="text-sm text-gray-600">You've contributed {account.contributedThisYear} of your {account.contributionLimit} annual limit</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{Math.round(contributionProgress)}%</p>
              <p className="text-sm text-gray-500">Used</p>
            </div>
          </div>
          <Progress value={contributionProgress} className="h-3" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>$0</span>
            <span>{account.contributionLimit}</span>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border border-gray-200">
          <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
          <TabsTrigger value="holdings" className="text-sm">Holdings</TabsTrigger>
          <TabsTrigger value="contributions" className="text-sm">Contributions</TabsTrigger>
          <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Details */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Account Type</span>
                    <p className="font-medium text-gray-900">TFSA</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Currency</span>
                    <p className="font-medium text-gray-900">{account.currency}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Beneficiary</span>
                    <p className="font-medium text-gray-900">{account.beneficiary}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Updated</span>
                    <p className="font-medium text-gray-900">{account.lastUpdated}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-2">Tax Benefits</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tax-free growth on investments</li>
                    <li>• Tax-free withdrawals at any time</li>
                    <li>• Contribution room carries forward</li>
                    <li>• Withdrawal room is restored next year</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Make Contribution
                </Button>
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Set Up Auto-Contribution
                </Button>
                <Button variant="outline" className="w-full border-gray-200">
                  <Download className="w-4 h-4 mr-2" />
                  Request Withdrawal
                </Button>
                <Button variant="outline" className="w-full border-gray-200">
                  <Receipt className="w-4 h-4 mr-2" />
                  Tax Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="holdings" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Current Holdings</CardTitle>
              <p className="text-sm text-gray-600">Investment breakdown in your TFSA</p>
            </CardHeader>
            <CardContent>
              {account.holdings.length === 0 ? (
                <div className="text-center py-8">
                  <Banknote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Cash Position</h3>
                  <p className="text-gray-600 mb-4">This account currently holds cash. Consider investing to grow your savings tax-free.</p>
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
                            <p className="font-medium text-blue-600">{holding.symbol}</p>
                            <p className="text-sm text-gray-600">{holding.name.substring(0, 50)}...</p>
                          </div>
                        </TableCell>
                        <TableCell>{holding.units}</TableCell>
                        <TableCell>{holding.price}</TableCell>
                        <TableCell className="font-medium">{holding.marketValue}</TableCell>
                        <TableCell className={holding.gainLoss.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}>
                          {holding.gainLoss}
                        </TableCell>
                        <TableCell>{holding.weight}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contributions" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Contribution History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.contributions.map((contribution, index) => (
                    <TableRow key={index}>
                      <TableCell>{contribution.date}</TableCell>
                      <TableCell className="font-medium text-emerald-600">{contribution.amount}</TableCell>
                      <TableCell>{contribution.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {contribution.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Performance History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period</TableHead>
                    <TableHead>Account Value</TableHead>
                    <TableHead>Change ($)</TableHead>
                    <TableHead>Change (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {account.performanceHistory.map((performance, index) => {
                    const isPositive = performance.change.startsWith('+')
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{performance.period}</TableCell>
                        <TableCell>{performance.value}</TableCell>
                        <TableCell className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
                          {performance.change}
                        </TableCell>
                        <TableCell className={isPositive ? 'text-emerald-600' : 'text-red-600'}>
                          {performance.percentage}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}