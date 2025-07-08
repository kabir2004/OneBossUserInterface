"use client"

import { useState } from "react"
import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  DollarSign,
  TrendingDown,
  TrendingUp,
  Calculator,
  Target,
  Calendar,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  RefreshCw
} from "lucide-react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import Link from "next/link"

export default function TaxOptimizerPage() {
  const [taxYear, setTaxYear] = useState('2024')
  const [incomeBracket, setIncomeBracket] = useState('24')
  const [portfolioValue, setPortfolioValue] = useState(500000)

  const taxBrackets = [
    { rate: '10', min: 0, max: 11600, label: '10% ($0 - $11,600)' },
    { rate: '12', min: 11601, max: 47150, label: '12% ($11,601 - $47,150)' },
    { rate: '22', min: 47151, max: 100525, label: '22% ($47,151 - $100,525)' },
    { rate: '24', min: 100526, max: 191950, label: '24% ($100,526 - $191,950)' },
    { rate: '32', min: 191951, max: 243725, label: '32% ($191,951 - $243,725)' },
    { rate: '35', min: 243726, max: 609350, label: '35% ($243,726 - $609,350)' },
    { rate: '37', min: 609351, max: Infinity, label: '37% ($609,351+)' }
  ]

  const portfolioHoldings = [
    { name: 'VTI - Vanguard Total Stock Market', shares: 1000, costBasis: 150, currentPrice: 180, gainLoss: 30000, type: 'ETF' },
    { name: 'VXUS - Vanguard Total International', shares: 500, costBasis: 45, currentPrice: 42, gainLoss: -1500, type: 'ETF' },
    { name: 'BND - Vanguard Total Bond Market', shares: 800, costBasis: 80, currentPrice: 78, gainLoss: -1600, type: 'ETF' },
    { name: 'AAPL - Apple Inc.', shares: 100, costBasis: 120, currentPrice: 175, gainLoss: 5500, type: 'Stock' },
    { name: 'MSFT - Microsoft Corp.', shares: 50, costBasis: 200, currentPrice: 380, gainLoss: 9000, type: 'Stock' }
  ]

  const taxLossHarvestingOpportunities = portfolioHoldings
    .filter(holding => holding.gainLoss < 0)
    .map(holding => ({
      ...holding,
      taxSavings: Math.abs(holding.gainLoss) * 0.15, // 15% capital gains rate
      recommendation: `Consider selling ${holding.name} to realize ${Math.abs(holding.gainLoss).toLocaleString()} in losses`
    }))

  const taxEfficientFunds = [
    { name: 'VTI - Vanguard Total Stock Market ETF', expenseRatio: 0.03, taxEfficiency: 95, recommendation: 'Excellent' },
    { name: 'VXUS - Vanguard Total International ETF', expenseRatio: 0.08, taxEfficiency: 92, recommendation: 'Good' },
    { name: 'BND - Vanguard Total Bond Market ETF', expenseRatio: 0.03, taxEfficiency: 85, recommendation: 'Good' },
    { name: 'VEA - Vanguard FTSE Developed Markets ETF', expenseRatio: 0.05, taxEfficiency: 94, recommendation: 'Excellent' },
    { name: 'VWO - Vanguard FTSE Emerging Markets ETF', expenseRatio: 0.08, taxEfficiency: 88, recommendation: 'Good' }
  ]

  const taxOptimizationData = [
    { category: 'Tax-Loss Harvesting', potential: 4500, current: 0, color: '#10B981' },
    { category: 'Tax-Efficient Funds', potential: 1200, current: 800, color: '#3B82F6' },
    { category: 'Asset Location', potential: 2100, current: 1500, color: '#8B5CF6' },
    { category: 'Dividend Optimization', potential: 800, current: 600, color: '#F59E0B' }
  ]

  const totalGainLoss = portfolioHoldings.reduce((sum, holding) => sum + holding.gainLoss, 0)
  const totalTaxSavings = taxLossHarvestingOpportunities.reduce((sum, opp) => sum + opp.taxSavings, 0)
  const selectedBracket = taxBrackets.find(bracket => bracket.rate === incomeBracket)

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/tools">
              <Button variant="outline" size="sm" className="border border-gray-200 dark:border-[#1F1F23]">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tax Optimizer</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Optimize your portfolio for tax efficiency</p>
            </div>
          </div>
        </div>

        {/* Tax Profile */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-gray-600 dark:text-gray-400">Tax Year</Label>
                <Select value={taxYear} onValueChange={setTaxYear}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-gray-600 dark:text-gray-400">Income Bracket</Label>
                <Select value={incomeBracket} onValueChange={setIncomeBracket}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {taxBrackets.map((bracket) => (
                      <SelectItem key={bracket.rate} value={bracket.rate}>
                        {bracket.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-600 dark:text-gray-400">Portfolio Value</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">$</span>
                  <Input
                    type="number"
                    value={portfolioValue}
                    onChange={(e) => setPortfolioValue(parseInt(e.target.value))}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Capital Gains Rate</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {selectedBracket ? Math.min(parseInt(selectedBracket.rate) * 0.85, 20) : 15}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Gain/Loss</p>
                  <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${(totalGainLoss / 1000).toFixed(1)}K
                  </p>
                </div>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-500" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Tax Savings Potential</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${(totalTaxSavings / 1000).toFixed(1)}K
                  </p>
                </div>
                <Calculator className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Loss Harvesting</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {taxLossHarvestingOpportunities.length}
                  </p>
                </div>
                <Target className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Tax Efficiency Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tax-Loss Harvesting Opportunities */}
          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Tax-Loss Harvesting Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {taxLossHarvestingOpportunities.length > 0 ? (
                taxLossHarvestingOpportunities.map((opportunity, index) => (
                  <div key={index} className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">{opportunity.name}</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">
                        ${opportunity.taxSavings.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-red-700 dark:text-red-300 mb-2">
                      {opportunity.recommendation}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Harvest Loss
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Alternatives
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">No tax-loss harvesting opportunities found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tax Optimization Chart */}
          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Tax Optimization Potential</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taxOptimizationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="category" 
                    stroke="#6B7280"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Bar 
                    dataKey="potential" 
                    fill="#10B981" 
                    name="Potential Savings"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="current" 
                    fill="#6B7280" 
                    name="Current Savings"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Holdings & Tax Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-[#1F1F23]">
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Holding</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Shares</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Cost Basis</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Current Price</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Gain/Loss</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Tax Impact</th>
                    <th className="text-left py-2 text-gray-600 dark:text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioHoldings.map((holding, index) => {
                    const taxImpact = holding.gainLoss * 0.15 // 15% capital gains rate
                    const isLoss = holding.gainLoss < 0
                    
                    return (
                      <tr key={index} className="border-b border-gray-100 dark:border-[#1F1F23]">
                        <td className="py-2">
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white">{holding.name}</span>
                            <span className="text-xs text-gray-500 ml-2">{holding.type}</span>
                          </div>
                        </td>
                        <td className="py-2 text-gray-900 dark:text-white">{holding.shares.toLocaleString()}</td>
                        <td className="py-2 text-gray-900 dark:text-white">${holding.costBasis}</td>
                        <td className="py-2 text-gray-900 dark:text-white">${holding.currentPrice}</td>
                        <td className={`py-2 font-medium ${isLoss ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                          ${holding.gainLoss.toLocaleString()}
                        </td>
                        <td className={`py-2 font-medium ${isLoss ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          ${Math.abs(taxImpact).toLocaleString()}
                        </td>
                        <td className="py-2">
                          {isLoss ? (
                            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                              Harvest
                            </Button>
                          ) : (
                            <span className="text-xs text-gray-500">Hold</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Tax-Efficient Fund Recommendations */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Tax-Efficient Fund Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {taxEfficientFunds.map((fund, index) => (
                <div key={index} className="p-4 border border-gray-200 dark:border-[#1F1F23] rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{fund.name}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      fund.recommendation === 'Excellent' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                      'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {fund.recommendation}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Expense Ratio</span>
                      <span className="font-medium text-gray-900 dark:text-white">{fund.expenseRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax Efficiency</span>
                      <span className="font-medium text-gray-900 dark:text-white">{fund.taxEfficiency}%</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tax Planning Strategies */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Tax Planning Strategies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Asset Location</span>
                </div>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
                  Place tax-inefficient investments in tax-advantaged accounts and tax-efficient investments in taxable accounts.
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                  Optimize Location
                </Button>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">Tax-Loss Harvesting</span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mb-3">
                  Sell investments at a loss to offset gains and reduce your tax liability.
                </p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                  Find Opportunities
                </Button>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Timing Strategies</span>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300 mb-3">
                  Time your sales to minimize tax impact and maximize after-tax returns.
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white text-xs">
                  Plan Timing
                </Button>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-800 dark:text-orange-200">Dividend Optimization</span>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
                  Choose tax-efficient dividend-paying investments and optimize dividend timing.
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white text-xs">
                  Optimize Dividends
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
} 