"use client"

import { useState } from "react"
import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowLeft,
  PieChart,
  BarChart3,
  Target,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Settings,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import Link from "next/link"

export default function AssetAllocationPage() {
  const [currentAllocation, setCurrentAllocation] = useState({
    usStocks: 45,
    international: 20,
    bonds: 25,
    cash: 10
  })

  const [targetAllocation, setTargetAllocation] = useState({
    usStocks: 50,
    international: 25,
    bonds: 20,
    cash: 5
  })

  const [totalPortfolio, setTotalPortfolio] = useState(1000000)

  const assetClasses = [
    { name: 'US Stocks', key: 'usStocks', color: '#10B981', risk: 'High', return: '8-12%' },
    { name: 'International', key: 'international', color: '#3B82F6', risk: 'High', return: '7-11%' },
    { name: 'Bonds', key: 'bonds', color: '#8B5CF6', risk: 'Low', return: '3-6%' },
    { name: 'Cash', key: 'cash', color: '#F59E0B', risk: 'Very Low', return: '1-3%' }
  ]

  const currentData = assetClasses.map(asset => ({
    name: asset.name,
    value: currentAllocation[asset.key as keyof typeof currentAllocation],
    color: asset.color
  }))

  const targetData = assetClasses.map(asset => ({
    name: asset.name,
    value: targetAllocation[asset.key as keyof typeof targetAllocation],
    color: asset.color
  }))

  const rebalancingData = assetClasses.map(asset => {
    const current = currentAllocation[asset.key as keyof typeof currentAllocation]
    const target = targetAllocation[asset.key as keyof typeof targetAllocation]
    const difference = target - current
    const currentValue = (current / 100) * totalPortfolio
    const targetValue = (target / 100) * totalPortfolio
    const adjustment = targetValue - currentValue

    return {
      name: asset.name,
      current: current,
      target: target,
      difference: difference,
      adjustment: adjustment,
      color: asset.color
    }
  })

  const handleAllocationChange = (key: string, value: number) => {
    setCurrentAllocation(prev => ({ ...prev, [key]: value }))
  }

  const handleTargetChange = (key: string, value: number) => {
    setTargetAllocation(prev => ({ ...prev, [key]: value }))
  }

  const getRebalancingStatus = () => {
    const totalDeviation = rebalancingData.reduce((sum, asset) => sum + Math.abs(asset.difference), 0)
    if (totalDeviation < 5) return { status: 'Balanced', color: 'green', icon: CheckCircle }
    if (totalDeviation < 15) return { status: 'Minor Rebalancing', color: 'yellow', icon: AlertTriangle }
    return { status: 'Major Rebalancing', color: 'red', icon: AlertTriangle }
  }

  const rebalancingStatus = getRebalancingStatus()

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Asset Allocation</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Optimize your portfolio allocation and rebalancing strategy</p>
            </div>
          </div>
        </div>

        {/* Portfolio Value */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs text-gray-600 dark:text-gray-400">Total Portfolio Value</Label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">$</span>
                  <Input
                    type="number"
                    value={totalPortfolio}
                    onChange={(e) => setTotalPortfolio(parseInt(e.target.value))}
                    className="text-sm w-32"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${
                  rebalancingStatus.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                  rebalancingStatus.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                }`}>
                  <rebalancingStatus.icon className={`w-5 h-5 ${
                    rebalancingStatus.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    rebalancingStatus.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{rebalancingStatus.status}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Allocation */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Current Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={currentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {currentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  </RechartsPieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {assetClasses.map((asset) => (
                    <div key={asset.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: asset.color }}
                        ></div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</span>
                          <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <span>Risk: {asset.risk}</span>
                            <span>Return: {asset.return}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={currentAllocation[asset.key as keyof typeof currentAllocation]}
                          onChange={(e) => handleAllocationChange(asset.key, parseInt(e.target.value))}
                          className="w-16 text-sm text-center"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Target Allocation */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Target Allocation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={targetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {targetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  </RechartsPieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {assetClasses.map((asset) => (
                    <div key={asset.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#1F1F23] rounded-md">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: asset.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={targetAllocation[asset.key as keyof typeof targetAllocation]}
                          onChange={(e) => handleTargetChange(asset.key, parseInt(e.target.value))}
                          className="w-16 text-sm text-center"
                        />
                        <span className="text-xs text-gray-500">%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Rebalancing Analysis */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Rebalancing Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={rebalancingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'current' ? `${value}%` : `$${(value / 1000).toFixed(0)}K`,
                    name === 'current' ? 'Current' : name === 'target' ? 'Target' : 'Adjustment'
                  ]}
                />
                <Bar 
                  dataKey="current" 
                  fill="#6B7280" 
                  name="Current"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="#3B82F6" 
                  name="Target"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rebalancing Recommendations */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Rebalancing Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rebalancingData.map((asset) => {
                const needsRebalancing = Math.abs(asset.difference) > 2
                const isOverweight = asset.difference < -2
                const isUnderweight = asset.difference > 2

                return (
                  <div key={asset.name} className={`p-4 border rounded-lg ${
                    needsRebalancing 
                      ? isOverweight 
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: asset.color }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{asset.name}</span>
                      </div>
                      {needsRebalancing && (
                        <div className={`p-1 rounded ${
                          isOverweight ? 'bg-red-100 dark:bg-red-900/30' : 'bg-green-100 dark:bg-green-900/30'
                        }`}>
                          <span className={`text-xs font-medium ${
                            isOverweight ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'
                          }`}>
                            {isOverweight ? 'Overweight' : 'Underweight'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Current</span>
                        <span className="font-medium text-gray-900 dark:text-white">{asset.current}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Target</span>
                        <span className="font-medium text-gray-900 dark:text-white">{asset.target}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Difference</span>
                        <span className={`font-medium ${
                          asset.difference > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {asset.difference > 0 ? '+' : ''}{asset.difference}%
                        </span>
                      </div>
                      {needsRebalancing && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Adjustment</span>
                          <span className={`font-medium ${
                            asset.adjustment > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                          }`}>
                            {asset.adjustment > 0 ? '+' : ''}${(asset.adjustment / 1000).toFixed(0)}K
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3 pt-4">
              <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                <RefreshCw className="w-4 h-4 mr-2" />
                Auto-Rebalance
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Set Thresholds
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
} 