"use client"

import { Suspense } from "react"
import PortfolioContent from "@/components/kokonutui/portfolio-content"
import Layout from "@/components/kokonutui/layout"

function PortfolioPageContent() {
  return (
    <Layout>
      <PortfolioContent />
    </Layout>
  )
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading portfolio...</div>
      </div>
    }>
      <PortfolioPageContent />
    </Suspense>
  )
} 