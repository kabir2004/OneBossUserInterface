"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  User, 
  Download, 
  Check, 
  Filter,
  Calendar,
  DollarSign
} from "lucide-react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

// Sample data
const APPROVALS = [
  {
    id: "1",
    title: "Account Opening Request",
    type: "account",
    description: "New client registration for premium account",
    status: "pending",
    priority: "high",
    submittedBy: "John Smith",
    submittedDate: "2024-01-15",
    amount: "$50,000"
  },
  {
    id: "2",
    title: "Wire Transfer Authorization",
    type: "transaction",
    description: "International wire transfer to UK bank",
    status: "approved",
    priority: "medium",
    submittedBy: "Sarah Johnson",
    submittedDate: "2024-01-14",
    amount: "$25,000"
  },
  {
    id: "3",
    title: "Investment Strategy Change",
    type: "investment",
    description: "Portfolio rebalancing request",
    status: "pending",
    priority: "low",
    submittedBy: "Mike Davis",
    submittedDate: "2024-01-13",
    amount: "$75,000"
  },
  {
    id: "4",
    title: "Document Verification",
    type: "document",
    description: "KYC documentation review",
    status: "rejected",
    priority: "high",
    submittedBy: "Emily Chen",
    submittedDate: "2024-01-12",
    amount: "$0"
  }
]

interface ApprovalsContentProps {
  onRowClick?: (id: string) => void
}

export default function ApprovalsContent({ onRowClick }: ApprovalsContentProps) {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [dateRange, setDateRange] = useState("all")

  // Helper to filter by date range
  function isWithinRange(dateStr: string, range: string) {
    if (range === "all") return true
    const now = new Date()
    const date = new Date(dateStr)
    let months = 0
    switch (range) {
      case "1": months = 1; break
      case "3": months = 3; break
      case "5": months = 5; break
      case "7": months = 7; break
      case "12": months = 12; break
      default: return true
    }
    const cutoff = new Date(now.getFullYear(), now.getMonth() - months, now.getDate())
    return date >= cutoff
  }

  // Filter approvals by search and date range
  const filteredApprovals = APPROVALS.filter(a => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.submittedBy.toLowerCase().includes(search.toLowerCase())
    const matchesDate = isWithinRange(a.submittedDate, dateRange)
    return matchesSearch && matchesDate
  })

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          class: "text-amber-600",
          bg: "bg-amber-100",
          text: "Pending"
        }
      case "approved":
        return {
          icon: CheckCircle,
          class: "text-emerald-600",
          bg: "bg-emerald-100",
          text: "Approved"
        }
      case "rejected":
        return {
          icon: AlertCircle,
          class: "text-red-600",
          bg: "bg-red-100",
          text: "Rejected"
        }
      default:
        return {
          icon: Clock,
          class: "text-gray-600",
          bg: "bg-gray-100",
          text: "Unknown"
        }
    }
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          class: "text-red-600",
          bg: "bg-red-100",
          text: "High"
        }
      case "medium":
        return {
          class: "text-amber-600",
          bg: "bg-amber-100",
          text: "Medium"
        }
      case "low":
        return {
          class: "text-emerald-600",
          bg: "bg-emerald-100",
          text: "Low"
        }
      default:
        return {
          class: "text-gray-600",
          bg: "bg-gray-100",
          text: "Unknown"
        }
    }
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "document":
        return {
          icon: FileText,
          class: "bg-blue-100 text-blue-600"
        }
      case "transaction":
        return {
          icon: DollarSign,
          class: "bg-purple-100 text-purple-600"
        }
      case "account":
        return {
          icon: User,
          class: "bg-emerald-100 text-emerald-600"
        }
      case "investment":
        return {
          icon: CheckCircle,
          class: "bg-amber-100 text-amber-600"
        }
      default:
        return {
          icon: FileText,
          class: "bg-gray-100 text-gray-600"
        }
    }
  }

  const pendingApprovals = APPROVALS.filter(approval => approval.status === "pending")
  const completedApprovals = APPROVALS.filter(approval => approval.status !== "pending")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 text-gray-900">Approvals & eSigning</h1>
          <p className="text-body text-gray-600 mt-1">Review and approve pending requests</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
            <Check className="w-4 h-4 mr-2" />
            Approve All
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <Input
          placeholder="Search approvals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">Show:</span>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="1">Past Month</SelectItem>
              <SelectItem value="3">Past 3 Months</SelectItem>
              <SelectItem value="5">Past 5 Months</SelectItem>
              <SelectItem value="7">Past 7 Months</SelectItem>
              <SelectItem value="12">Past Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600">{pendingApprovals.length}</p>
          <p className="text-sm text-gray-600 mt-1">Awaiting approval</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {APPROVALS.filter(a => a.status === "approved").length}
          </p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-100">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Rejected</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {APPROVALS.filter(a => a.status === "rejected").length}
          </p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Total</h3>
          </div>
          <p className="text-heading-1 text-gray-900">{APPROVALS.length}</p>
          <p className="text-sm text-gray-600 mt-1">All requests</p>
        </div>
      </div>

      {/* Approval Table */}
      <Card>
        <CardHeader>
          <CardTitle>Approvals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Date Completed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApprovals.map((approval) => {
                const statusConfig = getStatusConfig(approval.status)
                const typeConfig = getTypeConfig(approval.type)
                const StatusIcon = statusConfig.icon
                const TypeIcon = typeConfig.icon
                return (
                  <TableRow key={approval.id} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} onClick={onRowClick ? () => onRowClick(approval.id) : undefined}>
                    <TableCell>{approval.title}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 ${typeConfig.class} px-2 py-1 rounded text-xs font-medium`}>
                        <TypeIcon className="w-4 h-4" />
                        {approval.type.charAt(0).toUpperCase() + approval.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{approval.submittedDate}</TableCell>
                    <TableCell>{approval.status === "approved" || approval.status === "rejected" ? approval.submittedDate : "-"}</TableCell>
                    <TableCell>
                      <Badge className={`${statusConfig.bg} ${statusConfig.class} border-0`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.text}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {approval.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}