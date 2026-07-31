import { ISidebarItem } from "@/lib/types"
import { Book, FileText, Home, LayoutDashboard } from "lucide-react"



export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/dashboard/landlord",
        icon : LayoutDashboard
    },
    {
        label : "My Properties",
        href : "/dashboard/my-properties",
        icon : Home
    },
    {
        label : "My Rental Request",
        href : "/dashboard/my-rentals-request",
        icon : Book
    },
]