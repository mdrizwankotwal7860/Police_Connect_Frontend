"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAuthService } from "@/services/mockAuthService"
import { Complaint, User } from "@/types"
import { FileText, Search, PlusCircle, Clock, CheckCircle2, ShieldAlert } from "lucide-react"

export default function CitizenDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        const userComplaints = await mockComplaintService.getComplaintsByUser(currentUser.id)
        setComplaints(userComplaints.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>
  }

  const pending = complaints.filter(c => ["Submitted", "Received", "Verification", "Info Required"].includes(c.status)).length
  const investigating = complaints.filter(c => ["Assigned", "Investigation"].includes(c.status)).length
  const resolved = complaints.filter(c => ["Resolved"].includes(c.status)).length
  const closed = complaints.filter(c => ["Closed", "Rejected"].includes(c.status)).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome, {user?.name}</h1>
          <p className="text-slate-500 text-sm">Here's an overview of your complaints and their current status.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Link href="/track" className="flex-1 sm:flex-none">
            <Button variant="outline" className="w-full"><Search className="h-4 w-4 mr-2" /> Track</Button>
          </Link>
          <Link href="/complaint" className="flex-1 sm:flex-none">
            <Button className="w-full bg-blue-900 hover:bg-blue-800"><PlusCircle className="h-4 w-4 mr-2" /> File New</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-full">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total</p>
              <h3 className="text-2xl font-bold text-slate-900">{complaints.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending</p>
              <h3 className="text-2xl font-bold text-slate-900">{pending}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Investigating</p>
              <h3 className="text-2xl font-bold text-slate-900">{investigating}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Resolved</p>
              <h3 className="text-2xl font-bold text-slate-900">{resolved + closed}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="border-b bg-slate-50/50">
          <CardTitle className="text-lg">Recent Complaints</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {complaints.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>You haven't filed any complaints yet.</p>
              <Link href="/complaint">
                <Button variant="link" className="text-blue-700">File your first complaint</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {complaints.slice(0, 5).map((complaint) => (
                <div key={complaint.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="text-sm font-medium text-slate-900 truncate">{complaint.subject}</p>
                      <StatusBadge status={complaint.status} />
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-mono">{complaint.trackingId}</span>
                      <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Link href={`/dashboard/complaints/${complaint.id}`}>
                    <Button variant="ghost" size="sm" className="text-blue-700 w-full sm:w-auto">View Details</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
          {complaints.length > 5 && (
            <div className="p-4 border-t text-center">
              <Link href="/dashboard/complaints">
                <Button variant="ghost" size="sm" className="text-blue-700 w-full">View All Complaints</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
