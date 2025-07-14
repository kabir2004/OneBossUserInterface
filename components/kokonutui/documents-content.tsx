"use client"

import { cn } from "@/lib/utils"
import { 
  FileText, 
  Upload, 
  Download, 
  Eye,
  Trash2,
  Shield,
  User,
  Building2,
  FileUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  FolderOpen,
  Search,
  Calendar,
  Filter,
  Grid,
  List
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

interface Document {
  id: string
  name: string
  type: "id" | "legal" | "trust" | "financial" | "other"
  category: string
  size: string
  uploadDate: string
  status: "verified" | "pending" | "rejected"
  description: string
  clientId: string
  clientName: string
  folderPath: string
}

interface Client {
  id: string
  name: string
  totalDocuments: number
  pendingDocuments: number
  lastActivity: string
}

const CLIENTS: Client[] = [
  {
    id: "client-1",
    name: "John Anderson",
    totalDocuments: 8,
    pendingDocuments: 2,
    lastActivity: "2024-01-20"
  },
  {
    id: "client-2",
    name: "Sarah Mitchell",
    totalDocuments: 6,
    pendingDocuments: 0,
    lastActivity: "2024-01-18"
  },
  {
    id: "client-3",
    name: "Michael Chen",
    totalDocuments: 4,
    pendingDocuments: 1,
    lastActivity: "2024-01-15"
  }
]

const DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Driver's License - Front",
    type: "id",
    category: "Government ID",
    size: "2.1 MB",
    uploadDate: "2024-01-15",
    status: "verified",
    description: "Front side of driver's license",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Identity Documents"
  },
  {
    id: "2",
    name: "Driver's License - Back",
    type: "id",
    category: "Government ID",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
    status: "verified",
    description: "Back side of driver's license",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Identity Documents"
  },
  {
    id: "3",
    name: "Passport",
    type: "id",
    category: "Government ID",
    size: "3.2 MB",
    uploadDate: "2024-01-10",
    status: "verified",
    description: "Valid passport document",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Identity Documents"
  },
  {
    id: "4",
    name: "Trust Agreement",
    type: "trust",
    category: "Legal Documents",
    size: "5.7 MB",
    uploadDate: "2024-01-05",
    status: "verified",
    description: "Family trust agreement document",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Legal Documents"
  },
  {
    id: "5",
    name: "Power of Attorney",
    type: "legal",
    category: "Legal Documents",
    size: "2.9 MB",
    uploadDate: "2024-01-08",
    status: "pending",
    description: "Power of attorney document",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Legal Documents"
  },
  {
    id: "6",
    name: "W-2 Form 2023",
    type: "financial",
    category: "Tax Documents",
    size: "1.5 MB",
    uploadDate: "2024-01-12",
    status: "verified",
    description: "2023 W-2 tax form",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Financial Documents"
  },
  {
    id: "7",
    name: "Bank Statement - December 2024",
    type: "financial",
    category: "Financial Documents",
    size: "2.3 MB",
    uploadDate: "2024-01-20",
    status: "pending",
    description: "Monthly bank statement",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Financial Documents"
  },
  {
    id: "8",
    name: "Investment Account Statement",
    type: "financial",
    category: "Financial Documents",
    size: "4.1 MB",
    uploadDate: "2024-01-18",
    status: "verified",
    description: "Investment account monthly statement",
    clientId: "client-1",
    clientName: "John Anderson",
    folderPath: "Financial Documents"
  },
  {
    id: "9",
    name: "Social Security Card",
    type: "id",
    category: "Government ID",
    size: "1.9 MB",
    uploadDate: "2024-01-18",
    status: "verified",
    description: "Social security identification card",
    clientId: "client-2",
    clientName: "Sarah Mitchell",
    folderPath: "Identity Documents"
  },
  {
    id: "10",
    name: "Marriage Certificate",
    type: "legal",
    category: "Legal Documents",
    size: "3.1 MB",
    uploadDate: "2024-01-16",
    status: "verified",
    description: "Official marriage certificate",
    clientId: "client-2",
    clientName: "Sarah Mitchell",
    folderPath: "Legal Documents"
  },
  {
    id: "11",
    name: "Birth Certificate",
    type: "id",
    category: "Government ID",
    size: "2.8 MB",
    uploadDate: "2024-01-12",
    status: "verified",
    description: "Official birth certificate",
    clientId: "client-3",
    clientName: "Michael Chen",
    folderPath: "Identity Documents"
  },
  {
    id: "12",
    name: "Employment Contract",
    type: "legal",
    category: "Legal Documents",
    size: "4.2 MB",
    uploadDate: "2024-01-15",
    status: "pending",
    description: "Current employment contract",
    clientId: "client-3",
    clientName: "Michael Chen",
    folderPath: "Legal Documents"
  }
]

const DOCUMENT_CATEGORIES = {
  id: {
    icon: User,
    title: "Identification Documents",
    description: "Government-issued IDs and passports",
    color: "blue"
  },
  legal: {
    icon: Building2,
    title: "Legal Documents",
    description: "Contracts, agreements, and legal forms",
    color: "purple"
  },
  trust: {
    icon: Shield,
    title: "Trust Documents",
    description: "Trust agreements and related documents",
    color: "emerald"
  },
  financial: {
    icon: FileText,
    title: "Financial Documents",
    description: "Bank statements, tax forms, and financial records",
    color: "amber"
  },
  other: {
    icon: FileUp,
    title: "Other Documents",
    description: "Miscellaneous documents and files",
    color: "gray"
  }
}

