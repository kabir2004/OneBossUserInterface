"use client"
import { useRouter, useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { CheckCircle, Clock, AlertCircle, FileText, User, DollarSign } from "lucide-react"
import Image from "next/image"

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
    amount: "$50,000",
    pdfUrl: "/placeholder.pdf"
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
    amount: "$25,000",
    pdfUrl: "/placeholder.pdf"
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
    amount: "$75,000",
    pdfUrl: "/placeholder.pdf"
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
    amount: "$0",
    pdfUrl: "/placeholder.pdf"
  }
]

function getStatusConfig(status: string) {
  switch (status) {
    case "pending":
      return { icon: Clock, class: "text-amber-600", bg: "bg-amber-100", text: "Pending" }
    case "approved":
      return { icon: CheckCircle, class: "text-emerald-600", bg: "bg-emerald-100", text: "Approved" }
    case "rejected":
      return { icon: AlertCircle, class: "text-red-600", bg: "bg-red-100", text: "Rejected" }
    default:
      return { icon: Clock, class: "text-gray-600", bg: "bg-gray-100", text: "Unknown" }
  }
}

function getTypeConfig(type: string) {
  switch (type) {
    case "document":
      return { icon: FileText, class: "bg-blue-100 text-blue-600" }
    case "transaction":
      return { icon: DollarSign, class: "bg-purple-100 text-purple-600" }
    case "account":
      return { icon: User, class: "bg-emerald-100 text-emerald-600" }
    case "investment":
      return { icon: CheckCircle, class: "bg-amber-100 text-amber-600" }
    default:
      return { icon: FileText, class: "bg-gray-100 text-gray-600" }
  }
}

export default function ApprovalDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const approval = APPROVALS.find(a => a.id === id)

  if (!approval) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center text-red-600">Approval not found.</div>
    )
  }

  const statusConfig = getStatusConfig(approval.status)
  const typeConfig = getTypeConfig(approval.type)
  const StatusIcon = statusConfig.icon
  const TypeIcon = typeConfig.icon

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Button variant="outline" className="mb-4" onClick={() => router.back()}>
        &larr; Back
      </Button>
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading-3 text-gray-900">
            <span>{approval.title}</span>
            <Badge className={`${statusConfig.bg} ${statusConfig.class} border-0`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusConfig.text}
            </Badge>
            <span className={`ml-2 p-2 rounded-lg ${typeConfig.class}`}><TypeIcon className="w-4 h-4" /></span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* PDF Preview */}
          <div>
            <div className="font-semibold mb-2">Document Preview</div>
            <div className="border rounded-lg bg-gray-50 flex items-center justify-center h-64 overflow-hidden">
              {/* Replace with a real PDF viewer if available */}
              <Image src="/placeholder-logo-dark.png" alt="PDF Preview" width={180} height={240} className="object-contain" />
            </div>
            <div className="mt-2 text-xs text-gray-500">(PDF preview or download link here)</div>
            <Button variant="outline" className="mt-2 w-full" asChild>
              <a href={approval.pdfUrl} target="_blank" rel="noopener noreferrer">Open PDF in new tab</a>
            </Button>
          </div>
          {/* Details */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-gray-500">Description</div>
              <div className="font-medium text-gray-900">{approval.description}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Submitted By</div>
                <div className="font-medium">{approval.submittedBy}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Date Created</div>
                <div className="font-medium">{approval.submittedDate}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Amount</div>
                <div className="font-medium">{approval.amount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div className="font-medium flex items-center gap-1">
                  <StatusIcon className={`w-4 h-4 ${statusConfig.class}`} />
                  {statusConfig.text}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        {approval.status === "pending" && (
          <CardFooter className="flex gap-4 justify-end">
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Approve</Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
} 