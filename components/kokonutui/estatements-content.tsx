"use client"

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
  PieChart,
  Grid,
  List,
  User,
  Clock
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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { useState } from "react"

interface Statement {
  id: string
  title: string
  type: "pdf" | "csv"
  accountType: string
  date: string
  size: string
  description: string
  category: "monthly" | "quarterly" | "annual" | "transaction"
  period: string
  dealershipRepresentative: string
  viewedDate?: string
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
    category: "monthly",
    period: "December 2024",
    dealershipRepresentative: "Sarah Johnson",
    viewedDate: "2024-12-15"
  },
  {
    id: "2",
    title: "December 2024 Monthly Statement",
    type: "csv",
    accountType: "Individual Retirement Account",
    date: "2024-12-31",
    size: "156 KB",
    description: "CSV export of all transactions for the month",
    category: "monthly",
    period: "December 2024",
    dealershipRepresentative: "Sarah Johnson"
  },
  {
    id: "3",
    title: "Q4 2024 Quarterly Statement",
    type: "pdf",
    accountType: "Taxable Investment Account",
    date: "2024-12-31",
    size: "3.1 MB",
    description: "Quarterly performance summary and tax information",
    category: "quarterly",
    period: "Q4 2024",
    dealershipRepresentative: "Michael Chen",
    viewedDate: "2024-12-20"
  },
  {
    id: "4",
    title: "November 2024 Monthly Statement",
    type: "pdf",
    accountType: "Individual Retirement Account",
    date: "2024-11-30",
    size: "2.2 MB",
    description: "Monthly statement for IRA account including all transactions and holdings",
    category: "monthly",
    period: "November 2024",
    dealershipRepresentative: "Sarah Johnson",
    viewedDate: "2024-11-25"
  },
  {
    id: "5",
    title: "November 2024 Monthly Statement",
    type: "csv",
    accountType: "Individual Retirement Account",
    date: "2024-11-30",
    size: "142 KB",
    description: "CSV export of all transactions for the month",
    category: "monthly",
    period: "November 2024",
    dealershipRepresentative: "Sarah Johnson"
  },
  {
    id: "6",
    title: "2024 Annual Statement",
    type: "pdf",
    accountType: "All Accounts",
    date: "2024-12-31",
    size: "8.7 MB",
    description: "Comprehensive annual statement with performance analysis",
    category: "annual",
    period: "2024",
    dealershipRepresentative: "David Wilson",
    viewedDate: "2024-12-28"
  },
  {
    id: "7",
    title: "Transaction History - December 2024",
    type: "csv",
    accountType: "Taxable Investment Account",
    date: "2024-12-31",
    size: "89 KB",
    description: "Detailed transaction history for tax purposes",
    category: "transaction",
    period: "December 2024",
    dealershipRepresentative: "Michael Chen"
  },
  {
    id: "8",
    title: "October 2024 Monthly Statement",
    type: "pdf",
    accountType: "Individual Retirement Account",
    date: "2024-10-31",
    size: "2.1 MB",
    description: "Monthly statement for IRA account including all transactions and holdings",
    category: "monthly",
    period: "October 2024",
    dealershipRepresentative: "Sarah Johnson",
    viewedDate: "2024-10-28"
  }
]

