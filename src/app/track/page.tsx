"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockComplaintService } from "@/services/mockComplaintService"
import { Complaint } from "@/types"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, MapPin, Calendar, FileText, CheckCircle2 } from "lucide-react"

export default function TrackPage() {
  const [trackingId, setTrackingId] = useState("")
  const [loading, setLoading] = useState(false)
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [error, setError] = useState("")

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId.trim()) return
    
    setLoading(true)
    setError("")
    setComplaint(null)
    
    try {
      const result = await mockComplaintService.getComplaint(trackingId.trim())
      if (result) {
        setComplaint(result)
      } else {
        setError("No complaint found with this ID. Please check and try again.")
      }
    } catch (err) {
      setError("An error occurred while tracking your complaint.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Track Your Complaint</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Enter your Complaint Tracking ID below to see real-time updates and current status.
          </p>
        </div>

        <Card className="mb-10 shadow-sm border-slate-200">
          <CardContent className="p-6">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  placeholder="e.g. TRK-2023-001"
                  className="pl-10 h-12 text-lg"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8 bg-blue-900 hover:bg-blue-800" disabled={loading}>
                {loading ? "Searching..." : "Track Status"}
              </Button>
            </form>
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm font-medium">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {complaint && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b bg-slate-50/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{complaint.subject}</CardTitle>
                      <p className="text-sm text-slate-500 font-mono">{complaint.trackingId}</p>
                    </div>
                    <StatusBadge status={complaint.status} />
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-500">Incident Date</p>
                        <p className="font-medium text-slate-900">{new Date(complaint.incidentDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-slate-500">Location</p>
                        <p className="font-medium text-slate-900">{complaint.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2 mt-4">
                      <FileText className="h-4 w-4 text-slate-400" />
                      Description
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-md">
                      {complaint.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-slate-200 shadow-sm sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Status Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l-2 border-slate-100 space-y-8 py-2">
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
        )}
      </main>

      <Footer />
    </div>
  )
}
