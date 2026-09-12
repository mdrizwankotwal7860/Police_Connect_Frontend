import { Station, User, AuditLog } from "../types"
import { mockStations, mockUsers, mockAuditLogs } from "../data/mockData"

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockAdminService = {
  async getStations(): Promise<Station[]> {
    await delay(300)
    return mockStations
  },
  
  async getStation(id: string): Promise<Station | undefined> {
    await delay(200)
    return mockStations.find(s => s.id === id)
  },

  async getOfficersByStation(stationId: string): Promise<User[]> {
    await delay(300)
    return mockUsers.filter(u => u.role === "officer" && u.stationId === stationId)
  },
  
  async getAllOfficers(): Promise<User[]> {
    await delay(400)
    return mockUsers.filter(u => u.role === "officer")
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    await delay(300)
    return mockAuditLogs
  }
}
