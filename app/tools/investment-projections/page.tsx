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
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Target,
  DollarSign,
  Calendar,
  Zap,
  Shield,
  Rocket
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import Link from "next/link"

export default function InvestmentProjectionsPage() {
  const [scenario, setScenario] = useState('moderate')
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [monthlyContribution, setMonthlyContribution] = useState(1000)
  const [timeHorizon, setTimeHorizon] = useState(20)

  const scenarios = {
    conservative: { return: 5, volatility: 8, color: '#10B981' },
    moderate: { return: 8, volatility: 15, color: '#3B82F6' },
    aggressive: { return: 12, volatility: 22, color: '#EF4444' }
  }

  const selectedScenario = scenarios[scenario as keyof typeof scenarios]

  // Generate projection data with Monte Carlo simulation
  const generateProjectionData = () => {
    const data = []
    const monthlyRate = selectedScenario.return / 100 / 12
    const months = timeHorizon * 12
    
    for (let month = 0; month <= months; month += 12) {
      const year = month / 12
      
      // Calculate deterministic projection
      const futureValue = initialInvestment * Math.pow(1 + selectedScenario.return / 100, year)
      const futureContributions = monthlyContribution * 
        (Math.pow(1 + monthlyRate, month) - 1) / monthlyRate
      
      const totalValue = futureValue + futureContributions
      
      // Add some Monte Carlo variation
      const variation = 1 + (Math.random() - 0.5) * selectedScenario.volatility / 100
      const projectedValue = totalValue * variation
      
      data.push({
        year,
        projected: Math.round(projectedValue),
        conservative: Math.round(totalValue * 0.8),
        aggressive: Math.round(totalValue * 1.3),
        contributions: Math.round(monthlyContribution * month)
      })
    }
    
    return data
  }

  const projectionData = generateProjectionData()

  const finalValue = projectionData[projectionData.length - 1]?.projected || 0
  const totalContributions = monthlyContribution * timeHorizon * 12
  const investmentGrowth = finalValue - totalContributions

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Projections</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Explore different investment scenarios and strategies</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Investment Parameters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Initial Investment</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <Input
                      type="number"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Monthly Contribution</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <Input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Time Horizon</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={timeHorizon}
                      onChange={(e) => setTimeHorizon(parseInt(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-xs text-gray-500">years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Risk Scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={scenario} onValueChange={setScenario}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        Conservative (5% return)
                      </div>
                    </SelectItem>
                    <SelectItem value="moderate">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        Moderate (8% return)
                      </div>
                    </SelectItem>
                    <SelectItem value="aggressive">
                      <div className="flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-red-500" />
                        Aggressive (12% return)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Expected Return</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{selectedScenario.return}%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Volatility</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{selectedScenario.volatility}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs">
                  <Zap className="w-4 h-4 mr-2" />
                  Run Monte Carlo
                </Button>
                <Button variant="outline" className="w-full text-xs">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare Scenarios
                </Button>
                <Button variant="outline" className="w-full text-xs">
                  <Calendar className="w-4 h-4 mr-2" />
                  Save Projection
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Final Value</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(finalValue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Contributions</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(totalContributions / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Investment Growth</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(investmentGrowth / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projection Chart */}
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Investment Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="year" 
                      stroke="#6B7280"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      fontSize={12}
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="projected" 
                      stroke={selectedScenario.color}
                      fill={selectedScenario.color}
                      fillOpacity={0.3}
                      strokeWidth={2}
                      name="Projected Value"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conservative" 
                      stroke="#10B981" 
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Conservative"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="aggressive" 
                      stroke="#EF4444" 
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      dot={false}
                      name="Aggressive"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Scenario Comparison */}
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Scenario Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(scenarios).map(([key, config]) => {
                    const finalValue = initialInvestment * Math.pow(1 + config.return / 100, timeHorizon) +
                      monthlyContribution * (Math.pow(1 + config.return / 100 / 12, timeHorizon * 12) - 1) / (config.return / 100 / 12)
                    
                    return (
                      <div key={key} className="p-4 border border-gray-200 dark:border-[#1F1F23] rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: config.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {key}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Return</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">{config.return}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Final Value</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              ${(finalValue / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Risk Level</span>
                            <span className="text-xs font-medium text-gray-900 dark:text-white">
                              {key === 'conservative' ? 'Low' : key === 'moderate' ? 'Medium' : 'High'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Risk Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Best Case Scenario</span>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      With above-average returns, your portfolio could reach ${(finalValue * 1.3 / 1000000).toFixed(1)}M.
                    </p>
                  </div>

                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">Worst Case Scenario</span>
                    </div>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      With below-average returns, your portfolio could reach ${(finalValue * 0.7 / 1000000).toFixed(1)}M.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Risk Management</span>
                  </div>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Consider diversifying across different asset classes and rebalancing regularly to manage risk.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
} 