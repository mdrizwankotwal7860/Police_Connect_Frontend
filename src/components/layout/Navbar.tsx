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
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
        
        {/* FULL LEFT: Gun & Indian Police */}
        <div className="flex-1 flex items-center justify-start gap-2 sm:gap-4">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden shadow-sm scale-x-[-1] shrink-0 border border-slate-200 bg-white">
            <Image src={gunLogo} alt="Gun Left" fill className="object-cover" />
          </div>
          <Link href="/" className="flex items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 tracking-wider uppercase drop-shadow-sm leading-tight">
              Indian Police
            </h2>
          </Link>
        </div>

        {/* MIDDLE: Big Police Cap */}
        <div className="flex justify-center shrink-0 z-10 -mt-2">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full overflow-hidden shadow-md bg-white border-2 border-slate-100 flex items-center justify-center">
            <Image src={capLogo} alt="Police Cap" fill className="object-cover p-1" />
          </div>
        </div>

        {/* FULL RIGHT: Navigation & Gun */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className={`hover:text-blue-700 transition-colors ${pathname === '/' ? 'text-blue-700 font-semibold' : ''}`}>Home</Link>
            <Link href="/complaint" className={`hover:text-blue-700 transition-colors ${pathname === '/complaint' ? 'text-blue-700 font-semibold' : ''}`}>File Complaint</Link>
            <Link href="/track" className={`hover:text-blue-700 transition-colors ${pathname === '/track' ? 'text-blue-700 font-semibold' : ''}`}>Track Status</Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-4">
            <Link href="/login" className="hidden lg:block">
              <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-700 hover:bg-blue-50 font-semibold">Sign In</Button>
            </Link>
            <Link href="/register" className="hidden lg:block">
              <Button size="sm" className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white shadow-md border-0">Register</Button>
            </Link>
            
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white">
              <Image src={gunLogo} alt="Gun Right" fill className="object-cover" />
            </div>

            {/* Hamburger Button for Mobile - Now on the far right */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden shrink-0 text-slate-900 hover:bg-slate-100 ml-1 h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </Button>
          </div>
        </div>

      </div>

      {/* Mobile Menu Dropdown - Full Screen Dark Mode */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-24 bottom-0 w-full bg-slate-900 shadow-xl flex flex-col px-6 py-8 space-y-6 z-40 overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold tracking-wide ${pathname === '/' ? 'text-blue-400' : 'text-slate-100 hover:text-blue-300'}`}>Home</Link>
          <Link href="/complaint" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold tracking-wide ${pathname === '/complaint' ? 'text-blue-400' : 'text-slate-100 hover:text-blue-300'}`}>File Complaint</Link>
          <Link href="/track" onClick={() => setIsMobileMenuOpen(false)} className={`text-xl font-bold tracking-wide ${pathname === '/track' ? 'text-blue-400' : 'text-slate-100 hover:text-blue-300'}`}>Track Status</Link>
          
          <div className="flex flex-col gap-4 pt-8 border-t border-slate-800 mt-4">
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="lg" className="w-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 text-lg h-14">Sign In</Button>
            </Link>
            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-lg h-14">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
