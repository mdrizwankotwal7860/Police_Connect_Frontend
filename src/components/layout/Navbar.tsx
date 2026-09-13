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
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-16 sm:h-20 lg:h-24 items-center justify-between px-3 lg:px-8">
          
          {/* LEFT SECTION */}
          <div className="flex flex-1 items-center justify-start">
            {/* Mobile Hamburger */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden shrink-0 text-slate-900 hover:bg-slate-100 h-10 w-10 -ml-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Desktop Branding (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-full overflow-hidden shadow-sm scale-x-[-1] shrink-0 border border-slate-200 bg-white">
                <Image src={gunLogo} alt="Gun Left" fill className="object-cover" sizes="56px" />
              </div>
              <Link href="/" className="flex items-center">
                <h2 className="text-2xl xl:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 tracking-wider uppercase drop-shadow-sm leading-tight whitespace-nowrap">
                  Indian Police
                </h2>
              </Link>
            </div>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex shrink-0 items-center justify-center z-10">
            {/* Mobile Branding (Hidden on Desktop) */}
            <div className="flex lg:hidden items-center justify-center gap-2">
              <div className="relative h-7 w-7 rounded-full overflow-hidden shadow-sm scale-x-[-1] shrink-0 border border-slate-200 bg-white">
                <Image src={gunLogo} alt="Gun Left" fill className="object-cover" sizes="28px" />
              </div>
              
              <Link href="/" className="flex items-center gap-1.5">
                <div className="relative h-9 w-9 rounded-full overflow-hidden shadow-md bg-white border border-slate-100 flex items-center justify-center">
                  <Image src={capLogo} alt="Police Cap" fill className="object-cover p-0.5" sizes="36px" />
                </div>
                <h2 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 tracking-wider uppercase drop-shadow-sm leading-tight whitespace-nowrap">
                  Indian Police
                </h2>
              </Link>
              
              <div className="relative h-7 w-7 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white">
                <Image src={gunLogo} alt="Gun Right" fill className="object-cover" sizes="28px" />
              </div>
            </div>

            {/* Desktop Cap Logo (Hidden on Mobile) */}
            <div className="hidden lg:flex relative h-20 w-20 xl:h-24 xl:w-24 rounded-full overflow-hidden shadow-md bg-white border-2 border-slate-100 items-center justify-center -mt-2">
              <Image src={capLogo} alt="Police Cap" fill className="object-cover p-1" sizes="96px" />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-1 items-center justify-end">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate-600 mr-4 xl:mr-6">
              <Link href="/" className={`hover:text-blue-700 transition-colors ${pathname === '/' ? 'text-blue-700 font-semibold' : ''}`}>Home</Link>
              <Link href="/complaint" className={`hover:text-blue-700 transition-colors ${pathname === '/complaint' ? 'text-blue-700 font-semibold' : ''}`}>File Complaint</Link>
              <Link href="/track" className={`hover:text-blue-700 transition-colors ${pathname === '/track' ? 'text-blue-700 font-semibold' : ''}`}>Track Status</Link>
            </nav>

            <div className="flex items-center gap-2 xl:gap-4">
              <Link href="/login" className="hidden lg:block">
                <Button variant="ghost" className="text-blue-900 hover:text-blue-700 hover:bg-blue-50 font-semibold h-11 px-3 xl:px-4">Sign In</Button>
              </Link>
              <Link href="/register" className="hidden lg:block">
                <Button className="bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white shadow-md border-0 h-11 px-3 xl:px-4">Register</Button>
              </Link>
              
              {/* Right Gun - Desktop only */}
              <div className="hidden lg:block relative h-14 w-14 rounded-full overflow-hidden shadow-sm shrink-0 border border-slate-200 bg-white ml-1 xl:ml-2">
                <Image src={gunLogo} alt="Gun Right" fill className="object-cover" sizes="56px" />
              </div>
              
              {/* Invisible spacer on mobile to counterbalance the hamburger menu width for perfect centering */}
              <div className="w-8 lg:hidden"></div>
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
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 bg-slate-50/50">
          <span className="font-bold text-slate-900 tracking-wider text-sm">MENU</span>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-500 hover:bg-slate-200 rounded-full h-9 w-9 -mr-2">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto bg-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${pathname === '/' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Home</span>
          </Link>
          <Link href="/complaint" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${pathname === '/complaint' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>File Complaint</span>
          </Link>
          <Link href="/track" onClick={() => setIsMobileMenuOpen(false)}>
            <span className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-colors ${pathname === '/track' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>Track Status</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50">
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button variant="outline" className="w-full text-blue-900 border-blue-200 bg-white hover:bg-blue-50 h-12 text-sm font-semibold shadow-sm rounded-xl">Sign In</Button>
          </Link>
          <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 text-white h-12 text-sm font-semibold shadow-md border-0 rounded-xl">Register</Button>
          </Link>
        </div>
      </aside>
    </>
  )
}
