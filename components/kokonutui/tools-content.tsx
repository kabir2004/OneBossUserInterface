import { 
  BarChart3, 
  TrendingUp, 
  Calculator, 
  PieChart,
  Target,
  DollarSign,
  Calendar,
  ArrowUpRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ToolsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tools</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Financial analysis and planning tools</p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Portfolio Analyzer */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Analyzer</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Analyze your portfolio performance, risk metrics, and asset allocation
          </p>
          <Link href="/tools/portfolio-analyzer">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>

        {/* Retirement Calculator */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Retirement Calculator</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Calculate retirement needs and plan your savings strategy
          </p>
          <Link href="/tools/retirement-calculator">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>

        {/* Investment Projections */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Investment Projections</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Project future portfolio values based on different scenarios
          </p>
          <Link href="/tools/investment-projections">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>

        {/* Asset Allocation */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <PieChart className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Asset Allocation</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Visualize and optimize your asset allocation strategy
          </p>
          <Link href="/tools/asset-allocation">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>

        {/* Goal Planning */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <Target className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Goal Planning</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Set and track financial goals with detailed planning tools
          </p>
          <Link href="/tools/goal-planning">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>

        {/* Tax Optimizer */}
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tax Optimizer</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Optimize your portfolio for tax efficiency and planning
          </p>
          <Link href="/tools/tax-optimizer">
            <Button className="w-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
              <ArrowUpRight className="w-4 h-4 mr-2" />
              Launch Tool
            </Button>
          </Link>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="text-center">
          <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">More Tools Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400">
            We're working on additional financial planning and analysis tools to help you make better investment decisions.
          </p>
        </div>
      </div>
    </div>
  )
} 