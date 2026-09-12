"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Search, MoreVertical } from "lucide-react"

export default function ManageOfficers() {
  const [search, setSearch] = useState("")

  // Mock officers list
  const officers = [
    { id: "usr_off_1", email: "officer1@policeconnect.gov", name: "Officer John Doe", badge: "BADGE-001", status: "Active", assignedCases: 5 },
    { id: "usr_off_2", email: "officer2@policeconnect.gov", name: "Officer Jane Smith", badge: "BADGE-002", status: "Active", assignedCases: 3 },
    { id: "usr_off_3", email: "officer3@policeconnect.gov", name: "Officer Michael Brown", badge: "BADGE-003", status: "On Leave", assignedCases: 0 },
  ]

  const filtered = officers.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) || o.badge.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manage Officers</h1>
          <p className="text-slate-500 text-sm">View and manage officers assigned to your station.</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800"><UserPlus className="h-4 w-4 mr-2" /> Add Officer</Button>
      </div>

      <Card className="border-slate-200">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or badge..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden hidden md:block">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium text-slate-600">Officer Name</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Badge #</th>
                  <th className="px-4 py-3 font-medium text-slate-600">Email</th>
                  <th className="px-4 py-3 font-medium text-slate-600 text-center">Assigned Cases</th>
                  <th className="px-4 py-3 font-medium text-slate-600 text-center">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filtered.map(officer => (
                  <tr key={officer.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900 flex items-center gap-2">
                      <div className="h-8 w-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
                        {officer.name.charAt(8)}
                      </div>
                      {officer.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{officer.badge}</td>
                    <td className="px-4 py-3 text-slate-500">{officer.email}</td>
                    <td className="px-4 py-3 text-center">{officer.assignedCases}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        officer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {officer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><MoreVertical className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="grid gap-4 md:hidden">
            {filtered.map(officer => (
              <div key={officer.id} className="border rounded-md p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-slate-900">{officer.name}</div>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        officer.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                      }`}>
                    {officer.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono">{officer.badge} • {officer.email}</div>
                <div className="text-sm">Active Cases: {officer.assignedCases}</div>
                <Button variant="outline" size="sm" className="mt-2">Manage Officer</Button>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
