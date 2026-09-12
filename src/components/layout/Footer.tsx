"use client"

import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-slate-100" />
            <span className="font-bold text-xl text-slate-100">
              Police Connect
            </span>
          </Link>
          <p className="text-sm max-w-xs mb-6 text-slate-400">
            A modern, transparent, and secure platform for managing police complaints and improving public safety.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-100 mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/complaint" className="hover:text-white transition-colors">File a Complaint</Link></li>
            <li><Link href="/track" className="hover:text-white transition-colors">Track Status</Link></li>
            <li><Link href="/#categories" className="hover:text-white transition-colors">Complaint Types</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-100 mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Safety Tips</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-100 mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2026 Police Connect. All rights reserved.</p>
        <p className="mt-4 md:mt-0 text-red-400 font-medium">In case of emergency, please dial 100</p>
      </div>
    </footer>
  )
}