export default function EStatementsContent() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [accountTypeFilter, setAccountTypeFilter] = useState("all")
  const [statementTypeFilter, setStatementTypeFilter] = useState("all")
  const [fileTypeFilter, setFileTypeFilter] = useState("all")

  const filteredStatements = STATEMENTS.filter(statement => {
    const matchesSearch = searchTerm === "" || 
      statement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.accountType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      statement.dealershipRepresentative.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAccountType = accountTypeFilter === "all" || 
      statement.accountType.toLowerCase().includes(accountTypeFilter.toLowerCase())
    const matchesStatementType = statementTypeFilter === "all" || statement.category === statementTypeFilter
    const matchesFileType = fileTypeFilter === "all" || statement.type === fileTypeFilter
    return matchesSearch && matchesAccountType && matchesStatementType && matchesFileType
  })

  const groupedStatements = filteredStatements.reduce((acc, statement) => {
    const key = `${statement.period}|${statement.dealershipRepresentative}`
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(statement)
    return acc
  }, {} as Record<string, Statement[]>)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">E-Statements</h1>
          <p className="text-gray-600 mt-1">Download your account statements and reports</p>
        </div>
        <Button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-900" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              className={viewMode === 'grid' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}
            >
              <Grid className="w-5 h-5" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              aria-pressed={viewMode === 'list'}
              className={viewMode === 'list' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}
            >
              <List className="w-5 h-5" />
              <span className="sr-only">List View</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search statements..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
          
          <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
            <SelectTrigger className="bg-gray-50 border-gray-200">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Accounts</SelectItem>
              <SelectItem value="ira">Individual Retirement Account</SelectItem>
              <SelectItem value="taxable">Taxable Investment Account</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statementTypeFilter} onValueChange={setStatementTypeFilter}>
            <SelectTrigger className="bg-gray-50 border-gray-200">
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
          
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger className="bg-gray-50 border-gray-200">
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

      {/* Statements View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStatements.map((statement) => (
            <div 
              key={statement.id}
              className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    {statement.type === "pdf" ? (
                      <FilePdf className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileSpreadsheet className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "text-xs",
                      statement.category === "monthly" && "border-blue-200 text-blue-800",
                      statement.category === "quarterly" && "border-purple-200 text-purple-800",
                      statement.category === "annual" && "border-emerald-200 text-emerald-800",
                      statement.category === "transaction" && "border-amber-200 text-amber-800"
                    )}
                  >
                    {statement.category.charAt(0).toUpperCase() + statement.category.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {statement.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {statement.accountType}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <CalendarDays className="w-3 h-3" />
                      <span>Period: {statement.period}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <User className="w-3 h-3" />
                      <span>Rep: {statement.dealershipRepresentative}</span>
                    </div>
                    {statement.viewedDate && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Viewed: {new Date(statement.viewedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {statement.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
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
                    className="flex-1 bg-gray-50 border-gray-200 hover:bg-gray-100"
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-zinc-900 text-zinc-50 hover:bg-zinc-800"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6">
            {Object.entries(groupedStatements).map(([key, statements]) => {
              const [period, representative] = key.split('|')
              return (
                <div key={key} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-gray-600" />
                      <span className="font-semibold text-gray-900">{period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-700">{representative}</span>
                    </div>
                    <Badge variant="outline" className="bg-white">
                      {statements.length} statement{statements.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Statement</TableHead>
                        <TableHead>Account Type</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>File Type</TableHead>
                        <TableHead>Viewed Date</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {statements.map((statement) => (
                        <TableRow key={statement.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">{statement.title}</div>
                              <div className="text-xs text-gray-500">{statement.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{statement.accountType}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={cn(
                                "text-xs",
                                statement.category === "monthly" && "border-blue-200 text-blue-800",
                                statement.category === "quarterly" && "border-purple-200 text-purple-800",
                                statement.category === "annual" && "border-emerald-200 text-emerald-800",
                                statement.category === "transaction" && "border-amber-200 text-amber-800"
                              )}
                            >
                              {statement.category.charAt(0).toUpperCase() + statement.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {statement.type === "pdf" ? (
                                <FilePdf className="w-4 h-4 text-blue-600" />
                              ) : (
                                <FileSpreadsheet className="w-4 h-4 text-green-600" />
                              )}
                              <span className="text-sm font-medium">{statement.type.toUpperCase()}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {statement.viewedDate ? (
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="w-3 h-3" />
                                {new Date(statement.viewedDate).toLocaleDateString()}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">Not viewed</span>
                            )}
                          </TableCell>
                          <TableCell>{statement.size}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white border-gray-200 hover:bg-gray-50"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Preview
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Access */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            <Building2 className="w-5 h-5 text-blue-600 mb-2" />
            <span className="font-medium text-gray-900">Monthly</span>
            <span className="text-xs text-gray-600">2024</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            <PieChart className="w-5 h-5 text-purple-600 mb-2" />
            <span className="font-medium text-gray-900">Quarterly</span>
            <span className="text-xs text-gray-600">2024</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-start bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            <CreditCard className="w-5 h-5 text-emerald-600 mb-2" />
            <span className="font-medium text-gray-900">Annual Statement</span>
            <span className="text-xs text-gray-600">2024</span>
          </Button>
        </div>
      </div>
    </div>
  )
} 