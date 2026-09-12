"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StatusBadge } from "@/components/ui/status-badge"
import { PriorityBadge } from "@/components/ui/priority-badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAuthService } from "@/services/mockAuthService"
import { mockComplaints } from "@/data/mockComplaints"
import { Complaint, ComplaintStatus, User } from "@/types"
import { toast } from "sonner"
import { ArrowLeft, Calendar, MapPin, FileText, CheckCircle2, Paperclip, MessageSquare, AlertCircle } from "lucide-react"

export function generateStaticParams() {
  return mockComplaints.map((c) => ({
    id: c.id,
  }))
}

export default function OfficerWorkspace() {
  const params = useParams()
  const router = useRouter()
  const [complaint, setComplaint] = useState<Complaint | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Status update state
  const [updateStatus, setUpdateStatus] = useState<ComplaintStatus | "">("")
  const [updateNotes, setUpdateNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  // Investigation notes state
  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const u = await mockAuthService.getCurrentUser()
        setUser(u)
        
        const id = params.id as string
        const data = await mockComplaintService.getComplaint(id)
        if (data) {
          setComplaint(data)
          setUpdateStatus(data.status)
        } else {
          setError("Complaint not found.")
        }
      } catch (err) {
        setError("Error loading workspace.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params.id])

  const handleStatusUpdate = async () => {
    if (!complaint || !user) return
    setIsUpdating(true)
    try {
      const updated = await mockComplaintService.updateStatus(complaint.id, updateStatus as ComplaintStatus, user.id, updateNotes)
      setComplaint(updated)
      setIsUpdateModalOpen(false)
      setUpdateNotes("")
      toast.success(`Status updated to ${updateStatus}`)
    } catch (err) {
      toast.error("Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleAddNote = async () => {
    if (!complaint || !user || !newNote.trim()) return
    // Since we don't have a separate notes array in mock, we'll just add it as a timeline entry without changing status
    setIsUpdating(true)
    try {
      const updated = await mockComplaintService.updateStatus(complaint.id, complaint.status, user.id, `INVESTIGATION NOTE: ${newNote}`)
      setComplaint(updated)
      setNewNote("")
      toast.success("Note added successfully")
    } catch (err) {
      toast.error("Failed to add note")
    } finally {
      setIsUpdating(false)
    }
  }

  if (loading) return <div className="p-8 text-center text-slate-500">Loading workspace...</div>
  if (error || !complaint) return <div className="p-8 text-center text-red-500">{error}</div>

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/police/complaints">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Workspace: {complaint.trackingId}</h1>
            <p className="text-slate-500 text-sm font-medium">{complaint.subject}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <PriorityBadge priority={complaint.priority} />
          <StatusBadge status={complaint.status} />
          
          <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
            <DialogTrigger asChild>
              <Button className="ml-2 bg-blue-900 hover:bg-blue-800">Update Status</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Case Status</DialogTitle>
                <DialogDescription>
                  Change the status and add official remarks. This will be visible to the citizen.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="status">New Status</Label>
                  <Select value={updateStatus} onValueChange={(v) => setUpdateStatus(v as ComplaintStatus)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Received">Received</SelectItem>
                      <SelectItem value="Verification">Verification</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="Investigation">Investigation</SelectItem>
                      <SelectItem value="Info Required">Info Required</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remarks">Official Remarks</Label>
                  <Textarea 
                    id="remarks" 
                    placeholder="E.g., Investigation completed. Suspect apprehended."
                    value={updateNotes}
                    onChange={(e) => setUpdateNotes(e.target.value)}
                  />
                </div>
                {updateStatus === "Resolved" && (
                  <div className="bg-emerald-50 text-emerald-700 p-3 rounded-md text-sm flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>Resolving a case indicates the primary investigation is concluded successfully.</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateModalOpen(false)}>Cancel</Button>
                <Button onClick={handleStatusUpdate} disabled={isUpdating} className="bg-blue-900 hover:bg-blue-800">
                  {isUpdating ? "Saving..." : "Confirm Update"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg">Incident Report Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2"><Calendar className="h-4 w-4" /> Incident Date</p>
                  <p className="text-slate-900 font-medium">{new Date(complaint.incidentDate).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</p>
                  <p className="text-slate-900 font-medium">{complaint.location}</p>
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
                      <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded">{complaint.peopleInvolved}</p>
                    </div>
                  )}
                  {complaint.witnesses && (
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Witnesses</p>
                      <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded">{complaint.witnesses}</p>
                    </div>
                  )}
                  {complaint.suspectInfo && (
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-slate-500 mb-1">Suspect Information</p>
                      <p className="text-sm text-slate-900 bg-red-50/50 border border-red-100 p-3 rounded">{complaint.suspectInfo}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2"><Paperclip className="h-5 w-5 text-slate-400" /> Evidence</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {complaint.evidence && complaint.evidence.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {complaint.evidence.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 border rounded-md bg-white hover:border-blue-300 transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded flex items-center justify-center shrink-0 group-hover:bg-blue-100 group-hover:text-blue-700">
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
                <div className="text-center py-8 text-slate-500 text-sm border-2 border-dashed rounded-md bg-slate-50">
                  No evidence uploaded by citizen.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg flex items-center gap-2"><MessageSquare className="h-5 w-5 text-slate-400" /> Internal Notes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {complaint.timeline.filter(t => t.notes?.startsWith("INVESTIGATION NOTE:")).map(note => (
                  <div key={note.id} className="bg-amber-50 border border-amber-100 p-3 rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold text-amber-800">Officer Note</span>
                      <span className="text-[10px] text-amber-600/70">{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-amber-900">{note.notes?.replace("INVESTIGATION NOTE: ", "")}</p>
                  </div>
                ))}
                {complaint.timeline.filter(t => t.notes?.startsWith("INVESTIGATION NOTE:")).length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">No internal notes yet.</p>
                )}
              </div>
              <div className="space-y-2">
                <Textarea 
                  placeholder="Add a private investigation note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <Button className="w-full bg-slate-800 hover:bg-slate-700" onClick={handleAddNote} disabled={!newNote.trim() || isUpdating}>
                  {isUpdating ? "Saving..." : "Save Note"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 py-4">
              <CardTitle className="text-lg">Public Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative pl-6 border-l-2 border-slate-100 space-y-6 py-2">
                {complaint.timeline.filter(t => !t.notes?.startsWith("INVESTIGATION NOTE:")).map((entry, index, arr) => {
                  const isLast = index === arr.length - 1
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
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(entry.timestamp).toLocaleString()}
                        </p>
                        {entry.notes && (
                          <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 p-2 rounded">
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
