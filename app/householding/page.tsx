"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import Layout from "@/components/kokonutui/layout"

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
    <Layout>
      <div className="space-y-6 max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Householding</h1>
        <p className="text-gray-600 mb-4">Householding allows you to share read-only account access with other people, using a security key. The key is always under your control.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Granting access */}
          <Card>
            <CardHeader>
              <CardTitle>Granting access to other people</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGenerateKey} className="mb-4">Generate Key</Button>
              {newKey && (
                <div className="border-t pt-4 mt-4">
                  <div className="font-semibold mb-2">New Householding Key</div>
                  <div className="text-sm mb-2">This Key will grant Read Only access to your account. Only one key per recipient is allowed.</div>
                  <div className="font-mono text-lg bg-gray-100 rounded p-2 mb-2 select-all">{newKey}</div>
                </div>
              )}
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Created</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keys.map(k => (
                      <TableRow key={k.key}>
                        <TableCell>{k.created}</TableCell>
                        <TableCell>{k.status}</TableCell>
                        <TableCell className="font-mono text-xs">{k.recipient}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => handleCancel(k.key)}>Cancel</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {/* Accept Key placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Accept Key</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-500">There are no accepted Keys</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
} 