"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAuthService } from "@/services/mockAuthService"
import { Complaint, User } from "@/types"
import { ShieldAlert, List, Clock, CheckCircle2, FileText, Activity } from "lucide-react"

export default function PoliceDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [assignedCases, setAssignedCases] = useState<Complaint[]>([])
  const [stationQueue, setStationQueue] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser && currentUser.stationId) {
        setUser(currentUser)
        const myCases = await mockComplaintService.getComplaintsByOfficer(currentUser.id)
        setAssignedCases(myCases.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
        
        const stationCases = await mockComplaintService.getComplaintsByStation(currentUser.stationId)
        setStationQueue(stationCases.filter(c => ["Submitted", "Received", "Verification"].includes(c.status)))
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading officer workspace...</div>

  const activeInvestigations = assignedCases.filter(c => ["Assigned", "Investigation", "Info Required"].includes(c.status)).length
  const resolvedCases = assignedCases.filter(c => ["Resolved", "Closed"].includes(c.status)).length
  const highPriority = assignedCases.filter(c => ["High", "Critical"].includes(c.priority)).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Officer Workspace</h1>
          <p className="text-slate-500 text-sm">Welcome back, {user?.name}. Here is your current workload.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Link href="/police/complaints" className="flex-1 md:flex-none">
            <Button variant="outline" className="w-full bg-white"><List className="h-4 w-4 mr-2" /> Station Queue</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Cases</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeInvestigations}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">High Priority</p>
              <h3 className="text-2xl font-bold text-slate-900">{highPriority}</h3>
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
              <h3 className="text-2xl font-bold text-slate-900">{resolvedCases}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">New in Station</p>
              <h3 className="text-2xl font-bold text-slate-900">{stationQueue.length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">My Active Investigations</CardTitle>
            <Button variant="link" size="sm" className="text-blue-700" asChild>
              <Link href="/police/investigations">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {assignedCases.filter(c => ["Assigned", "Investigation", "Info Required"].includes(c.status)).slice(0, 5).map(c => (
                <div key={c.id} className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-slate-500">{c.trackingId}</span>
                      <PriorityBadge priority={c.priority} />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">{c.subject}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <Link href={`/police/complaints/${c.id}`} className="shrink-0">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Update Status</Button>
                  </Link>
                </div>
              ))}
              {assignedCases.length === 0 && (
                <div className="p-8 text-center text-slate-500">No active investigations.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Station Queue (Pending Review)</CardTitle>
            <Button variant="link" size="sm" className="text-blue-700" asChild>
              <Link href="/police/complaints">Go to Queue</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {stationQueue.slice(0, 5).map(c => (
                <div key={c.id} className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-slate-500">{c.trackingId}</span>
                      <PriorityBadge priority={c.priority} />
                    </div>
                    <p className="text-sm font-medium text-slate-900">{c.subject}</p>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Submitted {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/police/complaints/${c.id}`} className="shrink-0">
                    <Button variant="ghost" size="sm" className="text-blue-700 w-full sm:w-auto">Review</Button>
                  </Link>
                </div>
              ))}
              {stationQueue.length === 0 && (
                <div className="p-8 text-center text-slate-500">Queue is empty.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
