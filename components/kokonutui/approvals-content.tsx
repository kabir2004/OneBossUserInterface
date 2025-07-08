import { cn } from "@/lib/utils"
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText,
  User,
  Calendar,
  ArrowRight,
  Check,
  X,
  Eye,
  Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Approval {
  id: string
  title: string
  type: "document" | "transaction" | "account" | "investment"
  description: string
  requester: string
  date: string
  status: "pending" | "approved" | "rejected"
  priority: "low" | "medium" | "high"
  documents?: string[]
}

const APPROVALS: Approval[] = [
  {
    id: "1",
    title: "Power of Attorney Document",
    type: "document",
    description: "Review and approve power of attorney document for trust management",
    requester: "Legal Department",
    date: "2024-01-20",
    status: "pending",
    priority: "high",
    documents: ["POA_Agreement.pdf", "Supporting_Docs.zip"]
  },
  {
    id: "2",
    title: "Large Stock Purchase",
    type: "transaction",
    description: "Approve purchase of 500 shares of AAPL at market price",
    requester: "Investment Team",
    date: "2024-01-19",
    status: "pending",
    priority: "medium"
  },
  {
    id: "3",
    title: "New Investment Account",
    type: "account",
    description: "Open new taxable investment account for family trust",
    requester: "Account Services",
    date: "2024-01-18",
    status: "pending",
    priority: "low"
  },
  {
    id: "4",
    title: "Portfolio Rebalancing",
    type: "investment",
    description: "Approve quarterly portfolio rebalancing recommendations",
    requester: "Portfolio Management",
    date: "2024-01-17",
    status: "approved",
    priority: "medium"
  },
  {
    id: "5",
    title: "Trust Distribution",
    type: "transaction",
    description: "Approve quarterly trust distribution of $25,000",
    requester: "Trust Administration",
    date: "2024-01-16",
    status: "rejected",
    priority: "high"
  }
]

export default function ApprovalsContent() {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          icon: Clock,
          class: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "Pending"
        }
      case "approved":
        return {
          icon: CheckCircle,
          class: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "Approved"
        }
      case "rejected":
        return {
          icon: AlertCircle,
          class: "text-red-600 dark:text-red-400",
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "Rejected"
        }
      default:
        return {
          icon: Clock,
          class: "text-gray-600 dark:text-gray-400",
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "Unknown"
        }
    }
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          class: "text-red-600 dark:text-red-400",
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "High"
        }
      case "medium":
        return {
          class: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "Medium"
        }
      case "low":
        return {
          class: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "Low"
        }
      default:
        return {
          class: "text-gray-600 dark:text-gray-400",
          bg: "bg-gray-100 dark:bg-gray-800",
          text: "Unknown"
        }
    }
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "document":
        return {
          icon: FileText,
          class: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        }
      case "transaction":
        return {
          icon: CheckCircle,
          class: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
        }
      case "account":
        return {
          icon: User,
          class: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
        }
      case "investment":
        return {
          icon: CheckCircle,
          class: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
        }
      default:
        return {
          icon: FileText,
          class: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Approvals</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and approve pending requests</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
            <Check className="w-4 h-4 mr-2" />
            Approve All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{pendingApprovals.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Awaiting approval</p>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Approved</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {APPROVALS.filter(a => a.status === "approved").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rejected</h3>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {APPROVALS.filter(a => a.status === "rejected").length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This month</p>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{APPROVALS.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All requests</p>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23]">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
        </div>
        
        <div className="p-6">
          {pendingApprovals.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Pending Approvals</h3>
              <p className="text-gray-600 dark:text-gray-400">All approval requests have been processed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApprovals.map((approval) => {
                const statusConfig = getStatusConfig(approval.status)
                const priorityConfig = getPriorityConfig(approval.priority)
                const typeConfig = getTypeConfig(approval.type)
                const Icon = typeConfig.icon
                
                return (
                  <div 
                    key={approval.id}
                    className="bg-gray-50 dark:bg-[#1F1F23] rounded-lg p-6 border border-gray-200 dark:border-[#1F1F23]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={cn("p-2 rounded-lg", typeConfig.class)}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{approval.title}</h3>
                            <Badge 
                              variant="outline"
                              className={cn(
                                "text-xs",
                                priorityConfig.bg,
                                priorityConfig.class
                              )}
                            >
                              {priorityConfig.text} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {approval.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{approval.requester}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(approval.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant="outline"
                        className={cn(
                          "text-xs",
                          statusConfig.bg,
                          statusConfig.class
                        )}
                      >
                        <statusConfig.icon className="w-3 h-3 mr-1" />
                        {statusConfig.text}
                      </Badge>
                    </div>
                    
                    {approval.documents && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Documents</h4>
                        <div className="flex gap-2">
                          {approval.documents.map((doc, index) => (
                            <Button 
                              key={index}
                              variant="outline" 
                              size="sm" 
                              className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              {doc}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1 bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        className="bg-white dark:bg-[#0F0F12] border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23]">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {completedApprovals.map((approval) => {
              const statusConfig = getStatusConfig(approval.status)
              const typeConfig = getTypeConfig(approval.type)
              const Icon = typeConfig.icon
              
              return (
                <div 
                  key={approval.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1F1F23] rounded-lg border border-gray-200 dark:border-[#1F1F23]"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-lg", typeConfig.class)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{approval.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{approval.requester}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(approval.date).toLocaleDateString()}
                    </span>
                    <Badge 
                      variant="outline"
                      className={cn(
                        "text-xs",
                        statusConfig.bg,
                        statusConfig.class
                      )}
                    >
                      <statusConfig.icon className="w-3 h-3 mr-1" />
                      {statusConfig.text}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
} 