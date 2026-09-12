import ClientComponent from "./client"
import { mockComplaints } from "@/data/mockComplaints"

export function generateStaticParams() {
  return mockComplaints.map((c) => ({
    id: c.id,
  }))
}

export default function Page() {
  return <ClientComponent />
}
