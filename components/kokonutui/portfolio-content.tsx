'use client'

import { cn } from "@/lib/utils"
import {
  ChevronDown,
  ChevronRight,
  Download,
  FileText,
  ArrowRight,
  Search,
  Calendar,
  Plus,
  Users,
  CreditCard,
  Building2,
  BadgeCheck,
  MoreHorizontal
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const ACCOUNTS = [
  {
    id: "070G225184",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    beneficiary: "Estate",
    totalValue: "$14,582.16",
    holdings: [
      {
        id: "FID-2302",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO SERIES B ISC FEL CAD",
        supplierAccount: "7848697653",
        units: "196.9722",
        price: "$14.1588",
        marketValue: "$2,774.81",
        bookValue: "$2,799.99"
      },
      {
        id: "FID-2502",
        subject: "FIDELITY GLOBAL INCOME PORTFOLIO DSC DSC CAD",
        supplierAccount: "625.6722",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,036.90"
      },
      {
        id: "FID-2928",
        subject: "FIDELITY GLOBAL INTRINSIC VALUE CLASS SERIES B ISC FEL CAD",
        supplierAccount: "8682703124",
        units: "625.6722",
        price: "$14.1588",
        marketValue: "$33,326.39",
        bookValue: "$3,838.90"
      }
    ],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$14,584.16"
  },
  {
    id: "070G225194",
    name: "TFSA Client Name, Individual Data Entry Wizard",
    beneficiary: "Estate",
    totalValue: "$77,477.32",
    holdings: [],
    settledCAD: "$0.00",
    settledUSD: "$0.00",
    totalInCAD: "$77,477.32"
  }
]

export default function PortfolioContent() {
  const [open, setOpen] = useState<string | null>(ACCOUNTS[0].id)

  return (
    <div className="space-y-6">
      {/* Top Summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Total Assets</h2>
          <div className="text-xs text-gray-500 dark:text-gray-400">as of August 7, 2020</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Button variant="outline" className="text-xs px-3 py-1 border-zinc-200 dark:border-[#1F1F23]">
            <Download className="w-4 h-4 mr-1" /> Download
          </Button>
          <div className="text-right">
            <div className="text-xs text-gray-500 dark:text-gray-400">Total value:</div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">$92,059.48</div>
          </div>
        </div>
      </div>

      {/* Accounts Accordion */}
      <Accordion type="single" collapsible value={open ?? undefined} onValueChange={setOpen} className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23]">
        {ACCOUNTS.map((account, idx) => (
          <AccordionItem key={account.id} value={account.id} className="border-b border-gray-200 dark:border-[#1F1F23]">
            <AccordionTrigger className="px-6 py-4 hover:no-underline flex items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:gap-2 w-full">
                <span className="font-medium text-gray-900 dark:text-white">{account.id} ({account.name})</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">(Beneficiary: {account.beneficiary})</span>
              </div>
              <div className="text-xs text-gray-900 dark:text-white font-semibold ml-auto">Total value: {account.totalValue}</div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              {/* Holdings Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Supplier Account</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Market value</TableHead>
                      <TableHead>Book Value</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {account.holdings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 dark:text-gray-400">No Holdings Found</TableCell>
                      </TableRow>
                    ) : (
                      account.holdings.map((h) => (
                        <TableRow key={h.id}>
                          <TableCell className="text-blue-600 dark:text-blue-400 underline cursor-pointer">{h.id} {h.subject}</TableCell>
                          <TableCell>{h.supplierAccount}</TableCell>
                          <TableCell>{h.units}</TableCell>
                          <TableCell>{h.price}</TableCell>
                          <TableCell>{h.marketValue}</TableCell>
                          <TableCell>{h.bookValue}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="text-xs px-2 py-1 border-zinc-200 dark:border-[#1F1F23]">Transactions</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              {/* Settled rows */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div>Settled Trust Account Balance CAD</div>
                <div>Settled Trust Account Balance USD</div>
              </div>
              <div className="mt-2 text-right font-semibold text-gray-900 dark:text-white">Total in CAD <span className="ml-4">{account.totalInCAD}</span></div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Recent Trading Activity */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Trading Activity</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-32 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" className="w-36 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]" />
            <Input type="date" className="w-36 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#1F1F23]" />
            <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4">Search</Button>
          </div>
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">No Transaction Found</div>
        </div>
      </div>

      {/* Recent Trust Transactions */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl border border-gray-200 dark:border-[#1F1F23] mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Trust Transactions</h2>
        </div>
        <div className="p-6">
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">No Trading Activities Found</div>
        </div>
      </div>
    </div>
  )
} 