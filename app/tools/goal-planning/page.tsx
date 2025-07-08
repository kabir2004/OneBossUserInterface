"use client"

import { useState } from "react"
import Layout from "@/components/kokonutui/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Target,
  DollarSign,
  Calendar,
  TrendingUp,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  Home,
  Car,
  GraduationCap,
  Plane
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

interface Goal {
  id: string
  name: string
  type: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  monthlyContribution: number
  priority: 'high' | 'medium' | 'low'
  description: string
  icon: any
  color: string
}

export default function GoalPlanningPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Buy a House',
      type: 'housing',
      targetAmount: 500000,
      currentAmount: 150000,
      targetDate: '2026-12-31',
      monthlyContribution: 3000,
      priority: 'high',
      description: 'Down payment for a family home',
      icon: Home,
      color: '#10B981'
    },
    {
      id: '2',
      name: 'College Fund',
      type: 'education',
      targetAmount: 100000,
      currentAmount: 25000,
      targetDate: '2030-08-15',
      monthlyContribution: 800,
      priority: 'medium',
      description: 'Education fund for children',
      icon: GraduationCap,
      color: '#3B82F6'
    },
    {
      id: '3',
      name: 'Vacation Fund',
      type: 'travel',
      targetAmount: 15000,
      currentAmount: 8000,
      targetDate: '2024-06-30',
      monthlyContribution: 500,
      priority: 'low',
      description: 'Annual family vacation',
      icon: Plane,
      color: '#F59E0B'
    }
  ])

  const [showAddGoal, setShowAddGoal] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)

  const goalTypes = [
    { value: 'housing', label: 'Housing', icon: Home, color: '#10B981' },
    { value: 'education', label: 'Education', icon: GraduationCap, color: '#3B82F6' },
    { value: 'travel', label: 'Travel', icon: Plane, color: '#F59E0B' },
    { value: 'vehicle', label: 'Vehicle', icon: Car, color: '#EF4444' },
    { value: 'retirement', label: 'Retirement', icon: Target, color: '#8B5CF6' },
    { value: 'emergency', label: 'Emergency Fund', icon: DollarSign, color: '#6B7280' }
  ]

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)
  }

  const calculateMonthsRemaining = (targetDate: string) => {
    const target = new Date(targetDate)
    const now = new Date()
    const diffTime = target.getTime() - now.getTime()
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
    return Math.max(0, diffMonths)
  }

  const calculateMonthlyNeeded = (goal: Goal) => {
    const monthsRemaining = calculateMonthsRemaining(goal.targetDate)
    const remainingAmount = goal.targetAmount - goal.currentAmount
    return monthsRemaining > 0 ? remainingAmount / monthsRemaining : 0
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400'
      case 'medium': return 'text-yellow-600 dark:text-yellow-400'
      case 'low': return 'text-green-600 dark:text-green-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30'
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30'
      case 'low': return 'bg-green-100 dark:bg-green-900/30'
      default: return 'bg-gray-100 dark:bg-gray-900/30'
    }
  }

  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)
  const totalCurrentAmount = goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalMonthlyContribution = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0)

  const progressData = goals.map(goal => ({
    name: goal.name,
    current: goal.currentAmount,
    target: goal.targetAmount,
    progress: calculateProgress(goal)
  }))

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Goal Planning</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Set and track your financial goals</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddGoal(true)}
            className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Goals</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{goals.length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Target</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${(totalTargetAmount / 1000).toFixed(0)}K
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total Saved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${(totalCurrentAmount / 1000).toFixed(0)}K
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Monthly Contribution</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${totalMonthlyContribution}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal)
            const monthsRemaining = calculateMonthsRemaining(goal.targetDate)
            const monthlyNeeded = calculateMonthlyNeeded(goal)
            const isOnTrack = goal.monthlyContribution >= monthlyNeeded

            return (
              <Card key={goal.id} className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded-lg" 
                        style={{ backgroundColor: `${goal.color}20` }}
                      >
                        <goal.icon className="w-5 h-5" style={{ color: goal.color }} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">{goal.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBg(goal.priority)} ${getPriorityColor(goal.priority)}`}>
                            {goal.priority}
                          </span>
                          {isOnTrack && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="font-medium text-gray-900 dark:text-white">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${progress}%`,
                          backgroundColor: goal.color
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Target</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${(goal.targetAmount / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Saved</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${(goal.currentAmount / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Monthly</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${goal.monthlyContribution}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Months Left</span>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {monthsRemaining}
                      </p>
                    </div>
                  </div>

                  {!isOnTrack && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                      <p className="text-xs text-red-700 dark:text-red-300">
                        Need ${Math.round(monthlyNeeded - goal.monthlyContribution)} more monthly
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-600 dark:text-gray-400">{goal.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Progress Chart */}
        <Card className="border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Goal Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value: number) => [`$${(value / 1000).toFixed(0)}K`, '']}
                />
                <Bar 
                  dataKey="current" 
                  fill="#10B981" 
                  name="Current Amount"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="target" 
                  fill="#3B82F6" 
                  name="Target Amount"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Add Goal Modal */}
        {showAddGoal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md border border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12]">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">Add New Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Goal Name</Label>
                  <Input placeholder="e.g., Buy a House" className="text-sm" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Goal Type</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select goal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {goalTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" style={{ color: type.color }} />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600 dark:text-gray-400">Target Amount</Label>
                    <Input type="number" placeholder="50000" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600 dark:text-gray-400">Current Amount</Label>
                    <Input type="number" placeholder="10000" className="text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600 dark:text-gray-400">Target Date</Label>
                    <Input type="date" className="text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-600 dark:text-gray-400">Monthly Contribution</Label>
                    <Input type="number" placeholder="500" className="text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Priority</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-gray-600 dark:text-gray-400">Description</Label>
                  <Textarea placeholder="Brief description of your goal" className="text-sm" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  >
                    Add Goal
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddGoal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
} 