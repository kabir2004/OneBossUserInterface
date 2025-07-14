"use client"
import { LogOut, MoveUpRight, Settings, CreditCard, FileText, User, Edit, Save, X, Mail, Phone, MapPin, Calendar, Shield, CheckCircle, Clock, AlertCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ProfileModal from "./profile-modal"

interface MenuItem {
  label: string
  value?: string
  href: string
  icon?: React.ReactNode
  external?: boolean
}

interface Profile01Props {
  name: string
  role: string
  avatar: string
  subscription?: string
}

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
  occupation: string
  employer: string
  kycStatus: "verified" | "pending" | "rejected"
}

const defaultProfile = {
  name: "Brent Andersen",
  role: "Retired Homemaker",
  avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
  subscription: "Active",
} satisfies Required<Profile01Props>

const INITIAL_PROFILE_DATA: ProfileData = {
  firstName: "Brent",
  lastName: "Andersen",
  email: "naumche.lazarevski@gmail.com",
  phone: "555-555-5555",
  address: "322 Main Street",
  city: "Lewisporte",
  state: "NL",
  zipCode: "H0H 0H0",
  dateOfBirth: "Aug. 22, 1952",
  occupation: "Retired Homemaker",
  employer: "N/a",
  kycStatus: "verified",
}

export default function Profile01({
  name = defaultProfile.name,
  role = defaultProfile.role,
  avatar = defaultProfile.avatar,
  subscription = defaultProfile.subscription,
}: Partial<Profile01Props> = defaultProfile) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState<ProfileData>(INITIAL_PROFILE_DATA)
  const [editData, setEditData] = useState<ProfileData>(INITIAL_PROFILE_DATA)

  const menuItems: MenuItem[] = [
    {
      label: "Settings",
      href: "/settings",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      label: "Subscription",
      value: subscription,
      href: "#",
      icon: <CreditCard className="w-4 h-4" />,
      external: false,
    },
    {
      label: "Terms & Policies",
      href: "#",
      icon: <FileText className="w-4 h-4" />,
      external: true,
    },
  ]

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
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

  const kycConfig = getKycStatusConfig(profileData.kycStatus)

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="relative px-6 pt-6 pb-6">
          {/* Profile Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative shrink-0">
              <Image
                src={avatar}
                alt={name}
                width={64}
                height={64}
                className="rounded-full ring-4 ring-white object-cover"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-zinc-900">{name}</h2>
              <p className="text-sm text-zinc-600">{role}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  {kycConfig.text}
                </Badge>
              </div>
            </div>
          </div>

          <div className="h-px bg-zinc-200 my-4" />

          {/* Quick Profile Info */}
          {!isEditing ? (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileData.city}, {profileData.state}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileData.dateOfBirth}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Email</label>
                <Input 
                  value={editData.email} 
                  onChange={e => handleInputChange('email', e.target.value)} 
                  className="text-sm h-8" 
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Phone</label>
                <Input 
                  value={editData.phone} 
                  onChange={e => handleInputChange('phone', e.target.value)} 
                  className="text-sm h-8" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">City</label>
                  <Input 
                    value={editData.city} 
                    onChange={e => handleInputChange('city', e.target.value)} 
                    className="text-sm h-8" 
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">State</label>
                  <Input 
                    value={editData.state} 
                    onChange={e => handleInputChange('state', e.target.value)} 
                    className="text-sm h-8" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!isEditing ? (
            <div className="flex gap-2 mb-4">
              <ProfileModal 
                trigger={
                  <Button 
                    size="sm" 
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    <User className="w-3 h-3 mr-1" />
                    View Full Profile
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="flex gap-2 mb-4">
              <Button 
                onClick={handleSave} 
                size="sm" 
                className="flex-1 bg-green-600 text-white hover:bg-green-700"
              >
                <Save className="w-3 h-3 mr-1" />
                Save
              </Button>
              <Button 
                onClick={handleCancel} 
                size="sm" 
                variant="outline"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          )}

          <div className="h-px bg-zinc-200 my-4" />

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900">{item.label}</span>
                </div>
                <div className="flex items-center">
                  {item.value && <span className="text-sm text-zinc-500 mr-2">{item.value}</span>}
                  {item.external && <MoveUpRight className="w-4 h-4" />}
                </div>
              </Link>
            ))}

            <button
              type="button"
              className="w-full flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium text-zinc-900">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
