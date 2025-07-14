"use client"
import ApprovalsContent from "@/components/kokonutui/approvals-content"
import { useRouter } from "next/navigation"

export default function ApprovalsPage() {
  const router = useRouter();
  return (
    <ApprovalsContent onRowClick={id => router.push(`/approvals/${id}`)} />
  )
} 