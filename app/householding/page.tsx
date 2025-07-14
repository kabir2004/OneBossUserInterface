"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Copy, Share, X, Key } from "lucide-react"

function generateUUID() {
  // Simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

type KeyEntry = {
  key: string
  created: string
  status: string
  recipient: string
}

export default function HouseholdingPage() {
  const [keys, setKeys] = useState<KeyEntry[]>([])
  const [newKey, setNewKey] = useState<string | null>(null)

  const handleGenerateKey = () => {
    const key = generateUUID()
    const now = new Date()
    const created = now.toLocaleString()
    const entry: KeyEntry = {
      key,
      created,
      status: "Sent invitation",
      recipient: key,
    }
    setNewKey(key)
    setKeys([entry, ...keys])
  }

  const handleCancel = (key: string) => {
    setKeys(keys.filter(k => k.key !== key))
    if (newKey === key) setNewKey(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1 text-gray-900">Householding</h1>
          <p className="text-body text-gray-600 mt-1">Share read-only account access with other people using security keys</p>
        </div>
        <Button className="button-primary">
          <Download className="w-4 h-4 mr-2" />
          Export Keys
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Granting access */}
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="text-heading-3 text-gray-900">Granting Access</CardTitle>
            <p className="text-sm text-gray-600">Generate keys to share read-only access with others</p>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGenerateKey} className="button-primary mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Generate Key
            </Button>
            {newKey && (
              <div className="border-t pt-4 mt-4">
                <div className="font-semibold mb-2 text-sm text-gray-900">New Householding Key</div>
                <div className="text-sm mb-3 text-gray-600">This key will grant read-only access to your account. Only one key per recipient is allowed.</div>
                <div className="font-mono text-sm bg-gray-100 rounded p-3 mb-3 select-all border border-gray-200">{newKey}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share className="w-3 h-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Generated Keys</h3>
                <span className="text-xs text-gray-500">{keys.length} keys</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Created</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Recipient</TableHead>
                    <TableHead className="text-xs"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keys.map(k => (
                    <TableRow key={k.key}>
                      <TableCell className="text-sm">{k.created}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">
                          {k.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-gray-600">{k.recipient}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleCancel(k.key)} className="text-xs">
                          <X className="w-3 h-3 mr-1" />
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Accept Key */}
        <Card className="card-elevated">
          <CardHeader className="pb-3">
            <CardTitle className="text-heading-3 text-gray-900">Accept Key</CardTitle>
            <p className="text-sm text-gray-600">Enter keys to access shared accounts</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Key className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Accepted Keys</h3>
              <p className="text-sm text-gray-600 mb-4">You haven't accepted any householding keys yet.</p>
              <Button variant="outline" className="button-secondary">
                <Plus className="w-4 h-4 mr-2" />
                Enter Key
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 