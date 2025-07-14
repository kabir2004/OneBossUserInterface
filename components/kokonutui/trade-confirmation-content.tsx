"use client"

import { useState } from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Trade confirmation data
const TRADE_CONFIRMATIONS = [
  // RESP
  {
    id: "TC-2024-001",
    date: "2024-12-14",
    account: "001000001",
    accountType: "Registered Education Savings Plan (RESP)",
    security: "TESLA INC COMMON STOCK",
    action: "Buy",
    quantity: "1,250.00",
    price: "$245.32",
    totalValue: "$306,650.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-14-001",
    settlementDate: "2024-12-16",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$306,659.99"
  },
  {
    id: "TC-2024-002",
    date: "2024-12-13",
    account: "001000001",
    accountType: "Registered Education Savings Plan (RESP)",
    security: "APPLE INC COMMON STOCK",
    action: "Buy",
    quantity: "2,100.00",
    price: "$185.64",
    totalValue: "$389,844.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-13-001",
    settlementDate: "2024-12-15",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$389,853.99"
  },
  {
    id: "TC-2024-003",
    date: "2024-12-12",
    account: "001000001",
    accountType: "Registered Education Savings Plan (RESP)",
    security: "NVIDIA CORP COMMON STOCK",
    action: "Buy",
    quantity: "350.00",
    price: "$428.56",
    totalValue: "$149,996.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-12-001",
    settlementDate: "2024-12-14",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$150,005.99"
  },
  // RDSP
  {
    id: "TC-2024-004",
    date: "2024-12-11",
    account: "002000001",
    accountType: "Registered Disability Savings Plan (RDSP)",
    security: "TD CANADIAN BOND INDEX FUND",
    action: "Buy",
    quantity: "15,450.00",
    price: "$10.85",
    totalValue: "$167,632.50",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-11-001",
    settlementDate: "2024-12-13",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$167,642.49"
  },
  {
    id: "TC-2024-005",
    date: "2024-12-10",
    account: "002000001",
    accountType: "Registered Disability Savings Plan (RDSP)",
    security: "JOHNSON & JOHNSON COMMON STOCK",
    action: "Buy",
    quantity: "1,890.00",
    price: "$158.75",
    totalValue: "$300,037.50",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-10-001",
    settlementDate: "2024-12-12",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$300,047.49"
  },
  {
    id: "TC-2024-006",
    date: "2024-12-09",
    account: "002000001",
    accountType: "Registered Disability Savings Plan (RDSP)",
    security: "PROCTER & GAMBLE CO COMMON STOCK",
    action: "Buy",
    quantity: "1,020.00",
    price: "$152.00",
    totalValue: "$155,040.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-09-001",
    settlementDate: "2024-12-11",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$155,049.99"
  },
  // TFSA (Multiple Clients)
  {
    id: "TC-2024-007",
    date: "2024-12-08",
    account: "003000001",
    accountType: "Tax-Free Savings Account (TFSA)",
    security: "DIVERSIFIED EQUITY PORTFOLIO A",
    action: "Buy",
    quantity: "2,850.00",
    price: "$285.50",
    totalValue: "$813,675.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-08-001",
    settlementDate: "2024-12-10",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$813,684.99"
  },
  {
    id: "TC-2024-008",
    date: "2024-12-07",
    account: "003000001",
    accountType: "Tax-Free Savings Account (TFSA)",
    security: "BALANCED INCOME PORTFOLIO B",
    action: "Buy",
    quantity: "1,890.00",
    price: "$298.25",
    totalValue: "$563,692.50",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-07-001",
    settlementDate: "2024-12-09",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$563,702.49"
  },
  // RRIF
  {
    id: "TC-2024-009",
    date: "2024-12-06",
    account: "004000001",
    accountType: "Registered Retirement Income Fund (RRIF)",
    security: "SPDR S&P 500 ETF TRUST",
    action: "Buy",
    quantity: "1,200.00",
    price: "$445.80",
    totalValue: "$534,960.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-06-001",
    settlementDate: "2024-12-08",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$534,969.99"
  },
  {
    id: "TC-2024-010",
    date: "2024-12-05",
    account: "004000001",
    accountType: "Registered Retirement Income Fund (RRIF)",
    security: "INVESCO QQQ TRUST SERIES 1",
    action: "Buy",
    quantity: "950.00",
    price: "$375.83",
    totalValue: "$357,038.50",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-05-001",
    settlementDate: "2024-12-07",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$357,048.49"
  },
  // RRSP
  {
    id: "TC-2024-011",
    date: "2024-12-04",
    account: "005000001",
    accountType: "Registered Retirement Savings Plan (RRSP)",
    security: "VANGUARD TOTAL STOCK MARKET INDEX FUND",
    action: "Buy",
    quantity: "3,800.00",
    price: "$98.50",
    totalValue: "$374,300.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-04-001",
    settlementDate: "2024-12-06",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$374,309.99"
  },
  {
    id: "TC-2024-012",
    date: "2024-12-03",
    account: "005000001",
    accountType: "Registered Retirement Savings Plan (RRSP)",
    security: "VANGUARD TOTAL INTERNATIONAL STOCK INDEX FUND",
    action: "Buy",
    quantity: "2,950.00",
    price: "$27.68",
    totalValue: "$81,656.00",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-03-001",
    settlementDate: "2024-12-05",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$81,665.99"
  },
  // TFSA (Estate)
  {
    id: "TC-2024-013",
    date: "2024-12-02",
    account: "070225184",
    accountType: "Tax-Free Savings Account (TFSA)",
    security: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
    action: "Buy",
    quantity: "196.9722",
    price: "$14.1588",
    totalValue: "$2,774.81",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-02-001",
    settlementDate: "2024-12-04",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$2,784.80"
  },
  {
    id: "TC-2024-014",
    date: "2024-12-01",
    account: "070225184",
    accountType: "Tax-Free Savings Account (TFSA)",
    security: "FIDELITY GLOBAL INCOME PORTFOLIO DSC DSC CAD",
    action: "Buy",
    quantity: "625.6722",
    price: "$14.1588",
    totalValue: "$33,326.39",
    status: "Completed",
    confirmationNumber: "CONF-2024-12-01-001",
    settlementDate: "2024-12-03",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$33,336.38"
  },
  {
    id: "TC-2024-015",
    date: "2024-11-30",
    account: "070225184",
    accountType: "Tax-Free Savings Account (TFSA)",
    security: "FIDELITY GLOBAL INTRINSIC VALUE CLASS SERIES B ISC FEL CAD",
    action: "Buy",
    quantity: "625.6722",
    price: "$14.1588",
    totalValue: "$33,326.39",
    status: "Completed",
    confirmationNumber: "CONF-2024-11-30-001",
    settlementDate: "2024-12-02",
    commission: "$9.99",
    fees: "$0.00",
    netAmount: "$33,336.38"
  }
]

