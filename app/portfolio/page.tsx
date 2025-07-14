"use client"

import { Suspense } from "react"
import PortfolioContent from "@/components/kokonutui/portfolio-content"

function PortfolioPageContent() {
  return <PortfolioContent />
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioPageContent />
    </Suspense>
  )
} 