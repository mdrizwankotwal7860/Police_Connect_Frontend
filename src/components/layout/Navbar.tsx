"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

// Statically import images so Next.js automatically applies the GitHub Pages basePath
import gunLogo from "../../../public/images/gun-logo.png"
import capLogo from "../../../public/images/cap-logo.png"

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-[88px] sm:h-[100px] lg:h-[120px] items-center justify-between px-3 lg:px-8">
          
          {/* LEFT SECTION */}
          <div className="flex flex-1 items-center justify-start">
            {/* Mobile Hamburger */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden shrink-0 bg-[#f4f7fb] hover:bg-[#e6edf5] text-[#001f5c] rounded-xl h-12 w-12 border border-slate-100 shadow-sm"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-8 w-8" strokeWidth={2.5} />
            </Button>
          </div>

          {/* MIDDLE SECTION - Main Branding */}
          <div className="flex shrink-0 items-center justify-center z-10">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-8">
              
              {/* Left Gun */}
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full shadow-[0_2px_12px_-3px_rgba(0,0,0,0.1)] shrink-0 border border-slate-100 bg-white flex items-center justify-center p-2 lg:p-3">
                <div className="relative w-full h-full scale-x-[-1]">
                  <Image src={gunLogo} alt="Gun Left" fill className="object-contain" sizes="64px" />
                </div>
              </div>

              {/* Center Text, Cap, and Flags */}
              <Link href="/" className="flex flex-col items-center justify-center group">
                {/* Top Row: Flag - Cap - Flag */}
                <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 z-10 -mb-1.5 sm:-mb-2 lg:-mb-4">
                   <div className="flex flex-col gap-[2px] lg:gap-[3px] w-4 sm:w-6 lg:w-8 mt-2 lg:mt-4">
                     <div className="h-[3px] sm:h-1 lg:h-1.5 bg-[#ff9933] rounded-full w-full"></div>
                     <div className="h-[3px] sm:h-1 lg:h-1.5 bg-[#138808] rounded-full w-full"></div>
                   </div>
                   
                   <div className="relative h-12 w-12 sm:h-14 sm:w-14 lg:h-20 lg:w-20 transition-transform group-hover:scale-105 duration-300">
                     <Image src={capLogo} alt="Police Cap" fill className="object-contain drop-shadow-md" sizes="80px" />
                   </div>
                   
                   <div className="flex flex-col gap-[2px] lg:gap-[3px] w-4 sm:w-6 lg:w-8 mt-2 lg:mt-4">
                     <div className="h-[3px] sm:h-1 lg:h-1.5 bg-[#ff9933] rounded-full w-full"></div>
                     <div className="h-[3px] sm:h-1 lg:h-1.5 bg-[#138808] rounded-full w-full"></div>
                   </div>
                </div>
                
                {/* Bottom Row: Text */}
                <div className="flex items-center gap-1.5 lg:gap-2 z-20">
                   <span className="text-[17px] sm:text-2xl lg:text-4xl font-black text-[#003399] tracking-wider lg:tracking-widest uppercase drop-shadow-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                     INDIAN
                   </span>
                   <span className="text-[17px] sm:text-2xl lg:text-4xl font-black text-[#e67e22] tracking-wider lg:tracking-widest uppercase drop-shadow-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                     POLICE
                   </span>
                </div>
              </Link>

              {/* Right Gun */}
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 rounded-full shadow-[0_2px_12px_-3px_rgba(0,0,0,0.1)] shrink-0 border border-slate-100 bg-white flex items-center justify-center p-2 lg:p-3">
                <div className="relative w-full h-full">
                  <Image src={gunLogo} alt="Gun Right" fill className="object-contain" sizes="64px" />
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-1 items-center justify-end">
            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-bold text-slate-600 mr-6">
              <Link href="/" className={`hover:text-[#003399] transition-colors ${pathname === '/' ? 'text-[#003399]' : ''}`}>Home</Link>
              <Link href="/complaint" className={`hover:text-[#003399] transition-colors ${pathname === '/complaint' ? 'text-[#003399]' : ''}`}>File Complaint</Link>
              <Link href="/track" className={`hover:text-[#003399] transition-colors ${pathname === '/track' ? 'text-[#003399]' : ''}`}>Track Status</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden lg:block">
                <Button variant="ghost" className="text-[#003399] hover:bg-blue-50 font-bold h-11 px-4 rounded-xl">Sign In</Button>
              </Link>
              <Link href="/register" className="hidden lg:block">
                <Button className="bg-gradient-to-r from-[#003399] to-[#002266] hover:from-[#002266] hover:to-[#001144] text-white shadow-md border-0 h-11 px-6 rounded-xl font-bold">Register</Button>
              </Link>
              
              {/* Invisible spacer on mobile to counterbalance the hamburger menu width for perfect centering */}
              <div className="w-12 lg:hidden"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Left Slide-In) */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 z-[60] lg:hidden backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />
      
      <aside 
        className={`fixed inset-y-0 left-0 z-[70] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col border-r border-slate-200 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 bg-slate-50/50">
          <span className="font-bold text-[#003399] tracking-wider text-sm">MENU</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:bg-slate-200 rounded-full h-10 w-10 -mr-2">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto bg-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${pathname === '/' ? 'bg-[#f4f7fb] text-[#003399] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Home</span>
          </Link>
          <Link href="/complaint" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${pathname === '/complaint' ? 'bg-[#f4f7fb] text-[#003399] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>File Complaint</span>
          </Link>
          <Link href="/track" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${pathname === '/track' ? 'bg-[#f4f7fb] text-[#003399] shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Track Status</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button variant="outline" className="w-full text-[#003399] border-blue-200 bg-white hover:bg-[#f4f7fb] h-12 text-sm font-bold shadow-sm rounded-xl">Sign In</Button>
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button className="w-full bg-gradient-to-r from-[#003399] to-[#002266] hover:from-[#002266] hover:to-[#001144] text-white h-12 text-sm font-bold shadow-md border-0 rounded-xl">Register</Button>
          </Link>
        </div>
      </aside>
    </>
  )
}
