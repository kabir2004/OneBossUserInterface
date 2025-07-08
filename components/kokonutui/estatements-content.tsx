import { cn } from "@/lib/utils"
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  Search,
  FileText as FilePdf,
  FileSpreadsheet,
  Eye,
  CalendarDays,
  Building2,
  CreditCard,
  PieChart
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Statement {
  id: string
  title: string
  type: "pdf" | "csv"
  accountType: string
  date: string
  size: string
  description: string
  category: "monthly" | "quarterly" | "annual" | "transaction"
}

const STATEMENTS: Statement[] = [
  {
    id: "1",
    title: "December 2024 Monthly Statement",
    type: "pdf",
    accountType: "Individual Retirement Account",
    date: "2024-12-31",
    size: "2.4 MB",
    description: "Monthly statement for IRA account including all transactions and holdings",
    category: "monthly"
  },
  {
    id: "2",
    title: "December 2024 Monthly Statement",
    type: "csv",
    accountType: "Individual Retirement Account",
    date: "2024-12-31",
    size: "156 KB",
    description: "CSV export of all transactions for the month",
    category: "monthly"
  },
  {
    id: "3",
    title: "Q4 2024 Quarterly Statement",
    type: "pdf",
    accountType: "Taxable Investment Account",
    date: "2024-12-31",
    size: "3.1 MB",
    description: "Quarterly performance summary and tax information",
    category: "quarterly"
  },
  {
    id: "4",
    title: "November 2024 Monthly Statement",
    type: "pdf",
    accountType: "Individual Retirement Account",
    date: "2024-11-30",
    size: "2.2 MB",
    description: "Monthly statement for IRA account including all transactions and holdings",
    category: "monthly"
  },
  {
    id: "5",
    title: "November 2024 Monthly Statement",
    type: "csv",
    accountType: "Individual Retirement Account",
    date: "2024-11-30",
    size: "142 KB",
    description: "CSV export of all transactions for the month",
    category: "monthly"
  },
  {
    id: "6",
    title: "2024 Annual Statement",
    type: "pdf",
    accountType: "All Accounts",
    date: "2024-12-31",
    size: "8.7 MB",
    description: "Comprehensive annual statement with performance analysis",
    category: "annual"
  },
  {
    id: "7",
    title: "Transaction History - December 2024",
    type: "csv",
    accountType: "Taxable Investment Account",
    date: "2024-12-31",
    size: "89 KB",
    description: "Detailed transaction history for tax purposes",
    category: "transaction"
  },
  {
    id: "8",
    title: "October 2024 Monthly Statement",
    type: "pdf",
    accountType: "Individual Retirement Account",
    date: "2024-10-31",
    size: "2.1 MB",
    description: "Monthly statement for IRA account including all transactions and holdings",
    category: "monthly"
  }
]

export default function EStatementsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">E-Statements</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Download your account statements and reports</p>
        </div>
        <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-900 dark:text-white" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search statements..." 
              className="pl-10 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]"
            />
          </div>
          
          <Select>
            <SelectTrigger className="bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="ira">Individual Retirement Account</SelectItem>
              <SelectItem value="taxable">Taxable Investment Account</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
              <SelectValue placeholder="Statement Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
              <SelectValue placeholder="File Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Files</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATEMENTS.map((statement) => (
          <div 
            key={statement.id}
            className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  {statement.type === "pdf" ? (
                    <FilePdf className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <Badge 
                  variant="outline"
                  className={cn(
                    "text-xs",
                    statement.category === "monthly" && "border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-400",
                    statement.category === "quarterly" && "border-purple-200 text-purple-800 dark:border-purple-800 dark:text-purple-400",
                    statement.category === "annual" && "border-emerald-200 text-emerald-800 dark:border-emerald-800 dark:text-emerald-400",
                    statement.category === "transaction" && "border-amber-200 text-amber-800 dark:border-amber-800 dark:text-amber-400"
                  )}
                >
                  {statement.category.charAt(0).toUpperCase() + statement.category.slice(1)}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                    {statement.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {statement.accountType}
                  </p>
                </div>
                
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {statement.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    <span>{new Date(statement.date).toLocaleDateString()}</span>
                  </div>
                  <span>{statement.size}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 pb-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Access */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
          >
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">Latest Monthly</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">December 2024</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
          >
            <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">Latest Quarterly</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">Q4 2024</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
          >
            <CreditCard className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-2" />
            <span className="font-medium text-gray-900 dark:text-white">Annual Statement</span>
            <span className="text-xs text-gray-600 dark:text-gray-400">2024</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 