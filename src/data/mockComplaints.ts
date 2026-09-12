import { Complaint } from "../types"

export const mockComplaints: Complaint[] = [
  {
    id: "comp_1",
    trackingId: "TRK-2023-001",
    categoryId: "cat_1", // Theft
    complainantId: "usr_cit_1",
    stationId: "st_1",
    assignedOfficerId: "usr_off_1",
    incidentDate: "2023-08-10T14:30:00Z",
    location: "Downtown Mall, Main St",
    subject: "Stolen Bicycle",
    description: "My bicycle was stolen from the mall parking lot. It was locked but the lock was cut.",
    status: "Investigation",
    priority: "Medium",
    timeline: [
      { id: "tl_1", status: "Submitted", timestamp: "2023-08-11T09:00:00Z", updatedBy: "usr_cit_1" },
      { id: "tl_2", status: "Received", timestamp: "2023-08-11T10:00:00Z", updatedBy: "usr_st_admin_1" },
      { id: "tl_3", status: "Assigned", timestamp: "2023-08-11T11:00:00Z", notes: "Assigned to Officer John Doe", updatedBy: "usr_st_admin_1" },
      { id: "tl_4", status: "Investigation", timestamp: "2023-08-12T09:00:00Z", notes: "Visited mall, requested CCTV footage.", updatedBy: "usr_off_1" }
    ],
    evidence: [],
    createdAt: "2023-08-11T09:00:00Z",
    updatedAt: "2023-08-12T09:00:00Z"
  },
  {
    id: "comp_2",
    trackingId: "TRK-2023-002",
    categoryId: "cat_2", // Cyber
    complainantId: "usr_cit_2",
    stationId: "st_2",
    assignedOfficerId: undefined,
    incidentDate: "2023-08-20T08:00:00Z",
    location: "Online",
    subject: "Phishing Scam",
    description: "Received an email pretending to be my bank. Clicked link and entered details before realizing it was fake.",
    status: "Received",
    priority: "High",
    timeline: [
      { id: "tl_5", status: "Submitted", timestamp: "2023-08-21T09:00:00Z", updatedBy: "usr_cit_2" },
      { id: "tl_6", status: "Received", timestamp: "2023-08-21T10:00:00Z", updatedBy: "usr_st_admin_2" }
    ],
    evidence: [],
    createdAt: "2023-08-21T09:00:00Z",
    updatedAt: "2023-08-21T10:00:00Z"
  },
  {
    id: "comp_3",
    trackingId: "TRK-2023-003",
    categoryId: "cat_7", // Traffic
    complainantId: "usr_cit_1",
    stationId: "st_1",
    assignedOfficerId: "usr_off_2",
    incidentDate: "2023-09-01T18:00:00Z",
    location: "Intersection of 5th and Main",
    subject: "Hit and Run",
    description: "A red sedan hit my parked car and drove away. I have a partial license plate.",
    status: "Resolved",
    priority: "Medium",
    timeline: [
      { id: "tl_7", status: "Submitted", timestamp: "2023-09-02T09:00:00Z", updatedBy: "usr_cit_1" },
      { id: "tl_8", status: "Received", timestamp: "2023-09-02T10:00:00Z", updatedBy: "usr_st_admin_1" },
      { id: "tl_9", status: "Assigned", timestamp: "2023-09-02T11:00:00Z", updatedBy: "usr_st_admin_1" },
      { id: "tl_10", status: "Resolved", timestamp: "2023-09-10T14:00:00Z", notes: "Driver identified and contacted. Insurance details exchanged.", updatedBy: "usr_off_2" }
    ],
    evidence: [],
    createdAt: "2023-09-02T09:00:00Z",
    updatedAt: "2023-09-10T14:00:00Z"
  }
]
