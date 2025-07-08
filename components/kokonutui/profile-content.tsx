"use client"
import { cn } from "@/lib/utils"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Building2,
  CreditCard,
  FileText,
  Camera
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import Image from "next/image"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  dateOfBirth: string
  ssn: string
  occupation: string
  employer: string
  annualIncome: string
  netWorth: string
  riskTolerance: string
  investmentExperience: string
  kycStatus: "verified" | "pending" | "rejected"
  kycDocuments: string[]
}

const INITIAL_PROFILE: ProfileData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  dateOfBirth: "1985-03-15",
  ssn: "***-**-1234",
  occupation: "Software Engineer",
  employer: "Tech Corp",
  annualIncome: "$150,000 - $200,000",
  netWorth: "$500,000 - $1,000,000",
  riskTolerance: "Moderate",
  investmentExperience: "Intermediate",
  kycStatus: "verified",
  kycDocuments: ["Driver's License", "Passport", "W-2 Form"]
}

export default function ProfileContent() {
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<ProfileData>(INITIAL_PROFILE)

  const handleSave = () => {
    setProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profile)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }))
  }

  const getKycStatusConfig = (status: string) => {
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

  const kycConfig = getKycStatusConfig(profile.kycStatus)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-black dark:text-white">Profile</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Personal information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="border border-black dark:border-white text-black dark:text-white px-3 py-1 rounded-md text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-md text-xs border border-black dark:border-white"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-md text-xs border border-black dark:border-white"
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">First Name</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.firstName : profile.firstName}
              disabled={!isEditing}
              onChange={e => handleInputChange('firstName', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Last Name</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.lastName : profile.lastName}
              disabled={!isEditing}
              onChange={e => handleInputChange('lastName', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Email</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.email : profile.email}
              disabled={!isEditing}
              onChange={e => handleInputChange('email', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Phone</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.phone : profile.phone}
              disabled={!isEditing}
              onChange={e => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Address</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.address : profile.address}
              disabled={!isEditing}
              onChange={e => handleInputChange('address', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">City</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.city : profile.city}
              disabled={!isEditing}
              onChange={e => handleInputChange('city', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">State</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.state : profile.state}
              disabled={!isEditing}
              onChange={e => handleInputChange('state', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-500 dark:text-neutral-400">Zip Code</label>
            <Input
              className="rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white px-2 py-1 text-xs"
              value={isEditing ? editData.zipCode : profile.zipCode}
              disabled={!isEditing}
              onChange={e => handleInputChange('zipCode', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 