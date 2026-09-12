"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAuthService } from "@/services/mockAuthService"
import { Complaint, User } from "@/types"
import { Search, Filter } from "lucide-react"

export default function PoliceQueue() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [filtered, setFiltered] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser && currentUser.stationId) {
        // Get all complaints for the station
        const stationCases = await mockComplaintService.getComplaintsByStation(currentUser.stationId)
        const sorted = stationCases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setComplaints(sorted)
        setFiltered(sorted)
      }
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    let result = complaints
    if (search) {
      const term = search.toLowerCase()
      result = result.filter(c => 
        c.trackingId.toLowerCase().includes(term) || 
        c.subject.toLowerCase().includes(term)
      )
    }
    if (statusFilter !== "all") {
      result = result.filter(c => c.status === statusFilter)
    }
    setFiltered(result)
  }, [search, statusFilter, complaints])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading queue...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Station Complaint Queue</h1>
        <p className="text-slate-500 text-sm">View and manage all complaints registered at your station.</p>
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
            <div className="w-full sm:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Submitted">Submitted</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Verification">Verification</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Investigation">Investigation</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="sm:w-auto"><Filter className="h-4 w-4 mr-2" /> More Filters</Button>
          </div>

          <div className="rounded-md border overflow-hidden hidden md:block">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">Tracking ID</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Priority</th>
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
                    <td className="px-4 py-3"><PriorityBadge priority={complaint.priority} /></td>
                    <td className="px-4 py-3 font-medium text-slate-900">{complaint.subject}</td>
                    <td className="px-4 py-3 text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={complaint.status} /></td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/police/complaints/${complaint.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-700">Open Workspace</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                      No complaints match your filters.
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
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                  <PriorityBadge priority={complaint.priority} />
                </div>
                <Link href={`/police/complaints/${complaint.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full text-blue-700">Open Workspace</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
