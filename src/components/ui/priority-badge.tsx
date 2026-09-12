import { Badge } from "@/components/ui/badge"
import { ComplaintPriority } from "@/types"
import { AlertCircle, ArrowDown, ArrowUp, Minus } from "lucide-react"

export function PriorityBadge({ priority }: { priority: ComplaintPriority }) {
  let icon = <Minus className="h-3 w-3 mr-1" />
  let colorClass = ""

  switch (priority) {
    case "Low":
      icon = <ArrowDown className="h-3 w-3 mr-1" />
      colorClass = "text-slate-500 border-slate-200"
      break
    case "Medium":
      icon = <Minus className="h-3 w-3 mr-1" />
      colorClass = "text-blue-600 bg-blue-50 border-blue-200"
      break
    case "High":
      icon = <ArrowUp className="h-3 w-3 mr-1" />
      colorClass = "text-amber-600 bg-amber-50 border-amber-200"
      break
    case "Critical":
      icon = <AlertCircle className="h-3 w-3 mr-1" />
      colorClass = "text-red-600 bg-red-50 border-red-200"
      break
  }

  return (
    <Badge variant="outline" className={`flex items-center ${colorClass}`}>
      {icon}
      {priority}
    </Badge>
  )
}
