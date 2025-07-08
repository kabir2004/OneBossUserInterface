"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  BarChart3, 
  PieChart,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface MetricCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

function MetricCard({ title, value, change, isPositive, icon }: MetricCardProps) {
  return (
    <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3 text-gray-900 dark:text-white" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-gray-900 dark:text-white" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                {change}
              </span>
            </div>
          </div>
          <div className="p-2 bg-gray-100 dark:bg-[#1F1F23] rounded-md">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Sample data for charts
const performanceData = [
  { month: 'Jan', portfolio: 3800000, benchmark: 3750000 },
  { month: 'Feb', portfolio: 3950000, benchmark: 3820000 },
  { month: 'Mar', portfolio: 4100000, benchmark: 3880000 },
  { month: 'Apr', portfolio: 3980000, benchmark: 3920000 },
  { month: 'May', portfolio: 4150000, benchmark: 3980000 },
  { month: 'Jun', portfolio: 4195392, benchmark: 4050000 },
]

const allocationData = [
  { name: 'Stocks', value: 45, color: '#10B981' },
  { name: 'Bonds', value: 25, color: '#3B82F6' },
  { name: 'ETFs', value: 20, color: '#8B5CF6' },
  { name: 'Cash', value: 10, color: '#F59E0B' },
]

const sectorData = [
  { sector: 'Technology', allocation: 35, performance: 12.4 },
  { sector: 'Healthcare', allocation: 18, performance: 8.2 },
  { sector: 'Financial', allocation: 15, performance: 6.8 },
  { sector: 'Consumer', allocation: 12, performance: 4.5 },
  { sector: 'Energy', allocation: 8, performance: -2.1 },
  { sector: 'Other', allocation: 12, performance: 3.2 },
]

const tradingData = [
  { day: 'Mon', buy: 12, sell: 8 },
  { day: 'Tue', buy: 15, sell: 11 },
  { day: 'Wed', buy: 8, sell: 14 },
  { day: 'Thu', buy: 18, sell: 9 },
  { day: 'Fri', buy: 22, sell: 7 },
]

const riskMetrics = [
  { metric: 'Sharpe Ratio', value: 1.85, target: 1.5 },
  { metric: 'Beta', value: 0.92, target: 1.0 },
  { metric: 'Alpha', value: 2.4, target: 0.0 },
  { metric: 'Max Drawdown', value: -8.2, target: -10.0 },
]

const clientData = [
  { range: '$0-50K', clients: 12, avgReturn: 6.2 },
  { range: '$50K-100K', clients: 18, avgReturn: 8.1 },
  { range: '$100K-250K', clients: 10, avgReturn: 9.8 },
  { range: '$250K+', clients: 7, avgReturn: 11.4 },
]

export default function AnalyticsContent() {
  const [timeframe, setTimeframe] = useState("1M")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }
    
    checkDarkMode()
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  // Theme-aware colors
  const colors = {
    text: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    grid: isDarkMode ? '#374151' : '#E5E7EB',
    background: isDarkMode ? '#0F0F12' : '#FFFFFF',
    border: isDarkMode ? '#1F1F23' : '#E5E7EB',
    primary: isDarkMode ? '#FFFFFF' : '#000000',
    secondary: isDarkMode ? '#9CA3AF' : '#6B7280',
    success: isDarkMode ? '#10B981' : '#059669',
    danger: isDarkMode ? '#EF4444' : '#DC2626',
    warning: isDarkMode ? '#F59E0B' : '#D97706',
    info: isDarkMode ? '#3B82F6' : '#2563EB',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Portfolio performance and trading insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border border-gray-200 dark:border-[#1F1F23]">
            <Calendar className="w-4 h-4 mr-2" />
            {timeframe}
          </Button>
          <Button variant="outline" size="sm" className="border border-gray-200 dark:border-[#1F1F23]">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value="$4,195,392"
          change="+12.4%"
          isPositive={true}
          icon={<DollarSign className="w-4 h-4 text-gray-900 dark:text-white" />}
        />
        <MetricCard
          title="Monthly Return"
          value="+8.2%"
          change="+2.1%"
          isPositive={true}
          icon={<TrendingUp className="w-4 h-4 text-gray-900 dark:text-white" />}
        />
        <MetricCard
          title="Active Clients"
          value="47"
          change="+3"
          isPositive={true}
          icon={<Users className="w-4 h-4 text-gray-900 dark:text-white" />}
        />
        <MetricCard
          title="Trading Volume"
          value="$892K"
          change="-5.2%"
          isPositive={false}
          icon={<Activity className="w-4 h-4 text-gray-900 dark:text-white" />}
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-[#1F1F23] border border-gray-200 dark:border-[#1F1F23]">
          <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
          <TabsTrigger value="allocation" className="text-xs">Allocation</TabsTrigger>
          <TabsTrigger value="trading" className="text-xs">Trading</TabsTrigger>
          <TabsTrigger value="clients" className="text-xs">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
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
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']}
                      labelStyle={{ color: colors.text }}
                      contentStyle={{ 
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="portfolio" 
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
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                    <span className="text-gray-600 dark:text-gray-400">Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                    <span className="text-gray-600 dark:text-gray-400">Benchmark</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Risk Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {riskMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{metric.metric}</span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{metric.value}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">/ {metric.target}</span>
                      </div>
                    </div>
                  ))}
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
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Sector Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sectorData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis 
                      type="number" 
                      stroke={colors.textSecondary}
                      fontSize={12}
                      tick={{ fill: colors.textSecondary }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <YAxis 
                      dataKey="sector" 
                      type="category" 
                      stroke={colors.textSecondary}
                      fontSize={12}
                      width={80}
                      tick={{ fill: colors.textSecondary }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, '']}
                      contentStyle={{ 
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Bar dataKey="performance" fill={colors.primary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Trading Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tradingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis 
                      dataKey="day" 
                      stroke={colors.textSecondary} 
                      fontSize={12}
                      tick={{ fill: colors.textSecondary }}
                    />
                    <YAxis 
                      stroke={colors.textSecondary} 
                      fontSize={12}
                      tick={{ fill: colors.textSecondary }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Bar dataKey="buy" fill={colors.success} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sell" fill={colors.danger} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex items-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.success }}></div>
                    <span className="text-gray-600 dark:text-gray-400">Buy Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: colors.danger }}></div>
                    <span className="text-gray-600 dark:text-gray-400">Sell Orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4">
              <MetricCard
                title="Buy Orders"
                value="127"
                change="+15"
                isPositive={true}
                icon={<ArrowUpRight className="w-4 h-4 text-gray-900 dark:text-white" />}
              />
              <MetricCard
                title="Sell Orders"
                value="89"
                change="+8"
                isPositive={true}
                icon={<ArrowDownRight className="w-4 h-4 text-gray-900 dark:text-white" />}
              />
              <MetricCard
                title="Success Rate"
                value="94.2%"
                change="+1.2%"
                isPositive={true}
                icon={<Target className="w-4 h-4 text-gray-900 dark:text-white" />}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Client Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clientData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                    <XAxis 
                      dataKey="range" 
                      stroke={colors.textSecondary} 
                      fontSize={12}
                      tick={{ fill: colors.textSecondary }}
                    />
                    <YAxis 
                      stroke={colors.textSecondary} 
                      fontSize={12}
                      tick={{ fill: colors.textSecondary }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                    <Bar dataKey="clients" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Client Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Clients</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$89.2K</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Avg Portfolio</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">New This Month</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8★</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 