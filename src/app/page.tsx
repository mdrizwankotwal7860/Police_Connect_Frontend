import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { mockCategories } from "@/data/mockData"
import { 
  ShieldCheck, 
  FileText, 
  Search, 
  CheckCircle, 
  Lock, 
  Eye, 
  Scale, 
  ChevronRight 
} from "lucide-react"

// Statically import images so Next.js automatically applies the GitHub Pages basePath
import heroImage from "../../public/images/hero.png"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={heroImage}
              alt="Police Station with Cap and Secure Cues" 
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-24 lg:py-32 flex flex-col items-start text-left">
            <Badge className="mb-6 bg-blue-900/50 text-blue-200 border-blue-800 hover:bg-blue-900/50 px-3 py-1 text-sm font-medium">
              Official Public Safety Portal
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
              Secure, Transparent, and Swift Police Services
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              File complaints online, track investigation progress in real-time, and help us maintain community safety through accountability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/complaint" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-blue-700 hover:bg-blue-600 text-white h-14 px-8 text-base">
                  File a Complaint
                </Button>
              </Link>
              <Link href="/track" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-slate-900/80 border-slate-500 text-white hover:bg-slate-800 hover:text-white h-14 px-8 text-base">
                  Track Complaint
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600">A streamlined process designed to get your issues resolved quickly and transparently.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: FileText, title: "1. Register & Submit", desc: "Create an account and submit your detailed complaint online." },
                { icon: CheckCircle, title: "2. Verification", desc: "Our team reviews the submission and assigns it to an officer." },
                { icon: Search, title: "3. Investigation", desc: "Assigned officers conduct a thorough and fair investigation." },
                { icon: ShieldCheck, title: "4. Resolution", desc: "Receive real-time updates until the issue is officially resolved." }
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center mb-6">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex justify-between items-end mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Complaint Categories</h2>
                <p className="text-slate-600">Select the type of complaint you need to file for faster routing.</p>
              </div>
              <Link href="/complaint" className="hidden md:flex items-center text-blue-700 font-medium hover:text-blue-900">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories.slice(0, 6).map((cat) => (
                <Card key={cat.id} className="hover:shadow-md transition-shadow border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{cat.name}</h3>
                    <p className="text-slate-600 text-sm mb-4">{cat.description}</p>
                    <Link href={`/complaint?category=${cat.id}`} className="text-blue-700 text-sm font-medium hover:underline inline-flex items-center">
                      Select <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-slate-900 text-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Built on Trust and Accountability</h2>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  We understand the importance of your security and privacy. Our platform ensures every submission is handled securely and every action is fully auditable.
                </p>
                <ul className="space-y-6">
                  {[
                    { icon: Lock, title: "Secure Submission", desc: "End-to-end encryption for all your personal data and evidence." },
                    { icon: Eye, title: "Transparent Tracking", desc: "Know exactly who is handling your case and its current status." },
                    { icon: Scale, title: "Responsible Handling", desc: "Strict protocols ensuring fair and unbiased investigations." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="mt-1 h-10 w-10 shrink-0 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-slate-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <Card className="bg-slate-800 border-slate-700 text-center py-8">
                    <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
                    <div className="text-sm text-slate-400 font-medium">Availability</div>
                  </Card>
                  <Card className="bg-slate-800 border-slate-700 text-center py-8">
                    <div className="text-4xl font-bold text-emerald-400 mb-2">48h</div>
                    <div className="text-sm text-slate-400 font-medium">Avg Resolution (Demo)</div>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card className="bg-slate-800 border-slate-700 text-center py-8">
                    <div className="text-4xl font-bold text-blue-400 mb-2">5+</div>
                    <div className="text-sm text-slate-400 font-medium">Active Stations (Demo)</div>
                  </Card>
                  <Card className="bg-slate-800 border-slate-700 text-center py-8">
                    <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
                    <div className="text-sm text-slate-400 font-medium">Auditable</div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {[
                { q: "Do I need an account to file a complaint?", a: "Yes, creating an account helps us verify your identity and provides you with a secure dashboard to track your complaint." },
                { q: "How long does it take for a complaint to be assigned?", a: "Most complaints are reviewed and assigned within 24 hours of submission." },
                { q: "Can I remain anonymous?", a: "While we require registration, you can request confidentiality during the investigation process." },
                { q: "How do I upload evidence?", a: "During the complaint submission wizard, Step 4 will guide you to securely upload images, documents, or media related to your incident." }
              ].map((faq, i) => (
                <Card key={i} className="border-slate-200">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">{faq.q}</h4>
                    <p className="text-slate-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}
