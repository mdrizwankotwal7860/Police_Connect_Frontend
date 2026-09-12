import { User } from "../types"
import { mockUsers } from "../data/mockData"

// Fake a delay for realism
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let currentUser: User | null = null

export const mockAuthService = {
  async login(email: string): Promise<User> {
    await delay(800)
    const user = mockUsers.find(u => u.email === email)
    if (!user) throw new Error("Invalid credentials")
    currentUser = user
    return user
  },
  
  async logout(): Promise<void> {
    await delay(300)
    currentUser = null
  },
  
  async getCurrentUser(): Promise<User | null> {
    await delay(200)
    return currentUser
  }
}
