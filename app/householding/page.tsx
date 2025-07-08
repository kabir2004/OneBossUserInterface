import { Users } from "lucide-react"
import Layout from "@/components/kokonutui/layout"

export default function HouseholdingPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Householding</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage grouped accounts by household</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-12 border border-gray-200 dark:border-[#1F1F23] text-center">
          <Users className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Householding Coming Soon</h3>
          <p className="text-gray-600 dark:text-gray-400">
            This feature will allow you to group accounts by household and link spouse/children/trusts.
          </p>
        </div>
      </div>
    </Layout>
  )
} 