export default function DocumentsContent() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>("grid")

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          class: "text-emerald-600",
          bg: "bg-emerald-100",
          text: "Verified"
        }
      case "pending":
        return {
          icon: Clock,
          class: "text-amber-600",
          bg: "bg-amber-100",
          text: "Pending"
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

  const getCategoryConfig = (type: string) => {
    const config = DOCUMENT_CATEGORIES[type as keyof typeof DOCUMENT_CATEGORIES]
    const colorClasses = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      emerald: "bg-emerald-100 text-emerald-600",
      amber: "bg-amber-100 text-amber-600",
      gray: "bg-gray-100 text-gray-600"
    }
    return {
      ...config,
      colorClass: colorClasses[config.color as keyof typeof colorClasses]
    }
  }

  const filteredDocuments = DOCUMENTS.filter(doc => {
    const matchesClient = selectedClient ? doc.clientId === selectedClient : true
    const matchesSearch = searchTerm === "" || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesClient && matchesSearch && matchesStatus && matchesType
  })

  const getDocumentsByClient = (clientId: string) => {
    return DOCUMENTS.filter(doc => doc.clientId === clientId)
  }

  const groupDocumentsByFolder = (documents: Document[]) => {
    return documents.reduce((acc, doc) => {
      if (!acc[doc.folderPath]) {
        acc[doc.folderPath] = []
      }
      acc[doc.folderPath].push(doc)
      return acc
    }, {} as Record<string, Document[]>)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-1 text-gray-900">Trade Confirmation Documents</h1>
                      <p className="text-body text-gray-600 mt-1">Client documents organized by portfolio</p>
        </div>
        <Button className="bg-zinc-900 text-zinc-50 hover:bg-zinc-800">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 bg-gray-50 border-gray-200">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="id">Identity</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Client Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CLIENTS.map((client) => {
          const clientDocuments = getDocumentsByClient(client.id)
          const verifiedCount = clientDocuments.filter(d => d.status === "verified").length
          const pendingCount = clientDocuments.filter(d => d.status === "pending").length
          
          return (
            <div 
              key={client.id}
              className={cn(
                "bg-white rounded-xl p-6 border transition-all cursor-pointer hover:shadow-md",
                selectedClient === client.id ? "border-blue-300 bg-blue-50" : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => setSelectedClient(selectedClient === client.id ? null : client.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-xs text-gray-600">{client.totalDocuments} documents</p>
                  </div>
                </div>
                {pendingCount > 0 && (
                  <Badge variant="outline" className="bg-amber-100 text-amber-600 border-amber-200">
                    {pendingCount} pending
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verified:</span>
                  <span className="font-medium text-emerald-600">{verifiedCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-medium text-amber-600">{pendingCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Last activity:</span>
                  <span className="font-medium text-gray-900">{new Date(client.lastActivity).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Client Documents - Organized by Folders */}
      {selectedClient && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-gray-900" />
                <h2 className="text-lg font-semibold text-gray-900">
                  {CLIENTS.find(c => c.id === selectedClient)?.name} Documents
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClient(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                Close
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            <Accordion type="multiple" className="space-y-4">
              {Object.entries(groupDocumentsByFolder(getDocumentsByClient(selectedClient))).map(([folder, documents]) => (
                <AccordionItem key={folder} value={folder} className="border border-gray-200 rounded-lg">
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <FolderOpen className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-medium text-gray-900">{folder}</h3>
                        <p className="text-xs text-gray-600">{documents.length} documents</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((document) => {
                        const statusConfig = getStatusConfig(document.status)
                        const categoryConfig = getCategoryConfig(document.type)
                        const Icon = categoryConfig.icon
                        
                        return (
                          <div 
                            key={document.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className={cn("p-2 rounded-lg", categoryConfig.colorClass)}>
                                <Icon className="w-4 h-4" />
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
                            
                            <div className="space-y-2">
                              <h4 className="font-medium text-gray-900 text-sm">
                                {document.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {document.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{document.size}</span>
                                <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2 mt-4">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-white border-gray-200 hover:bg-gray-50"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}

      {/* All Documents View */}
      {!selectedClient && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-5 h-5 text-gray-900" />
              <h2 className="text-lg font-semibold text-gray-900">All Documents</h2>
              <Badge variant="outline" className="bg-gray-100 text-gray-600">
                {filteredDocuments.length} documents
              </Badge>
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
          <div className="p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((document) => {
                  const statusConfig = getStatusConfig(document.status)
                  const categoryConfig = getCategoryConfig(document.type)
                  const Icon = categoryConfig.icon
                  return (
                    <div 
                      key={document.id}
                      className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={cn("p-2 rounded-lg", categoryConfig.colorClass)}>
                          <Icon className="w-4 h-4" />
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
                      <div className="space-y-2">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {document.name}
                        </h3>
                        <p className="text-xs text-blue-600 font-medium">
                          {document.clientName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {document.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{document.size}</span>
                          <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 bg-white border-gray-200 hover:bg-gray-50"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-white border-gray-200 hover:bg-gray-50"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Document Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((document) => {
                    const statusConfig = getStatusConfig(document.status)
                    const categoryConfig = getCategoryConfig(document.type)
                    const Icon = categoryConfig.icon
                    return (
                      <TableRow key={document.id}>
                        <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                        <TableCell>{document.name}</TableCell>
                        <TableCell>
                          <span className={cn("inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium", categoryConfig.colorClass)}>
                            <Icon className="w-4 h-4" />
                            {categoryConfig.title}
                          </span>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{document.clientName}</TableCell>
                        <TableCell>{document.size}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white border-gray-200 hover:bg-gray-50"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white border-gray-200 hover:bg-gray-50"
                            >
                              <Download className="w-3 h-3 mr-1" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-white border-gray-200 hover:bg-gray-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 