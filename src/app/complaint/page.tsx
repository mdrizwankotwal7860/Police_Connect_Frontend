"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { mockComplaintService } from "@/services/mockComplaintService"
import { mockAdminService } from "@/services/mockAdminService"
import { mockAuthService } from "@/services/mockAuthService"
import { ComplaintCategory, Station, User } from "@/types"
import { toast } from "sonner"
import { CheckCircle2, ChevronRight, ChevronLeft, UploadCloud } from "lucide-react"

export default function ComplaintWizard() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  
  const [categories, setCategories] = useState<ComplaintCategory[]>([])
  const [stations, setStations] = useState<Station[]>([])

  const [formData, setFormData] = useState({
    categoryId: "",
    subject: "",
    incidentDate: "",
    location: "",
    stationId: "",
    
    // Complainant Info
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    
    // Incident Details
    description: "",
    peopleInvolved: "",
    witnesses: "",
    suspectInfo: "",
    lossDamage: "",
    
    // Evidence (mocked as state, not actual files)
    evidenceFiles: [] as { name: string, size: number }[],
    
    agreed: false
  })

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await mockAuthService.getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
        setFormData(prev => ({
          ...prev,
          firstName: currentUser.name.split(" ")[0] || "",
          lastName: currentUser.name.split(" ").slice(1).join(" ") || "",
          email: currentUser.email,
          mobile: currentUser.mobile,
        }))
      }
      
      const cats = await mockComplaintService.getCategories()
      setCategories(cats)
      const st = await mockAdminService.getStations()
      setStations(st)
    }
    loadData()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: f.size
      }))
      setFormData(prev => ({
        ...prev,
        evidenceFiles: [...prev.evidenceFiles, ...newFiles]
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData(prev => {
      const newFiles = [...prev.evidenceFiles]
      newFiles.splice(index, 1)
      return { ...prev, evidenceFiles: newFiles }
    })
  }

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreed) {
      toast.error("You must agree to the declaration to submit.")
      return
    }
    
    setLoading(true)
    try {
      const result = await mockComplaintService.createComplaint({
        categoryId: formData.categoryId,
        stationId: formData.stationId,
        incidentDate: new Date(formData.incidentDate).toISOString(),
        location: formData.location,
        subject: formData.subject,
        description: formData.description,
        peopleInvolved: formData.peopleInvolved,
        witnesses: formData.witnesses,
        suspectInfo: formData.suspectInfo,
        lossDamage: formData.lossDamage,
        evidence: formData.evidenceFiles.map((f, i) => ({
          id: `ev_${Date.now()}_${i}`,
          filename: f.name,
          url: "#",
          type: "application/octet-stream",
          size: f.size,
          uploadedAt: new Date().toISOString()
        }))
      }, user?.id || "usr_cit_guest") // Handle guest loosely for demo
      
      setStep(6) // Success step
    } catch (error) {
      toast.error("Failed to submit complaint")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 w-full py-12">
        {step < 6 && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">File a Complaint</h1>
            <p className="text-slate-600">Please provide detailed information to help us assist you better.</p>
            
            {/* Stepper UI */}
            <div className="flex items-center justify-between mt-8 hidden sm:flex relative">
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
              <div className="absolute left-0 top-1/2 h-0.5 bg-blue-600 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
              {[
                { num: 1, label: "Basic Info" },
                { num: 2, label: "Your Details" },
                { num: 3, label: "Incident" },
                { num: 4, label: "Evidence" },
                { num: 5, label: "Review" }
              ].map((s) => (
                <div key={s.num} className="flex flex-col items-center bg-slate-50 px-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                    step > s.num ? "bg-blue-600 border-blue-600 text-white" :
                    step === s.num ? "bg-white border-blue-600 text-blue-600" :
                    "bg-white border-slate-300 text-slate-400"
                  }`}>
                    {step > s.num ? <CheckCircle2 className="h-4 w-4" /> : s.num}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= s.num ? "text-slate-900" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Mobile Stepper */}
            <div className="mt-6 sm:hidden text-sm font-medium text-blue-700">
              Step {step} of 5
            </div>
          </div>
        )}

        {step === 6 ? (
          <Card className="border-emerald-200 shadow-md">
            <CardContent className="p-12 flex flex-col items-center text-center">
              <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Complaint Submitted Successfully</h2>
              <p className="text-slate-600 mb-8 max-w-lg">
                Your complaint has been securely recorded. An officer will review it shortly. Please save your tracking ID below.
              </p>
              
              <div className="bg-slate-100 p-6 rounded-lg mb-8 w-full max-w-md border border-slate-200">
                <p className="text-sm font-medium text-slate-500 mb-1">Your Tracking ID</p>
                <p className="text-2xl font-mono font-bold text-slate-900">TRK-2023-061</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/track">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800">Track Complaint</Button>
                </Link>
                <Link href={user ? "/dashboard" : "/"}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">Return to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle>
                {step === 1 && "Step 1: Basic Information"}
                {step === 2 && "Step 2: Complainant Details"}
                {step === 3 && "Step 3: Incident Details"}
                {step === 4 && "Step 4: Evidence & Documents"}
                {step === 5 && "Step 5: Review & Submit"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Categorize and locate the incident."}
                {step === 2 && "Confirm your contact information."}
                {step === 3 && "Provide a detailed account of what happened."}
                {step === 4 && "Upload photos, videos, or documents (Optional)."}
                {step === 5 && "Review your information before submitting."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form id="complaint-form" onSubmit={handleSubmit}>
                
                {/* STEP 1 */}
                <div className={step === 1 ? "block space-y-6" : "hidden"}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="categoryId">Complaint Category <span className="text-red-500">*</span></Label>
                      <Select value={formData.categoryId} onValueChange={(v) => handleSelectChange("categoryId", v)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stationId">Police Station <span className="text-red-500">*</span></Label>
                      <Select value={formData.stationId} onValueChange={(v) => handleSelectChange("stationId", v)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select station" />
                        </SelectTrigger>
                        <SelectContent>
                          {stations.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.name} ({s.city})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Brief Subject <span className="text-red-500">*</span></Label>
                    <Input id="subject" name="subject" placeholder="e.g. Stolen Bicycle" value={formData.subject} onChange={handleChange} required />
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="incidentDate">Date & Time of Incident <span className="text-red-500">*</span></Label>
                      <Input id="incidentDate" name="incidentDate" type="datetime-local" value={formData.incidentDate} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Exact Location <span className="text-red-500">*</span></Label>
                      <Input id="location" name="location" placeholder="Address or landmark" value={formData.location} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className={step === 2 ? "block space-y-6" : "hidden"}>
                  {!user && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                      <p className="text-sm text-blue-700 font-medium">You are filing as a guest. <Link href="/login" className="underline">Log in</Link> to auto-fill these details and track your complaint easily.</p>
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                      <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                      <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile Number <span className="text-red-500">*</span></Label>
                      <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className={step === 3 ? "block space-y-6" : "hidden"}>
                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description of Incident <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      rows={6} 
                      placeholder="Please describe exactly what happened in chronological order..."
                      value={formData.description} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="peopleInvolved">Other People Involved</Label>
                      <Textarea id="peopleInvolved" name="peopleInvolved" rows={3} placeholder="Names, descriptions..." value={formData.peopleInvolved} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="witnesses">Witnesses</Label>
                      <Textarea id="witnesses" name="witnesses" rows={3} placeholder="Names and contact details..." value={formData.witnesses} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="suspectInfo">Suspect Information</Label>
                      <Textarea id="suspectInfo" name="suspectInfo" rows={2} placeholder="Appearance, vehicle, etc." value={formData.suspectInfo} onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lossDamage">Loss or Damage Details</Label>
                      <Textarea id="lossDamage" name="lossDamage" rows={2} placeholder="List items, estimated value..." value={formData.lossDamage} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className={step === 4 ? "block space-y-6" : "hidden"}>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center hover:bg-slate-50 transition-colors">
                    <input type="file" id="fileUpload" className="hidden" multiple onChange={handleFileChange} />
                    <Label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                      <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                        <UploadCloud className="h-8 w-8" />
                      </div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-1">Click to upload files</h4>
                      <p className="text-slate-500 text-sm">PNG, JPG, PDF, MP4 up to 10MB</p>
                    </Label>
                  </div>
                  
                  {formData.evidenceFiles.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900">Attached Files</h4>
                      <ul className="space-y-2">
                        {formData.evidenceFiles.map((file, i) => (
                          <li key={i} className="flex items-center justify-between p-3 border rounded-md bg-white">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <span className="text-sm font-medium truncate">{file.name}</span>
                              <span className="text-xs text-slate-500 shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <Button type="button" variant="ghost" size="sm" className="text-red-500 h-8" onClick={() => removeFile(i)}>
                              Remove
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* STEP 5 */}
                <div className={step === 5 ? "block space-y-8" : "hidden"}>
                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 border-b pb-2">Basic Info</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-slate-500">Category:</span> {categories.find(c => c.id === formData.categoryId)?.name}</div>
                        <div><span className="text-slate-500">Station:</span> {stations.find(s => s.id === formData.stationId)?.name}</div>
                        <div><span className="text-slate-500">Subject:</span> {formData.subject}</div>
                        <div><span className="text-slate-500">Date:</span> {formData.incidentDate}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 border-b pb-2">Your Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="text-slate-500">Name:</span> {formData.firstName} {formData.lastName}</div>
                        <div><span className="text-slate-500">Contact:</span> {formData.mobile} | {formData.email}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 border-b pb-2">Description</h4>
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{formData.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <Checkbox id="declaration" checked={formData.agreed} onCheckedChange={(c) => setFormData(p => ({...p, agreed: !!c}))} className="mt-1" />
                    <label htmlFor="declaration" className="text-sm text-blue-900 leading-relaxed font-medium cursor-pointer">
                      I hereby declare that the information provided is true and correct to the best of my knowledge. I understand that filing a false complaint is a punishable offense.
                    </label>
                  </div>
                </div>

              </form>
            </CardContent>
            
            {step < 6 && (
              <CardFooter className="border-t bg-slate-50/50 flex justify-between p-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" /> Back
                </Button>
                
                {step < 5 ? (
                  <Button type="button" onClick={nextStep} className="bg-blue-900 hover:bg-blue-800">
                    Next Step <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" form="complaint-form" className="bg-blue-900 hover:bg-blue-800" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Complaint"} <CheckCircle2 className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  )
}
