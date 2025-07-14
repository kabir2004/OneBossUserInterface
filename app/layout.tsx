import { Inter } from "next/font/google"
import "./globals.css"
import Layout from "@/components/kokonutui/layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "OneBoss",
  description: "OneBoss: Modern Portfolio Management Platform",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
