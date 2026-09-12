"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAuthService } from "@/services/mockAuthService"
import { Complaint, User } from "@/types"
import { Search, PlusCircle, Filter } from "lucide-react"

export default function MyComplaints() {
  const [user, setUser] = useState<User | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filtered, setFiltered] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const userComplaints = await mockComplaintService.getComplaintsByUser(currentUser.id)
        const sorted = userComplaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setComplaints(sorted)
        setFiltered(sorted)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (!search) {
      setFiltered(complaints)
      return
    }
    const term = search.toLowerCase()
    setFiltered(complaints.filter(c => 
      c.trackingId.toLowerCase().includes(term) || 
      c.subject.toLowerCase().includes(term)
    ))
  }, [search, complaints])

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading complaints...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Complaints</h1>
          <p className="text-slate-500 text-sm">View and manage all your submitted complaints.</p>
        </div>
        <Link href="/complaint">
          <Button className="bg-blue-900 hover:bg-blue-800"><PlusCircle className="h-4 w-4 mr-2" /> File Complaint</Button>
        </Link>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by ID or Subject..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          </div>

          <div className="rounded-md border overflow-hidden hidden md:block">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">Tracking ID</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Subject</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Date</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filtered.map(complaint => (
                  <tr key={complaint.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs">{complaint.trackingId}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{complaint.subject}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={complaint.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/dashboard/complaints/${complaint.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-700">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile view */}
          <div className="grid gap-4 md:hidden">
            {filtered.map(complaint => (
              <div key={complaint.id} className="border rounded-md p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{complaint.trackingId}</span>
                  <StatusBadge status={complaint.status} />
                </div>
                <h3 className="font-medium text-slate-900">{complaint.subject}</h3>
                <p className="text-xs text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                <Link href={`/dashboard/complaints/${complaint.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-blue-700">View Details</Button>
                </Link>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-slate-500 border rounded-md">
                No complaints found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
