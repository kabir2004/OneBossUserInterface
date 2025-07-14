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
    <Card className="border border-gray-200 bg-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-600">{title}</p>
            <p className="text-heading-1 text-gray-900">{value}</p>
            <div className="flex items-center gap-1 mt-1">
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3 text-gray-900" />
              ) : (
                <ArrowDownRight className="w-3 h-3 text-gray-900" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-gray-900' : 'text-gray-600'}`}>
                {change}
              </span>
            </div>
          </div>
          <div className="p-2 bg-gray-100 rounded-md">
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

// Comprehensive Allocation Data
const assetAllocationData = [
  { name: 'Equity', value: 45, color: '#10B981' },
  { name: 'Fixed Income', value: 25, color: '#3B82F6' },
  { name: 'ETFs', value: 20, color: '#8B5CF6' },
  { name: 'Cash & Equivalents', value: 10, color: '#F59E0B' },
]

const sectorAllocationData = [
  { name: 'Technology', value: 35, color: '#10B981' },
  { name: 'Healthcare', value: 18, color: '#3B82F6' },
  { name: 'Financial Services', value: 15, color: '#8B5CF6' },
  { name: 'Consumer Discretionary', value: 12, color: '#F59E0B' },
  { name: 'Energy', value: 8, color: '#EF4444' },
  { name: 'Industrials', value: 7, color: '#8B5CF6' },
  { name: 'Materials', value: 3, color: '#06B6D4' },
  { name: 'Real Estate', value: 2, color: '#84CC16' },
]

const geographicAllocationData = [
  { name: 'North America', value: 65, color: '#10B981' },
  { name: 'International Developed', value: 20, color: '#3B82F6' },
  { name: 'Emerging Markets', value: 10, color: '#8B5CF6' },
  { name: 'Other', value: 5, color: '#F59E0B' },
]

const marketCapAllocationData = [
  { name: 'Large Cap', value: 50, color: '#10B981' },
  { name: 'Mid Cap', value: 25, color: '#3B82F6' },
  { name: 'Small Cap', value: 15, color: '#8B5CF6' },
  { name: 'International', value: 10, color: '#F59E0B' },
]

const sectorPerformanceData = [
  { sector: 'Technology', allocation: 35, performance: 12.4, color: '#10B981' },
  { sector: 'Healthcare', allocation: 18, performance: 8.2, color: '#3B82F6' },
  { sector: 'Financial Services', allocation: 15, performance: 6.8, color: '#8B5CF6' },
  { sector: 'Consumer Discretionary', allocation: 12, performance: 4.5, color: '#F59E0B' },
  { sector: 'Energy', allocation: 8, performance: -2.1, color: '#EF4444' },
  { sector: 'Industrials', allocation: 7, performance: 3.2, color: '#8B5CF6' },
  { sector: 'Materials', allocation: 3, performance: 1.8, color: '#06B6D4' },
  { sector: 'Real Estate', allocation: 2, performance: -0.5, color: '#84CC16' },
]


// Plans and Holdings Data for Donut Chart
const plansData = [
  { 
    name: "TFSA", 
    value: 1391059.48, // $14,582.16 + $1,376,850
    color: "#10B981",
    holdings: [
      { name: "Fidelity Global Income Portfolio", value: 2774.81, color: "#34D399" },
      { name: "Fidelity Global Income Portfolio DSC", value: 33326.39, color: "#6EE7B7" },
      { name: "Fidelity Global Intrinsic Value", value: 33326.39, color: "#A7F3D0" },
      { name: "Diversified Equity Portfolio", value: 813675.00, color: "#D1FAE5" },
      { name: "Balanced Income Portfolio", value: 563692.50, color: "#ECFDF5" }
    ]
  },
  { 
    name: "RRSP", 
    value: 533477.32, // $77,477.32 + $456,000
    color: "#3B82F6",
    holdings: [
      { name: "Vanguard Total Stock Market", value: 374300.00, color: "#60A5FA" },
      { name: "Vanguard Total International", value: 81656.00, color: "#93C5FD" },
      { name: "Cash Position", value: 77521.32, color: "#DBEAFE" }
    ]
  },
  { 
    name: "RESP", 
    value: 847392.00,
    color: "#8B5CF6",
    holdings: [
      { name: "Tesla Inc Common Stock", value: 306650.00, color: "#A78BFA" },
      { name: "Apple Inc Common Stock", value: 389844.00, color: "#C4B5FD" },
      { name: "NVIDIA Corp Common Stock", value: 149996.00, color: "#DDD6FE" }
    ]
  },
  { 
    name: "RDSP", 
    value: 623150.00,
    color: "#F59E0B",
    holdings: [
      { name: "TD Canadian Bond Index Fund", value: 167632.50, color: "#FBBF24" },
      { name: "Johnson & Johnson Common Stock", value: 300037.50, color: "#FCD34D" },
      { name: "Procter & Gamble Common Stock", value: 155040.00, color: "#FDE68A" }
    ]
  },
  { 
    name: "RRIF", 
    value: 892000.00,
    color: "#EF4444",
    holdings: [
      { name: "SPDR S&P 500 ETF Trust", value: 534960.00, color: "#F87171" },
      { name: "Invesco QQQ Trust Series 1", value: 357038.50, color: "#FCA5A5" }
    ]
  }
]

// Flatten all holdings for the detailed donut chart
const allHoldingsData = plansData.flatMap(plan => 
  plan.holdings.map(holding => ({
    name: `${plan.name} - ${holding.name}`,
    value: holding.value,
    color: holding.color,
    plan: plan.name
  }))
)


export default function AnalyticsContent() {
  const [timeframe, setTimeframe] = useState("1M")
  // Static colors for light mode
  const colors = {
    text: '#111827',
    textSecondary: '#6B7280',
    grid: '#E5E7EB',
    background: '#FFFFFF',
    border: '#E5E7EB',
    primary: '#000000',
    secondary: '#6B7280',
    success: '#059669',
    danger: '#DC2626',
    warning: '#D97706',
    info: '#2563EB',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 text-gray-900">Analytics</h1>
          <p className="text-body text-gray-600 mt-1">Portfolio performance and trading insights</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border border-gray-200">
            <Calendar className="w-4 h-4 mr-2" />
            {timeframe}
          </Button>
          <Button variant="outline" size="sm" className="border border-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value="$4,287,451"
          change="+12.4%"
          isPositive={true}
          icon={<DollarSign className="w-4 h-4 text-gray-900" />}
        />
        <MetricCard
          title="Monthly Return"
          value="+8.2%"
          change="+2.1%"
          isPositive={true}
          icon={<TrendingUp className="w-4 h-4 text-gray-900" />}
        />
        <MetricCard
          title="Active Clients"
          value="47"
          change="+3"
          isPositive={true}
          icon={<Users className="w-4 h-4 text-gray-900" />}
        />
        <MetricCard
          title="Trading Volume"
          value="$892K"
          change="-5.2%"
          isPositive={false}
          icon={<Activity className="w-4 h-4 text-gray-900" />}
        />
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-gray-200">
          <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
          <TabsTrigger value="allocation" className="text-xs">Allocation</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900">Portfolio Performance</CardTitle>
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
                    <span className="text-gray-600">Portfolio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                    <span className="text-gray-600">Benchmark</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900">Plans & Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={allHoldingsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {allHoldingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                      contentStyle={{ 
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '8px',
                        color: colors.text
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-2 mt-4 max-h-32 overflow-y-auto">
                  {plansData.map((plan, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                        <span className="text-xs font-medium text-gray-900">{plan.name}</span>
                      </div>
                      <span className="text-xs font-bold text-gray-900">${plan.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          {/* Asset Allocation */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {assetAllocationData.map((entry, index) => (
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
                {assetAllocationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Multiple Allocation Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sector Allocation */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900">Sector Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={sectorAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sectorAllocationData.map((entry, index) => (
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
                <div className="grid grid-cols-1 gap-1 mt-3 max-h-24 overflow-y-auto">
                  {sectorAllocationData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600 truncate">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographic Allocation */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900">Geographic Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={geographicAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {geographicAllocationData.map((entry, index) => (
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
                <div className="grid grid-cols-1 gap-1 mt-3">
                  {geographicAllocationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600 truncate">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Cap Allocation */}
            <Card className="border border-gray-200 bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900">Market Cap Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={marketCapAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {marketCapAllocationData.map((entry, index) => (
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
                <div className="grid grid-cols-1 gap-1 mt-3">
                  {marketCapAllocationData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600 truncate">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sector Performance */}
          <Card className="border border-gray-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-900">Sector Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sectorPerformanceData} layout="horizontal">
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
                    width={120}
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
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                {sectorPerformanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-xs font-medium text-gray-900 truncate">{item.sector}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold ${item.performance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.performance >= 0 ? '+' : ''}{item.performance}%
                      </span>
                      <div className="text-xs text-gray-500">{item.allocation}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>
    </div>
  )
} 