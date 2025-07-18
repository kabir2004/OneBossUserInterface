import type { ReactNode } from "react"
import Sidebar from "./sidebar"
import TopNav from "./top-nav"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-8 bg-white">{children}</main>
      </div>
    </div>
  )
}
