export type Role = "citizen" | "officer" | "station_admin" | "super_admin"

export interface User {
  id: string
  name: string
  email: string
  mobile: string
  role: Role
  avatar?: string
  stationId?: string // for officers and station admins
  createdAt: string
}

export type ComplaintStatus =
  | "Submitted"
  | "Received"
  | "Verification"
  | "Assigned"
  | "Investigation"
  | "Info Required"
  | "Resolved"
  | "Rejected"
  | "Closed"

export type ComplaintPriority = "Low" | "Medium" | "High" | "Critical"

export interface ComplaintCategory {
  id: string
  name: string
  description: string
  active: boolean
}

export interface ComplaintTimelineEntry {
  id: string
  status: ComplaintStatus
  timestamp: string
  notes?: string
  updatedBy: string // user id
}

export interface Evidence {
  id: string
  filename: string
  url: string
  type: string
  size: number
  uploadedAt: string
}

export interface Complaint {
  id: string
  trackingId: string
  categoryId: string
  complainantId: string
  stationId: string
  assignedOfficerId?: string
  incidentDate: string
  location: string
  subject: string
  description: string
  peopleInvolved?: string
  witnesses?: string
  suspectInfo?: string
  lossDamage?: string
  status: ComplaintStatus
  priority: ComplaintPriority
  timeline: ComplaintTimelineEntry[]
  evidence: Evidence[]
  createdAt: string
  updatedAt: string
}

export interface Station {
  id: string
  code: string
  name: string
  address: string
  city: string
  state: string
  pinCode: string
  phone: string
  headOfficerId: string
  status: "Active" | "Inactive"
}

export interface AuditLog {
  id: string
  actorId: string
  actorName: string
  action: string
  entity: string
  entityId: string
  timestamp: string
}
