import { User, Complaint, Station, ComplaintCategory, ComplaintStatus, ComplaintPriority, AuditLog } from "../types"

// Categories
export const mockCategories: ComplaintCategory[] = [
  { id: "cat_1", name: "Theft", description: "Reporting stolen property, vehicles, or pickpocketing", active: true },
  { id: "cat_2", name: "Cyber Crime", description: "Online fraud, hacking, identity theft", active: true },
  { id: "cat_3", name: "Missing Person", description: "Report someone who is missing", active: true },
  { id: "cat_4", name: "Fraud", description: "Financial fraud, cheating, or scams", active: true },
  { id: "cat_5", name: "Harassment", description: "Physical, mental, or workplace harassment", active: true },
  { id: "cat_6", name: "Property", description: "Property disputes, trespassing, or vandalism", active: true },
  { id: "cat_7", name: "Traffic", description: "Accidents, hit and run, or severe traffic violations", active: true },
  { id: "cat_8", name: "Lost Documents", description: "Lost passport, driving license", active: true },
  { id: "cat_9", name: "Other", description: "Any other issues not listed above", active: true }
]

// Stations
export const mockStations: Station[] = [
  { id: "st_1", code: "CEN-01", name: "Central Police Station", address: "100 Main St", city: "Metropolis", state: "NY", pinCode: "10001", phone: "555-010-1000", headOfficerId: "usr_st_admin_1", status: "Active" },
  { id: "st_2", code: "NOR-02", name: "Northside Precinct", address: "450 North Blvd", city: "Metropolis", state: "NY", pinCode: "10002", phone: "555-010-2000", headOfficerId: "usr_st_admin_2", status: "Active" },
  { id: "st_3", code: "SOU-03", name: "South Metro Station", address: "780 South Ave", city: "Metropolis", state: "NY", pinCode: "10003", phone: "555-010-3000", headOfficerId: "usr_st_admin_3", status: "Active" },
  { id: "st_4", code: "EAS-04", name: "East District HQ", address: "122 East Wing Rd", city: "Metropolis", state: "NY", pinCode: "10004", phone: "555-010-4000", headOfficerId: "usr_st_admin_4", status: "Active" },
  { id: "st_5", code: "WES-05", name: "Westside Precinct", address: "990 West Park Dr", city: "Metropolis", state: "NY", pinCode: "10005", phone: "555-010-5000", headOfficerId: "usr_st_admin_5", status: "Active" }
]

// Users
export const mockUsers: User[] = [
  { id: "usr_admin_1", name: "System Admin", email: "admin@policeconnect.gov", mobile: "555-000-0001", role: "super_admin", createdAt: "2023-01-01T00:00:00Z" }
]

for (let i = 1; i <= 5; i++) {
  mockUsers.push({
    id: `usr_st_admin_${i}`,
    name: `Chief Admin ${i}`,
    email: `admin${i}@policeconnect.gov`,
    mobile: `555-000-010${i}`,
    role: "station_admin",
    stationId: `st_${i}`,
    createdAt: "2023-01-15T00:00:00Z"
  })
}

for (let i = 1; i <= 20; i++) {
  mockUsers.push({
    id: `usr_off_${i}`,
    name: `Officer ${i}`,
    email: `officer${i}@policeconnect.gov`,
    mobile: `555-000-02${i.toString().padStart(2, '0')}`,
    role: "officer",
    stationId: `st_${(i % 5) + 1}`,
    createdAt: "2023-02-01T00:00:00Z"
  })
}

for (let i = 1; i <= 25; i++) {
  mockUsers.push({
    id: `usr_cit_${i}`,
    name: `Citizen ${i}`,
    email: `citizen${i}@example.com`,
    mobile: `555-111-00${i.toString().padStart(2, '0')}`,
    role: "citizen",
    createdAt: "2023-05-10T00:00:00Z"
  })
}

// Complaints
export const mockComplaints: Complaint[] = []
const statuses: ComplaintStatus[] = ["Submitted", "Received", "Verification", "Assigned", "Investigation", "Info Required", "Resolved", "Closed"]
const priorities: ComplaintPriority[] = ["Low", "Medium", "High", "Critical"]

for (let i = 1; i <= 60; i++) {
  const stationId = `st_${(i % 5) + 1}`
  const catId = `cat_${(i % 9) + 1}`
  const citId = `usr_cit_${(i % 20) + 1}`
  const status = statuses[i % statuses.length]
  const priority = priorities[i % priorities.length]
  const assignedOfficerId = ["Assigned", "Investigation", "Resolved", "Closed", "Info Required"].includes(status) 
    ? `usr_off_${(i % 20) + 1}` 
    : undefined

  mockComplaints.push({
    id: `comp_${i}`,
    trackingId: `TRK-2023-${i.toString().padStart(3, '0')}`,
    categoryId: catId,
    complainantId: citId,
    stationId: stationId,
    assignedOfficerId,
    incidentDate: "2023-08-10T14:30:00Z",
    location: `Location ${i}`,
    subject: `Complaint Subject ${i}`,
    description: `This is a detailed description of complaint ${i}. It provides context for the incident.`,
    status,
    priority,
    timeline: [
      { id: `tl_${i}_1`, status: "Submitted", timestamp: "2023-08-11T09:00:00Z", updatedBy: citId }
    ],
    evidence: [],
    createdAt: "2023-08-11T09:00:00Z",
    updatedAt: "2023-08-12T09:00:00Z"
  })
}

export const mockAuditLogs: AuditLog[] = [
  { id: "al_1", actorId: "usr_admin_1", actorName: "System Admin", action: "Created Station", entity: "Station", entityId: "st_1", timestamp: "2023-01-10T10:00:00Z" },
  { id: "al_2", actorId: "usr_cit_1", actorName: "Citizen 1", action: "Submitted Complaint", entity: "Complaint", entityId: "comp_1", timestamp: "2023-08-11T09:00:00Z" }
]
