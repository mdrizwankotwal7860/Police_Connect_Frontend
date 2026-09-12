"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAdminService } from "@/services/mockAdminService"
import { mockComplaints } from "@/data/mockComplaints"
import { Complaint, Station } from "@/types"
import { ArrowLeft, Calendar, MapPin, FileText, CheckCircle2, Download, Paperclip } from "lucide-react"

export function generateStaticParams() {
  return mockComplaints.map((c) => ({
    id: c.id,
  }))
}

export default function ComplaintDetails() {
  const params = useParams()
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [station, setStation] = useState<Station | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const id = params.id as string
        const data = await mockComplaintService.getComplaint(id)
        if (data) {
          setComplaint(data)
          const st = await mockAdminService.getStation(data.stationId)
          if (st) setStation(st)
        } else {
          setError("Complaint not found.")
        }
      } catch (err) {
        setError("Error loading complaint details.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params.id])

  if (loading) return <div className="p-8 text-center text-slate-500">Loading details...</div>
  if (error || !complaint) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/complaints">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{complaint.subject}</h1>
            <p className="text-slate-500 text-sm font-mono">{complaint.trackingId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between py-4">
              <CardTitle className="text-lg">Incident Details</CardTitle>
              <div className="flex gap-2">
                <PriorityBadge priority={complaint.priority} />
                <StatusBadge status={complaint.status} />
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2"><Calendar className="h-4 w-4" /> Incident Date</p>
                  <p className="text-slate-900">{new Date(complaint.incidentDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</p>
                  <p className="text-slate-900">{complaint.location}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-slate-500 mb-2 flex items-center gap-2"><FileText className="h-4 w-4" /> Description</p>
                <div className="bg-slate-50 p-4 rounded-md text-slate-700 text-sm whitespace-pre-wrap leading-relaxed border border-slate-100">
                  {complaint.description}
                </div>
              </div>

              {(complaint.peopleInvolved || complaint.witnesses || complaint.suspectInfo) && (
                <div className="pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-6">
                  {complaint.peopleInvolved && (
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">People Involved</p>
                      <p className="text-sm text-slate-900">{complaint.peopleInvolved}</p>
                    </div>
                  )}
                  {complaint.witnesses && (
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Witnesses</p>
                      <p className="text-sm text-slate-900">{complaint.witnesses}</p>
                    </div>
                  )}
                  {complaint.suspectInfo && (
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Suspect Information</p>
                      <p className="text-sm text-slate-900">{complaint.suspectInfo}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2"><Paperclip className="h-5 w-5 text-slate-400" /> Evidence</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {complaint.evidence && complaint.evidence.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {complaint.evidence.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 border rounded-md hover:bg-slate-50">
                      <div className="h-10 w-10 bg-blue-100 text-blue-700 rounded flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 truncate">{file.filename}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  No evidence uploaded for this complaint.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg">Police Station</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {station ? (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{station.name}</h4>
                  <p className="text-sm text-slate-600 mb-4">{station.address}, {station.city}, {station.state} {station.pinCode}</p>
                  <p className="text-sm text-slate-600"><strong>Phone:</strong> {station.phone}</p>
                </div>
              ) : (
                <p className="text-sm text-slate-500">Loading station details...</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg">Status Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 py-2">
                {complaint.timeline.map((entry, index) => {
                  const isLast = index === complaint.timeline.length - 1
                  return (
                    <div key={entry.id} className="relative">
                      <span className={`absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full ring-8 ring-white ${isLast ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        {isLast ? (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-slate-500" />
                        )}
                      </span>
                      <div>
                        <h4 className={`text-sm font-semibold ${isLast ? 'text-blue-700' : 'text-slate-700'}`}>
                          {entry.status}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-2 rounded">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
