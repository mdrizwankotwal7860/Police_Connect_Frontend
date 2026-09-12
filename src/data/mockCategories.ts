import { ComplaintCategory } from "../types"

export const mockCategories: ComplaintCategory[] = [
  { id: "cat_1", name: "Theft", description: "Reporting stolen property, vehicles, or pickpocketing", active: true },
  { id: "cat_2", name: "Cyber Crime", description: "Online fraud, hacking, identity theft, or harassment", active: true },
  { id: "cat_3", name: "Missing Person", description: "Report someone who is missing or lost", active: true },
  { id: "cat_4", name: "Fraud", description: "Financial fraud, cheating, or scams", active: true },
  { id: "cat_5", name: "Harassment", description: "Physical, mental, or workplace harassment", active: true },
  { id: "cat_6", name: "Property", description: "Property disputes, trespassing, or vandalism", active: true },
  { id: "cat_7", name: "Traffic", description: "Accidents, hit and run, or severe traffic violations", active: true },
  { id: "cat_8", name: "Lost Documents", description: "Lost passport, driving license, or other critical documents", active: true },
  { id: "cat_9", name: "Other", description: "Any other issues not listed above", active: true }
]