export default function TradeConfirmationContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedConfirmation, setSelectedConfirmation] = useState<string | null>(null)

  // Filter trade confirmations based on search and filters
  const filteredConfirmations = TRADE_CONFIRMATIONS.filter(confirmation => {
    const matchesSearch = 
      confirmation.security.toLowerCase().includes(searchTerm.toLowerCase()) ||
      confirmation.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      confirmation.confirmationNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || confirmation.status.toLowerCase() === statusFilter
    const matchesAction = actionFilter === "all" || confirmation.action.toLowerCase() === actionFilter
    
    return matchesSearch && matchesStatus && matchesAction
  })

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertCircle className="w-3 h-3 mr-1" />Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActionBadge = (action: string) => {
    return action === "Buy" ? 
      <Badge className="bg-blue-100 text-blue-800 border-blue-200"><TrendingUp className="w-3 h-3 mr-1" />Buy</Badge> :
      <Badge className="bg-red-100 text-red-800 border-red-200"><TrendingUp className="w-3 h-3 mr-1" />Sell</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-1 text-gray-900">Trade Confirmations</h1>
                      <p className="text-body text-gray-500 mt-1">View and manage your trade confirmation documents</p>
        </div>
        <Button variant="outline" className="border-gray-200 text-sm font-medium">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Trades</p>
                <p className="text-xl font-semibold text-gray-900">{TRADE_CONFIRMATIONS.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-xl font-semibold text-green-700">
                  {TRADE_CONFIRMATIONS.filter(t => t.status === "Completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Pending</p>
                <p className="text-xl font-semibold text-yellow-700">
                  {TRADE_CONFIRMATIONS.filter(t => t.status === "Pending").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-gray-200 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Value</p>
                <p className="text-xl font-semibold text-gray-900">
                  ${TRADE_CONFIRMATIONS.reduce((sum, t) => sum + parseFloat(t.totalValue.replace(/[$,]/g, '')), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200 shadow-none">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search by security, account, or confirmation number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border-gray-200 text-sm px-4 py-2"
              />
            </div>
            <div className="flex flex-row gap-2 w-full lg:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32 bg-gray-50 border-gray-200 text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-32 bg-gray-50 border-gray-200 text-sm">
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-32 bg-gray-50 border-gray-200 text-sm">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Confirmations Table */}
      <Card className="border-gray-200 shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Trade Confirmations</CardTitle>
          <p className="text-xs text-gray-500">Showing {filteredConfirmations.length} of {TRADE_CONFIRMATIONS.length} confirmations</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold text-gray-500">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Confirmation #</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Account</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Security</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Action</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Quantity</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Price</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Total Value</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Status</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConfirmations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-gray-400 py-8 text-sm">
                      No trade confirmations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredConfirmations.map((confirmation) => (
                    <TableRow key={confirmation.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-sm">
                        {new Date(confirmation.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-blue-700">
                        {confirmation.confirmationNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{confirmation.account}</p>
                          <p className="text-xs text-gray-500">{confirmation.accountType}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900 truncate text-sm">{confirmation.security}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getActionBadge(confirmation.action)}
                      </TableCell>
                      <TableCell className="font-medium text-sm">{confirmation.quantity}</TableCell>
                      <TableCell className="font-medium text-sm">{confirmation.price}</TableCell>
                      <TableCell className="font-medium text-sm">{confirmation.totalValue}</TableCell>
                      <TableCell>
                        {getStatusBadge(confirmation.status)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 border-gray-200">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedConfirmation(confirmation.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Print
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View Modal */}
      {selectedConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Trade Confirmation Details</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedConfirmation(null)}
                className="border-gray-200 text-xs"
              >
                Close
              </Button>
            </div>
            {(() => {
              const confirmation = TRADE_CONFIRMATIONS.find(c => c.id === selectedConfirmation)
              if (!confirmation) return null
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Confirmation Number</p>
                      <p className="font-medium text-gray-900 text-sm">{confirmation.confirmationNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Trade Date</p>
                      <p className="font-medium text-gray-900 text-sm">{new Date(confirmation.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Account</p>
                      <p className="font-medium text-gray-900 text-sm">{confirmation.account}</p>
                      <p className="text-xs text-gray-400">{confirmation.accountType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Security</p>
                      <p className="font-medium text-gray-900 text-sm">{confirmation.security}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Action</p>
                      <div className="mt-1">{getActionBadge(confirmation.action)}</div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="mt-1">{getStatusBadge(confirmation.status)}</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm">Trade Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Quantity</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.quantity}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Value</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.totalValue}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Commission</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.commission}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Fees</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.fees}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Net Amount</p>
                        <p className="font-medium text-gray-900 text-sm">{confirmation.netAmount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-3 text-sm">Settlement Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Settlement Date</p>
                        <p className="font-medium text-gray-900 text-sm">{new Date(confirmation.settlementDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button className="flex-1 text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" className="flex-1 text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Print
                    </Button>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
} 