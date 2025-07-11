"use client"
import ApprovalsContent from "@/components/kokonutui/approvals-content"
import Layout from "@/components/kokonutui/layout"
import { useRouter } from "next/navigation"

export default function ApprovalsPage() {
  const router = useRouter();
  return (
    <Layout>
      <ApprovalsContent onRowClick={id => router.push(`/approvals/${id}`)} />
    </Layout>
  )
} 