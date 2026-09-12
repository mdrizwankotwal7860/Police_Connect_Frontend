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
import { Users, FileText, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react"

export default function StationAdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [stationCases, setStationCases] = useState<Complaint[]>([])
  const [officers, setOfficers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser && currentUser.stationId) {
        setUser(currentUser)
        const cases = await mockComplaintService.getComplaintsByStation(currentUser.stationId)
        setStationCases(cases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        
        // Mock getting officers for this station
        // In reality, this would be an admin service call
        setOfficers([
          { id: "usr_off_1", email: "officer1@policeconnect.gov", name: "Officer John Doe", role: "officer", stationId: currentUser.stationId, mobile: "555-010-0001", createdAt: new Date().toISOString() },
          { id: "usr_off_2", email: "officer2@policeconnect.gov", name: "Officer Jane Smith", role: "officer", stationId: currentUser.stationId, mobile: "555-010-0002", createdAt: new Date().toISOString() }
        ])
      }
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading station dashboard...</div>

  const pendingAssignment = stationCases.filter(c => ["Submitted", "Received", "Verification"].includes(c.status)).length
  const activeInvestigations = stationCases.filter(c => ["Assigned", "Investigation"].includes(c.status)).length
  const resolved = stationCases.filter(c => ["Resolved", "Closed"].includes(c.status)).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Station Administrator</h1>
          <p className="text-slate-500 text-sm">Overview and management for your police station.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/officers">
            <Button variant="outline" className="bg-white"><Users className="h-4 w-4 mr-2" /> Manage Officers</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Cases</p>
              <h3 className="text-2xl font-bold text-slate-900">{stationCases.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Assignment</p>
              <h3 className="text-2xl font-bold text-slate-900">{pendingAssignment}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Investigations</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeInvestigations}</h3>
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
              <h3 className="text-2xl font-bold text-slate-900">{resolved}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Complaints (Needs Assignment)</CardTitle>
            <Button variant="link" size="sm" className="text-blue-700" asChild>
              <Link href="/police/complaints">View All Queue</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {stationCases.filter(c => ["Submitted", "Received", "Verification"].includes(c.status)).slice(0, 5).map(c => (
                <div key={c.id} className="p-4 hover:bg-slate-50 flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-slate-500">{c.trackingId}</span>
                      <PriorityBadge priority={c.priority} />
                    </div>
                    <p className="text-sm font-medium text-slate-900 mb-1">{c.subject}</p>
                    <StatusBadge status={c.status} />
                  </div>
                  <Link href={`/police/complaints/${c.id}`} className="shrink-0 flex items-center">
                    <Button variant="outline" size="sm">Assign Officer <ArrowRight className="h-4 w-4 ml-1" /></Button>
                  </Link>
                </div>
              ))}
              {pendingAssignment === 0 && (
                <div className="p-8 text-center text-slate-500">No cases pending assignment.</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-lg">Station Officers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {officers.map(off => (
                <div key={off.id} className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
                    {off.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{off.name}</p>
                    <p className="text-xs text-slate-500 truncate">{off.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link href="/admin/officers">
                <Button variant="ghost" size="sm" className="w-full text-blue-700">Manage Officers</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
