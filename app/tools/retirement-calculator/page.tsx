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
  Calculator,
  DollarSign,
  Calendar,
  TrendingUp,
  Target,
  Users,
  Home
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import Link from "next/link"

export default function RetirementCalculatorPage() {
  const [formData, setFormData] = useState({
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 100000,
    monthlyContribution: 1000,
    expectedReturn: 7,
    inflationRate: 2.5,
    desiredIncome: 80000,
    socialSecurity: 25000
  })

  const [results, setResults] = useState({
    totalNeeded: 2000000,
    projectedSavings: 1800000,
    gap: 200000,
    monthlyNeeded: 1200
  })

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    calculateRetirement()
  }

  const calculateRetirement = () => {
    // Simplified calculation for demo
    const yearsToRetirement = formData.retirementAge - formData.currentAge
    const yearsInRetirement = 30 // Assume 30 years in retirement
    
    // Calculate future value of current savings
    const futureValue = formData.currentSavings * Math.pow(1 + formData.expectedReturn / 100, yearsToRetirement)
    
    // Calculate future value of monthly contributions
    const monthlyRate = formData.expectedReturn / 100 / 12
    const months = yearsToRetirement * 12
    const futureContributions = formData.monthlyContribution * 
      (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
    
    const projectedSavings = futureValue + futureContributions
    
    // Calculate needed retirement income (adjusted for inflation)
    const inflationAdjustedIncome = formData.desiredIncome * 
      Math.pow(1 + formData.inflationRate / 100, yearsToRetirement)
    
    // Calculate total needed (simplified)
    const totalNeeded = (inflationAdjustedIncome - formData.socialSecurity) * yearsInRetirement
    
    const gap = Math.max(0, totalNeeded - projectedSavings)
    const monthlyNeeded = gap > 0 ? gap / (yearsToRetirement * 12) : 0
    
    setResults({
      totalNeeded: Math.round(totalNeeded),
      projectedSavings: Math.round(projectedSavings),
      gap: Math.round(gap),
      monthlyNeeded: Math.round(monthlyNeeded)
    })
  }

  // Generate projection data
  const generateProjectionData = () => {
    const data = []
    const yearsToRetirement = formData.retirementAge - formData.currentAge
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      const currentAge = formData.currentAge + year
      const futureValue = formData.currentSavings * Math.pow(1 + formData.expectedReturn / 100, year)
      const monthlyRate = formData.expectedReturn / 100 / 12
      const months = year * 12
      const futureContributions = formData.monthlyContribution * 
        (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate
      
      data.push({
        age: currentAge,
        savings: Math.round(futureValue + futureContributions),
        target: Math.round(results.totalNeeded * (year / yearsToRetirement))
      })
    }
    
    return data
  }

  const projectionData = generateProjectionData()

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Retirement Calculator</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Plan your retirement with comprehensive financial projections</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Current Age</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formData.currentAge}
                      onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-xs text-gray-500">years</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Retirement Age</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formData.retirementAge}
                      onChange={(e) => handleInputChange('retirementAge', parseInt(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-xs text-gray-500">years</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Current Savings</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <Input
                      type="number"
                      value={formData.currentSavings}
                      onChange={(e) => handleInputChange('currentSavings', parseInt(e.target.value))}
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
                      value={formData.monthlyContribution}
                      onChange={(e) => handleInputChange('monthlyContribution', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Investment Assumptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Expected Annual Return</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formData.expectedReturn}
                      onChange={(e) => handleInputChange('expectedReturn', parseFloat(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Inflation Rate</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={formData.inflationRate}
                      onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value))}
                      className="text-sm"
                    />
                    <span className="text-xs text-gray-500">%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Retirement Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Desired Annual Income</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <Input
                      type="number"
                      value={formData.desiredIncome}
                      onChange={(e) => handleInputChange('desiredIncome', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Expected Social Security</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <Input
                      type="number"
                      value={formData.socialSecurity}
                      onChange={(e) => handleInputChange('socialSecurity', parseInt(e.target.value))}
                      className="text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Needed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(results.totalNeeded / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Projected Savings</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(results.projectedSavings / 1000000).toFixed(1)}M
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
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Funding Gap</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${(results.gap / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Additional Monthly</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${results.monthlyNeeded}
                      </p>
                    </div>
                    <Calculator className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Projection Chart */}
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Savings Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="age" 
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
                      labelFormatter={(label) => `Age ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="savings" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      name="Projected Savings"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#EF4444', strokeWidth: 1, r: 3 }}
                      name="Target Amount"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.gap > 0 ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-800 dark:text-red-200">Action Required</span>
                      </div>
                      <p className="text-xs text-red-700 dark:text-red-300 mb-2">
                        You need to save an additional ${results.monthlyNeeded} per month to reach your retirement goal.
                      </p>
                      <div className="space-y-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs">
                          Increase Contributions
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Adjust Retirement Age
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">On Track!</span>
                    </div>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Congratulations! You're on track to meet your retirement goals with your current savings plan.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Optimize Returns</span>
                    </div>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Consider increasing your expected return by 1-2% through better investment allocation.
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Review Annually</span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Review and adjust your retirement plan annually to account for life changes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
} 