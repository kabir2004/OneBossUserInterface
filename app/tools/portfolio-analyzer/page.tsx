"use client"

import { useState } from "react"
import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  PieChart,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import Link from "next/link"

// Sample portfolio data
const portfolioData = [
  { month: 'Jan', value: 100000, benchmark: 100000 },
  { month: 'Feb', value: 105000, benchmark: 102000 },
  { month: 'Mar', value: 112000, benchmark: 104000 },
  { month: 'Apr', value: 108000, benchmark: 106000 },
  { month: 'May', value: 115000, benchmark: 108000 },
  { month: 'Jun', value: 120000, benchmark: 110000 },
]

const allocationData = [
  { name: 'US Stocks', value: 45, color: '#10B981' },
  { name: 'International', value: 20, color: '#3B82F6' },
  { name: 'Bonds', value: 25, color: '#8B5CF6' },
  { name: 'Cash', value: 10, color: '#F59E0B' },
]

const riskMetrics = [
  { metric: 'Sharpe Ratio', value: 1.85, target: 1.5, status: 'good' },
  { metric: 'Beta', value: 0.92, target: 1.0, status: 'good' },
  { metric: 'Alpha', value: 2.4, target: 0.0, status: 'excellent' },
  { metric: 'Max Drawdown', value: -8.2, target: -10.0, status: 'good' },
  { metric: 'Volatility', value: 12.5, target: 15.0, status: 'good' },
]

export default function PortfolioAnalyzerPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Theme-aware colors
  const colors = {
    text: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    grid: isDarkMode ? '#374151' : '#E5E7EB',
    background: isDarkMode ? '#0F0F12' : '#FFFFFF',
    border: isDarkMode ? '#1F1F23' : '#E5E7EB',
    primary: isDarkMode ? '#FFFFFF' : '#000000',
    secondary: isDarkMode ? '#9CA3AF' : '#6B7280',
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'good':
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio Analyzer</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive portfolio analysis and risk assessment</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$120,000</p>
                  <p className="text-xs text-green-600 dark:text-green-400">+20% YTD</p>
                </div>
                <DollarSign className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Return</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">+12.4%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">vs 8.2% benchmark</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Risk Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">7.2/10</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">Moderate</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Diversification</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
                  <p className="text-xs text-green-600 dark:text-green-400">Excellent</p>
                </div>
                <PieChart className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#1F1F23]">
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="allocation" className="text-xs">Allocation</TabsTrigger>
            <TabsTrigger value="risk" className="text-xs">Risk Analysis</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={portfolioData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                      <XAxis 
                        dataKey="month" 
                        stroke={colors.textSecondary}
                        fontSize={12}
                        tick={{ fill: colors.textSecondary }}
                      />
                      <YAxis 
                        stroke={colors.textSecondary}
                        fontSize={12}
                        tick={{ fill: colors.textSecondary }}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']}
                        contentStyle={{ 
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          color: colors.text
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={colors.primary} 
                        strokeWidth={2}
                        dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="benchmark" 
                        stroke={colors.secondary} 
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        dot={{ fill: colors.secondary, strokeWidth: 1, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Performance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Total Return</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">+20.0%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Annualized Return</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">+12.4%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Best Month</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">March (+6.7%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Worst Month</span>
                      <span className="text-sm font-bold text-red-600 dark:text-red-400">April (-3.6%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="allocation" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Asset Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, '']}
                        contentStyle={{ 
                          backgroundColor: colors.background,
                          border: `1px solid ${colors.border}`,
                          borderRadius: '8px',
                          color: colors.text
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {allocationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Allocation Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Well Diversified</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">Your portfolio shows good diversification across asset classes.</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Balanced Risk</span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300">Risk allocation is appropriate for your investment goals.</p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Consider International</span>
                      </div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300">You might benefit from increased international exposure.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Risk Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {riskMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(metric.status)}
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{metric.metric}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{metric.value}</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">/ {metric.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Low Volatility</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">Your portfolio shows below-average volatility.</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Good Sharpe Ratio</span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300">Risk-adjusted returns are above average.</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Controlled Drawdown</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300">Maximum drawdown is within acceptable limits.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Increase International Exposure</span>
                      </div>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                        Consider adding 5-10% more international stocks to improve diversification and capture global growth opportunities.
                      </p>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                        View International ETFs
                      </Button>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-800 dark:text-green-200">Maintain Current Allocation</span>
                      </div>
                      <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                        Your current asset allocation is well-balanced and aligned with your risk tolerance and investment goals.
                      </p>
                    </div>

                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Consider Rebalancing</span>
                      </div>
                      <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-2">
                        Your portfolio has drifted slightly from target allocations. Consider rebalancing within the next quarter.
                      </p>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs">
                        Rebalancing Calculator
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
} 