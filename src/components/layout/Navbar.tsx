"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

// Statically import images so Next.js automatically applies the GitHub Pages basePath
import gunLogo from "../../../public/images/gun-logo.png"
import capLogo from "../../../public/images/cap-logo.png"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-20 lg:h-24 items-center justify-between px-2 lg:px-8">
        
        {/* FULL LEFT: Hamburger, Gun & Indian Police */}
        <div className="flex-1 flex items-center justify-start gap-1 lg:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden shrink-0 text-slate-900 hover:bg-slate-100 h-9 w-9"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <div className="relative h-7 w-7 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-full overflow-hidden shadow-sm scale-x-[-1] shrink-0 border border-slate-200 bg-white">
            <Image src={gunLogo} alt="Gun Left" fill className="object-cover" />
          </div>
          
          <Link href="/" className="flex items-center">
            <h2 className="text-xs sm:text-base lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 tracking-wider uppercase drop-shadow-sm leading-tight ml-1 whitespace-nowrap">
              Indian Police
            </h2>
          </Link>
        </div>

        {/* MIDDLE: Big Police Cap */}
        <div className="flex justify-center shrink-0 z-10 -mt-1 lg:-mt-2">
          <div className="relative h-9 w-9 sm:h-14 sm:w-14 lg:h-24 lg:w-24 rounded-full overflow-hidden shadow-md bg-white border lg:border-2 border-slate-100 flex items-center justify-center">
            <Image src={capLogo} alt="Police Cap" fill className="object-cover p-0.5 lg:p-1" />
          </div>
        </div>

        {/* FULL RIGHT: Navigation & Gun */}
        <div className="flex-1 flex items-center justify-end gap-2 lg:gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className={`hover:text-blue-700 transition-colors ${pathname === '/' ? 'text-blue-700 font-semibold' : ''}`}>Home</Link>
            <Link href="/complaint" className={`hover:text-blue-700 transition-colors ${pathname === '/complaint' ? 'text-blue-700 font-semibold' : ''}`}>File Complaint</Link>
            <Link href="/track" className={`hover:text-blue-700 transition-colors ${pathname === '/track' ? 'text-blue-700 font-semibold' : ''}`}>Track Status</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link href="/login" className="hidden lg:block">
              <Button variant="ghost" className="text-blue-900 hover:text-blue-700 hover:bg-blue-50 font-semibold h-11 px-4">Sign In</Button>
            </Link>
            <Link href="/register" className="hidden lg:block">
              <Button className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white shadow-md border-0 h-11 px-4">Register</Button>
            </Link>
            
            {/* Right Gun */}
            <div className="relative h-7 w-7 sm:h-10 sm:w-10 lg:h-14 lg:w-14 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white lg:ml-1">
              <Image src={gunLogo} alt="Gun Right" fill className="object-cover" />
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Menu Drawer (Left Slide-In) */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col border-r border-slate-200 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-24 flex items-center justify-between px-6 border-b border-slate-100">
          <span className="font-bold text-slate-900 tracking-wider">MENU</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:bg-slate-100 rounded-full h-10 w-10">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${pathname === '/' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Home</span>
          </Link>
          <Link href="/complaint" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${pathname === '/complaint' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>File Complaint</span>
          </Link>
          <Link href="/track" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${pathname === '/track' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Track Status</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button variant="outline" className="w-full text-blue-900 border-blue-200 bg-white h-12 text-base">Sign In</Button>
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white h-12 text-base shadow-md">Register</Button>
          </Link>
        </div>
      </aside>
    </header>
  )
}
