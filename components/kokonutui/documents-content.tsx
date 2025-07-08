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
  FolderOpen
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

interface Document {
  id: string
  name: string
  type: "id" | "legal" | "trust" | "financial" | "other"
  category: string
  size: string
  uploadDate: string
  status: "verified" | "pending" | "rejected"
  description: string
}

const DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Driver's License - Front",
    type: "id",
    category: "Government ID",
    size: "2.1 MB",
    uploadDate: "2024-01-15",
    status: "verified",
    description: "Front side of driver's license"
  },
  {
    id: "2",
    name: "Driver's License - Back",
    type: "id",
    category: "Government ID",
    size: "1.8 MB",
    uploadDate: "2024-01-15",
    status: "verified",
    description: "Back side of driver's license"
  },
  {
    id: "3",
    name: "Passport",
    type: "id",
    category: "Government ID",
    size: "3.2 MB",
    uploadDate: "2024-01-10",
    status: "verified",
    description: "Valid passport document"
  },
  {
    id: "4",
    name: "Trust Agreement",
    type: "trust",
    category: "Legal Documents",
    size: "5.7 MB",
    uploadDate: "2024-01-05",
    status: "verified",
    description: "Family trust agreement document"
  },
  {
    id: "5",
    name: "Power of Attorney",
    type: "legal",
    category: "Legal Documents",
    size: "2.9 MB",
    uploadDate: "2024-01-08",
    status: "pending",
    description: "Power of attorney document"
  },
  {
    id: "6",
    name: "W-2 Form 2023",
    type: "financial",
    category: "Tax Documents",
    size: "1.5 MB",
    uploadDate: "2024-01-12",
    status: "verified",
    description: "2023 W-2 tax form"
  },
  {
    id: "7",
    name: "Bank Statement - December 2024",
    type: "financial",
    category: "Financial Documents",
    size: "2.3 MB",
    uploadDate: "2024-01-20",
    status: "pending",
    description: "Monthly bank statement"
  },
  {
    id: "8",
    name: "Investment Account Statement",
    type: "financial",
    category: "Financial Documents",
    size: "4.1 MB",
    uploadDate: "2024-01-18",
    status: "verified",
    description: "Investment account monthly statement"
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
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "verified":
        return {
          icon: CheckCircle,
          class: "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-100 dark:bg-emerald-900/30",
          text: "Verified"
        }
      case "pending":
        return {
          icon: Clock,
          class: "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-100 dark:bg-amber-900/30",
          text: "Pending"
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

  const getCategoryConfig = (type: string) => {
    const config = DOCUMENT_CATEGORIES[type as keyof typeof DOCUMENT_CATEGORIES]
    const colorClasses = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
      gray: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
    }
    return {
      ...config,
      colorClass: colorClasses[config.color as keyof typeof colorClasses]
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your secure documents and files</p>
        </div>
        <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(DOCUMENT_CATEGORIES).map(([key, category]) => {
          const config = getCategoryConfig(key)
          const Icon = config.icon
          const documentsInCategory = DOCUMENTS.filter(doc => doc.type === key)
          
          return (
            <div 
              key={key}
              className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-lg", config.colorClass)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{config.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{documentsInCategory.length} documents</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{config.description}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-100 dark:hover:bg-[#2B2B30]"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Document
              </Button>
            </div>
          )
        })}
      </div>

      {/* Document List */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23]">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-5 h-5 text-gray-900 dark:text-white" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Documents</h2>
            </div>
            <Select>
              <SelectTrigger className="w-48 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Documents</SelectItem>
                <SelectItem value="id">Identification</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="trust">Trust</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS.map((document) => {
              const statusConfig = getStatusConfig(document.status)
              const categoryConfig = getCategoryConfig(document.type)
              const Icon = categoryConfig.icon
              
              return (
                <div 
                  key={document.id}
                  className="bg-gray-50 dark:bg-[#1F1F23] rounded-lg p-4 border border-gray-200 dark:border-[#1F1F23] hover:border-gray-300 dark:hover:border-[#2B2B30] transition-colors"
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
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {document.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {document.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{document.size}</span>
                      <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white dark:bg-[#0F0F12] border-gray-200 dark:border-[#1F1F23] hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
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