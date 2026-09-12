import { User } from "../types"

export const mockUsers: User[] = [
  // Super Admin
  {
    id: "usr_admin_1",
    name: "System Admin",
    email: "admin@policeconnect.gov",
    mobile: "555-000-0001",
    role: "super_admin",
    createdAt: "2023-01-01T00:00:00Z"
  },
  // Station Admins
  {
    id: "usr_st_admin_1",
    name: "Chief Robert Ford",
    email: "rford@policeconnect.gov",
    mobile: "555-000-0101",
    role: "station_admin",
    stationId: "st_1",
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "usr_st_admin_2",
    name: "Chief Sarah Connor",
    email: "sconnor@policeconnect.gov",
    mobile: "555-000-0102",
    role: "station_admin",
    stationId: "st_2",
    createdAt: "2023-01-15T00:00:00Z"
  },
  // Officers
  {
    id: "usr_off_1",
    name: "Officer John Doe",
    email: "jdoe@policeconnect.gov",
    mobile: "555-000-0201",
    role: "officer",
    stationId: "st_1",
    createdAt: "2023-02-01T00:00:00Z"
  },
  {
    id: "usr_off_2",
    name: "Officer Jane Smith",
    email: "jsmith@policeconnect.gov",
    mobile: "555-000-0202",
    role: "officer",
    stationId: "st_1",
    createdAt: "2023-02-01T00:00:00Z"
  },
  {
    id: "usr_off_3",
    name: "Officer Mike Johnson",
    email: "mjohnson@policeconnect.gov",
    mobile: "555-000-0203",
    role: "officer",
    stationId: "st_2",
    createdAt: "2023-02-01T00:00:00Z"
  },
  // Citizens
  {
    id: "usr_cit_1",
    name: "Alice Williams",
    email: "alice@example.com",
    mobile: "555-111-0001",
    role: "citizen",
    createdAt: "2023-05-10T00:00:00Z"
  },
  {
    id: "usr_cit_2",
    name: "Bob Brown",
    email: "bob@example.com",
    mobile: "555-111-0002",
    role: "citizen",
    createdAt: "2023-06-15T00:00:00Z"
  }
]
