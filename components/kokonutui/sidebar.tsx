"use client"

import {
  BarChart2,
  Receipt,
  Building2,
  CreditCard,
  Folder,
  Wallet,
  Users2,
  Shield,
  MessagesSquare,
  Video,
  Settings,
  HelpCircle,
  Menu,
  PieChart,
  FileText,
  FileUp,
  CheckCircle,
  Home,
  Calendar,
  TrendingUp,
} from "lucide-react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: any
    children: React.ReactNode
  }) {
    // Only determine active state after component has mounted
    const isActive = mounted && pathname === href;
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={
          `group flex items-center gap-2 px-2 py-1 my-1 rounded-md transition-all duration-100 active:scale-95 font-medium text-body-small
          ${isActive ?
            'bg-neutral-100 text-black' :
            'text-black hover:bg-neutral-100'}
          `
        }
        style={{
          fontWeight: 500,
          minHeight: '32px',
          minWidth: '32px',
          maxWidth: '100%',
        }}
      >
        <span className="flex items-center justify-center w-4 h-4">
          <Icon className="h-4 w-4" />
        </span>
        <span className="truncate">{children}</span>
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="px-3 mb-8">
              <span className="text-xl font-semibold text-gray-900">
                Sterling Mutuals
              </span>
            </div>
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Overview
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard" icon={Home}>
                    Dashboard
                  </NavItem>
                  <NavItem href="/portfolio" icon={PieChart}>
                    Portfolio
                  </NavItem>
                  <NavItem href="/analytics" icon={BarChart2}>
                    Analytics
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Documents
                </div>
                <div className="space-y-1">
                  <NavItem href="/estatements" icon={FileText}>
                    E-Statements
                  </NavItem>
                  <NavItem href="/documents" icon={FileUp}>
                    Documents
                  </NavItem>
                  <NavItem href="/trade-confirmation" icon={Receipt}>
                    Trade Confirmation
                  </NavItem>
                  <NavItem href="/approvals" icon={CheckCircle}>
                    Approvals
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Management
                </div>
                <div className="space-y-1">
                  <NavItem href="/householding" icon={Users2}>
                    Householding
                  </NavItem>
                  <NavItem href="/advisor" icon={Building2}>
                    Advisor
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
