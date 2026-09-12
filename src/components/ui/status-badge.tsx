import { Badge } from "@/components/ui/badge"
import { ComplaintStatus } from "@/types"

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default"
  let colorClass = ""

  switch (status) {
    case "Submitted":
      variant = "outline"
      colorClass = "text-slate-500 border-slate-200"
      break
    case "Received":
    case "Verification":
      variant = "secondary"
      colorClass = "bg-blue-100 text-blue-700"
      break
    case "Assigned":
    case "Investigation":
      variant = "default"
      colorClass = "bg-blue-600 text-white"
      break
    case "Info Required":
      variant = "secondary"
      colorClass = "bg-amber-100 text-amber-700"
      break
    case "Resolved":
    case "Closed":
      variant = "default"
      colorClass = "bg-emerald-600 text-white"
      break
    case "Rejected":
      variant = "destructive"
      break
  }

  return (
    <Badge variant={variant} className={`${colorClass} font-medium`}>
      {status}
    </Badge>
  )
}
