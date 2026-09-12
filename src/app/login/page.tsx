"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { mockAuthService } from "@/services/mockAuthService"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await mockAuthService.login(email)
      toast.success("Login successful")
      
      // Redirect based on role
      if (user.role === "citizen") router.push("/dashboard")
      else if (user.role === "officer") router.push("/police")
      else if (user.role === "station_admin") router.push("/admin")
      else if (user.role === "super_admin") router.push("/admin/super")
      
    } catch (error) {
      toast.error("Invalid credentials. Use a mock email from mockData.ts (e.g. citizen1@example.com, officer1@policeconnect.gov, admin1@policeconnect.gov)")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center space-x-2">
        <Shield className="h-6 w-6 text-blue-900" />
        <span className="font-bold text-xl text-blue-900">Police Connect</span>
      </Link>
      
      <Card className="w-full max-w-md border-slate-200">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="citizen1@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm font-medium text-blue-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" value="password123" readOnly className="bg-slate-50" />
              <p className="text-xs text-slate-500">(Mock mode: Any password works)</p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-700 hover:underline">
              Create an account
            </Link>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-xs text-blue-800">
            <strong>Demo Accounts:</strong><br/>
            Citizen: citizen1@example.com<br/>
            Officer: officer1@policeconnect.gov<br/>
            Station Admin: admin1@policeconnect.gov<br/>
            Super Admin: admin@policeconnect.gov
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
