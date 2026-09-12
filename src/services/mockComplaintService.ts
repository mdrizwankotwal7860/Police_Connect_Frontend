import { Complaint, ComplaintStatus, ComplaintTimelineEntry, ComplaintCategory } from "../types"
import { mockComplaints, mockCategories } from "../data/mockData"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let complaints = [...mockComplaints]

export const mockComplaintService = {
  async getAllComplaints(): Promise<Complaint[]> {
    await delay(500)
    return complaints
  },

  async getComplaintsByUser(userId: string): Promise<Complaint[]> {
    await delay(500)
    return complaints.filter(c => c.complainantId === userId)
  },

  async getComplaintsByStation(stationId: string): Promise<Complaint[]> {
    await delay(500)
    return complaints.filter(c => c.stationId === stationId)
  },
  
  async getComplaintsByOfficer(officerId: string): Promise<Complaint[]> {
    await delay(500)
    return complaints.filter(c => c.assignedOfficerId === officerId)
  },

  async getComplaint(id: string): Promise<Complaint | undefined> {
    await delay(300)
    return complaints.find(c => c.id === id || c.trackingId === id)
  },

  async getCategories(): Promise<ComplaintCategory[]> {
    await delay(200)
    return mockCategories
  },

  async createComplaint(data: Partial<Complaint>, userId: string): Promise<Complaint> {
    await delay(1000)
    const newId = `comp_${complaints.length + 1}`
    const trackingId = `TRK-2023-${(complaints.length + 1).toString().padStart(3, '0')}`
    
    const newComplaint: Complaint = {
      id: newId,
      trackingId,
      categoryId: data.categoryId || "cat_9",
      complainantId: userId,
      stationId: data.stationId || "st_1",
      incidentDate: data.incidentDate || new Date().toISOString(),
      location: data.location || "",
      subject: data.subject || "",
      description: data.description || "",
      peopleInvolved: data.peopleInvolved,
      witnesses: data.witnesses,
      suspectInfo: data.suspectInfo,
      lossDamage: data.lossDamage,
      status: "Submitted",
      priority: "Medium",
      evidence: data.evidence || [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          status: "Submitted",
          timestamp: new Date().toISOString(),
          updatedBy: userId
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    complaints.push(newComplaint)
    return newComplaint
  },

  async updateStatus(id: string, status: ComplaintStatus, userId: string, notes?: string): Promise<Complaint> {
    await delay(600)
    const idx = complaints.findIndex(c => c.id === id)
    if (idx === -1) throw new Error("Complaint not found")
      
    const updated = { ...complaints[idx], status, updatedAt: new Date().toISOString() }
    const newTimelineEntry: ComplaintTimelineEntry = {
      id: `tl_${Date.now()}`,
      status,
      timestamp: new Date().toISOString(),
      updatedBy: userId,
      notes
    }
    updated.timeline = [...updated.timeline, newTimelineEntry]
    complaints[idx] = updated
    return updated
  },

  async assignOfficer(id: string, officerId: string, adminId: string): Promise<Complaint> {
    await delay(500)
    const idx = complaints.findIndex(c => c.id === id)
    if (idx === -1) throw new Error("Complaint not found")
      
    const updated = { ...complaints[idx], assignedOfficerId: officerId, status: "Assigned" as ComplaintStatus, updatedAt: new Date().toISOString() }
    const newTimelineEntry: ComplaintTimelineEntry = {
      id: `tl_${Date.now()}`,
      status: "Assigned",
      timestamp: new Date().toISOString(),
      updatedBy: adminId,
      notes: `Assigned to officer ID: ${officerId}`
    }
    updated.timeline = [...updated.timeline, newTimelineEntry]
    complaints[idx] = updated
    return updated
  }
}
