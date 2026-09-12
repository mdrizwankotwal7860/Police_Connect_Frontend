"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockAdminService } from "@/services/mockAdminService"
import { Station } from "@/types"
import { Globe, Building, Users, Activity, Settings, Database } from "lucide-react"

export default function SuperAdminDashboard() {
  const [stations, setStations] = useState<Station[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const st = await mockAdminService.getStations()
      setStations(st)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading system overview...</div>

  // Mock global stats
  const totalComplaints = 1452
  const activeCases = 342
  const resolutionRate = 76.4
  const activeOfficers = 124

  // Mock system logs
  const logs = [
    { id: 1, time: "10:42 AM", event: "SYSTEM_BACKUP", details: "Automated daily backup completed successfully", status: "success" },
    { id: 2, time: "09:15 AM", event: "AUTH_FAILURE", details: "Multiple failed login attempts from IP 192.168.1.42", status: "warning" },
    { id: 3, time: "08:30 AM", event: "NEW_STATION", details: "Station 'Westside Precinct' initialized by admin", status: "info" },
    { id: 4, time: "Yesterday", event: "API_LATENCY", details: "SMS Gateway timeout duration > 2000ms", status: "error" },
    { id: 5, time: "Yesterday", event: "REPORT_GEN", details: "Monthly state crime statistics report generated", status: "info" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Overview (Super Admin)</h1>
          <p className="text-slate-500 text-sm">Global monitoring and management of Police Connect platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white"><Settings className="h-4 w-4 mr-2" /> System Settings</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Complaints</p>
              <h3 className="text-2xl font-bold text-slate-900">{totalComplaints}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Resolution Rate</p>
              <h3 className="text-2xl font-bold text-slate-900">{resolutionRate}%</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Stations</p>
              <h3 className="text-2xl font-bold text-slate-900">{stations.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Personnel</p>
              <h3 className="text-2xl font-bold text-slate-900">{activeOfficers}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Police Stations Network</CardTitle>
            <Button variant="outline" size="sm">Add Station</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {stations.map(st => (
                <div key={st.id} className="p-4 hover:bg-slate-50 flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-slate-900">{st.name}</h4>
                    <p className="text-xs text-slate-500">{st.city}, {st.state} • {st.phone}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-700">Manage</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2"><Database className="h-5 w-5 text-slate-400" /> System Logs</CardTitle>
            <Button variant="link" size="sm" className="text-blue-700">View Full Logs</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100 font-mono text-xs">
              {logs.map(log => (
                <div key={log.id} className="p-3 flex gap-3 hover:bg-slate-50">
                  <div className="text-slate-400 whitespace-nowrap w-20 shrink-0">{log.time}</div>
                  <div>
                    <span className={`font-semibold ${
                      log.status === 'error' ? 'text-red-600' : 
                      log.status === 'warning' ? 'text-amber-600' : 
                      log.status === 'success' ? 'text-emerald-600' : 'text-blue-600'
                    }`}>
                      [{log.event}]
                    </span>
                    <span className="text-slate-600 ml-2">{log.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
