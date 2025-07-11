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
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

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
  // Added fields for new UI
  title?: string
  gender?: string
  maritalStatus?: string
  dependents?: string
  deliveryConsentDate?: string
  taxCode?: string
  homePhone?: string
  workPhone?: string
  cellPhone?: string
  country?: string
  mailingAddress1?: string
  mailingCity?: string
  mailingState?: string
  mailingZip?: string
  mailingCountry?: string
  spouseTitle?: string
  spouseName?: string
  spouseSurname?: string
  spouseDOB?: string
  spouseGender?: string
  spouseOccupation?: string
  spouseEmployer?: string
  spouseAddress?: string
  spouseCity?: string
  spouseState?: string
  spouseZip?: string
  spouseCountry?: string
}

const INITIAL_PROFILE: ProfileData = {
  firstName: "Brent",
  lastName: "Andersen",
  email: "naumche.lazarevski@gmail.com",
  phone: "555-555-5555",
  address: "322 Main Street",
  city: "Lewisporte",
  state: "NL",
  zipCode: "H0H 0H0",
  dateOfBirth: "Aug. 22, 1952",
  ssn: "",
  occupation: "Retired Homemaker",
  employer: "N/a",
  annualIncome: "",
  netWorth: "",
  riskTolerance: "",
  investmentExperience: "",
  kycStatus: "verified",
  kycDocuments: [],
  // New fields
  title: "Mrs.",
  gender: "F",
  maritalStatus: "Married",
  dependents: "0",
  deliveryConsentDate: "03/21/2023",
  taxCode: "NL",
  homePhone: "555-555-5555",
  workPhone: "555-555-5555",
  cellPhone: "555-555-5555",
  country: "Canada",
  mailingAddress1: "PO Box 1184",
  mailingCity: "Lewisporte",
  mailingState: "NL",
  mailingZip: "H0H 0H0",
  mailingCountry: "Canada",
  spouseTitle: "Mr.",
  spouseName: "Antonio",
  spouseSurname: "Andersen",
  spouseDOB: "Dec. 8, 1945",
  spouseGender: "M",
  spouseOccupation: "",
  spouseEmployer: "",
  spouseAddress: "322 Main Street",
  spouseCity: "Lewisporte",
  spouseState: "NL",
  spouseZip: "H0H 0H0",
  spouseCountry: "Canada"
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

  const kycConfig = getKycStatusConfig(profile.kycStatus)

  return (
    <div className="space-y-8 max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 text-xs text-neutral-500">ID</div>
              <div className="font-semibold text-sm">68982</div>
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Title</div>
              <Input value={isEditing ? editData.title || '' : profile.title || ''} disabled={!isEditing} onChange={e => handleInputChange('title', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Name</div>
              <Input value={isEditing ? editData.firstName : profile.firstName} disabled={!isEditing} onChange={e => handleInputChange('firstName', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Surname</div>
              <Input value={isEditing ? editData.lastName : profile.lastName} disabled={!isEditing} onChange={e => handleInputChange('lastName', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Gender</div>
              <Input value={isEditing ? editData.gender || '' : profile.gender || ''} disabled={!isEditing} onChange={e => handleInputChange('gender', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Marital Status</div>
              <Input value={isEditing ? editData.maritalStatus || '' : profile.maritalStatus || ''} disabled={!isEditing} onChange={e => handleInputChange('maritalStatus', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Dependents</div>
              <Input value={isEditing ? editData.dependents || '' : profile.dependents || ''} disabled={!isEditing} onChange={e => handleInputChange('dependents', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Date of Birth</div>
              <Input value={isEditing ? editData.dateOfBirth : profile.dateOfBirth} disabled={!isEditing} onChange={e => handleInputChange('dateOfBirth', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Delivery Status</div>
              <Badge variant="secondary">eStatements</Badge>
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Delivery Consent Date</div>
              <Input value={isEditing ? editData.deliveryConsentDate || '' : profile.deliveryConsentDate || ''} disabled={!isEditing} onChange={e => handleInputChange('deliveryConsentDate', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Status</div>
              <Badge variant="default">Active</Badge>
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Occupation</div>
              <Input value={isEditing ? editData.occupation : profile.occupation} disabled={!isEditing} onChange={e => handleInputChange('occupation', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Employer</div>
              <Input value={isEditing ? editData.employer : profile.employer} disabled={!isEditing} onChange={e => handleInputChange('employer', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Tax Code</div>
              <Input value={isEditing ? editData.taxCode || '' : profile.taxCode || ''} disabled={!isEditing} onChange={e => handleInputChange('taxCode', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="mb-2 text-xs text-neutral-500">Email</div>
              <Input value={isEditing ? editData.email : profile.email} disabled={!isEditing} onChange={e => handleInputChange('email', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Home Phone</div>
              <Input value={isEditing ? editData.homePhone || '' : profile.homePhone || ''} disabled={!isEditing} onChange={e => handleInputChange('homePhone', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Work Phone</div>
              <Input value={isEditing ? editData.workPhone || '' : profile.workPhone || ''} disabled={!isEditing} onChange={e => handleInputChange('workPhone', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Cell Phone</div>
              <Input value={isEditing ? editData.cellPhone || '' : profile.cellPhone || ''} disabled={!isEditing} onChange={e => handleInputChange('cellPhone', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Residential Address */}
        <Card>
          <CardHeader>
            <CardTitle>Residential Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="mb-2 text-xs text-neutral-500">Address Line 1</div>
              <Input value={isEditing ? editData.address : profile.address} disabled={!isEditing} onChange={e => handleInputChange('address', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">City</div>
              <Input value={isEditing ? editData.city : profile.city} disabled={!isEditing} onChange={e => handleInputChange('city', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Province</div>
              <Input value={isEditing ? editData.state : profile.state} disabled={!isEditing} onChange={e => handleInputChange('state', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Postal Code</div>
              <Input value={isEditing ? editData.zipCode : profile.zipCode} disabled={!isEditing} onChange={e => handleInputChange('zipCode', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Country</div>
              <Input value={isEditing ? editData.country || '' : profile.country || ''} disabled={!isEditing} onChange={e => handleInputChange('country', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
        {/* Mailing Address */}
        <Card>
          <CardHeader>
            <CardTitle>Mailing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="mb-2 text-xs text-neutral-500">Address Line 1</div>
              <Input value={isEditing ? editData.mailingAddress1 || '' : profile.mailingAddress1 || ''} disabled={!isEditing} onChange={e => handleInputChange('mailingAddress1', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">City</div>
              <Input value={isEditing ? editData.mailingCity || '' : profile.mailingCity || ''} disabled={!isEditing} onChange={e => handleInputChange('mailingCity', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Province</div>
              <Input value={isEditing ? editData.mailingState || '' : profile.mailingState || ''} disabled={!isEditing} onChange={e => handleInputChange('mailingState', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Postal Code</div>
              <Input value={isEditing ? editData.mailingZip || '' : profile.mailingZip || ''} disabled={!isEditing} onChange={e => handleInputChange('mailingZip', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Country</div>
              <Input value={isEditing ? editData.mailingCountry || '' : profile.mailingCountry || ''} disabled={!isEditing} onChange={e => handleInputChange('mailingCountry', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
        {/* Bank Accounts */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Institution ID</TableHead>
                  <TableHead>Branch ID</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Holder Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Demo bank account 001</TableCell>
                  <TableCell>17564</TableCell>
                  <TableCell>***343</TableCell>
                  <TableCell>Brent Andersen</TableCell>
                  <TableCell>Brent Andersen</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spousal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Spousal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 text-xs text-neutral-500">Title</div>
              <Input value={isEditing ? editData.spouseTitle || '' : profile.spouseTitle || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseTitle', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Name</div>
              <Input value={isEditing ? editData.spouseName || '' : profile.spouseName || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseName', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Surname</div>
              <Input value={isEditing ? editData.spouseSurname || '' : profile.spouseSurname || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseSurname', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Date of Birth</div>
              <Input value={isEditing ? editData.spouseDOB || '' : profile.spouseDOB || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseDOB', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Gender</div>
              <Input value={isEditing ? editData.spouseGender || '' : profile.spouseGender || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseGender', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Occupation</div>
              <Input value={isEditing ? editData.spouseOccupation || '' : profile.spouseOccupation || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseOccupation', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Employer</div>
              <Input value={isEditing ? editData.spouseEmployer || '' : profile.spouseEmployer || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseEmployer', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
        {/* Spousal Addresses */}
        <Card>
          <CardHeader>
            <CardTitle>Spousal Residential Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="mb-2 text-xs text-neutral-500">Address Line 1</div>
              <Input value={isEditing ? editData.spouseAddress || '' : profile.spouseAddress || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseAddress', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">City</div>
              <Input value={isEditing ? editData.spouseCity || '' : profile.spouseCity || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseCity', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Province</div>
              <Input value={isEditing ? editData.spouseState || '' : profile.spouseState || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseState', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Postal Code</div>
              <Input value={isEditing ? editData.spouseZip || '' : profile.spouseZip || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseZip', e.target.value)} className="text-sm" />
            </div>
            <div>
              <div className="mb-2 text-xs text-neutral-500">Country</div>
              <Input value={isEditing ? editData.spouseCountry || '' : profile.spouseCountry || ''} disabled={!isEditing} onChange={e => handleInputChange('spouseCountry', e.target.value)} className="text-sm" />
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4 justify-end mt-8">
        <Button className="bg-green-600 text-white">Update My Personal Information Online</Button>
        <Button variant="outline" className="border-green-600 text-green-600">Opt Out of eDelivery</Button>
        {isEditing ? (
          <Button onClick={handleSave} className="bg-black text-white">Save</Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="bg-black text-white">Edit</Button>
        )}
      </div>
    </div>
  )
} 