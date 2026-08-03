import { ISidebarItem } from "@/lib/types"
import { Banknote, Book, FileText, Home, LayoutDashboard } from "lucide-react"



export const LANDLORD_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/dashboard/landlord",
        icon : LayoutDashboard
    },
    {
        label : "My Properties",
        href : "/dashboard/landlord/properties",
        icon : Home
    },
    {
        label : "My Rental Request",
        href : "/dashboard/landlord/requests",
        icon : Book
    },
    {
        label : "My Payments",
        href : "/dashboard/landlord/payments",
        icon : Banknote
    },
]