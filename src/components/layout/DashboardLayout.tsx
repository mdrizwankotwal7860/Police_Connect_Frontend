"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { mockAuthService } from "@/services/mockAuthService"
import { User } from "@/types"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Users, Globe } from "lucide-react"

// Statically import images so Next.js automatically applies the GitHub Pages basePath
import gunLogo from "../../../public/images/gun-logo.png"
import capLogo from "../../../public/images/cap-logo.png"
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (!currentUser) {
        router.push("/login")
      } else {
        setUser(currentUser)
      }
    }
    loadUser()
  }, [router])

  const handleLogout = async () => {
    await mockAuthService.logout()
    router.push("/")
  }

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading workspace...</div>

  let navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Complaints", href: "/dashboard/complaints", icon: FileText },
    { name: "Settings", href: "#", icon: Settings },
  ]

  if (user.role === "officer") {
    navItems = [
      { name: "Officer Workspace", href: "/police", icon: LayoutDashboard },
      { name: "Station Queue", href: "/police/complaints", icon: FileText },
    ]
  } else if (user.role === "station_admin") {
    navItems = [
      { name: "Station Admin", href: "/admin", icon: LayoutDashboard },
      { name: "Manage Officers", href: "/admin/officers", icon: Users },
    ]
  } else if (user.role === "super_admin") {
    navItems = [
      { name: "System Overview", href: "/admin/super", icon: Globe },
    ]
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
          
          {/* FULL LEFT: Menu Toggle, Gun & Indian Police */}
          <div className="flex-1 flex items-center justify-start gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden shrink-0 h-10 w-10 hover:bg-slate-100 rounded-md text-slate-900" onClick={() => setSidebarOpen(true)} aria-label="Open navigation menu">
              <Menu className="h-8 w-8" />
            </Button>
            
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden shadow-sm scale-x-[-1] shrink-0 border border-slate-200 bg-white">
              <Image src={gunLogo} alt="Gun Left" fill className="object-cover" />
            </div>

            <Link href="/" className="flex items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 tracking-wider uppercase drop-shadow-sm leading-tight">
                Indian Police
              </h2>
            </Link>
          </div>

          {/* MIDDLE: Big Police Cap (Hidden on Mobile) */}
          <div className="hidden lg:flex justify-center shrink-0 z-10 -mt-2">
            <div className="relative h-20 w-20 lg:h-24 lg:w-24 rounded-full overflow-hidden shadow-md bg-white border-2 border-slate-100 flex items-center justify-center">
              <Image src={capLogo} alt="Police Cap" fill className="object-cover p-1" />
            </div>
          </div>

          {/* FULL RIGHT: User Info & Gun */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
            <div className="flex flex-col items-end mr-2">
              <span className="text-sm font-semibold text-slate-900">{user.name}</span>
              <span className="text-xs text-slate-500 capitalize">{user.role.replace('_', ' ')}</span>
            </div>
            
            {/* Right Gun (Hidden on Mobile) */}
            <div className="hidden lg:block relative h-14 w-14 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white">
              <Image src={gunLogo} alt="Gun Right" fill className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col border-r border-slate-800 shadow-xl`}>
          <div className="h-24 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800 lg:hidden">
            <span className="font-bold text-white tracking-wider">MENU</span>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white rounded-full h-10 w-10">
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            <div className="mb-6 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Navigation</div>
            {navItems.map((item) => {
              const activeHref = navItems.filter(i => pathname === i.href || pathname.startsWith(`${i.href}/`)).sort((a, b) => b.href.length - a.href.length)[0]?.href;
              const isActive = item.href === activeHref;
              return (
                <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                  <span className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                      : "hover:bg-slate-800 hover:text-white"
                  }`}>
                    <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>
          
          <div className="p-4 bg-slate-950 border-t border-slate-800">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex-1 p-4 md:p-8">
            <div className="mx-auto max-w-6xl w-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
