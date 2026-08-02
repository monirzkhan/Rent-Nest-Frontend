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
        href : "/dashboard/landlord/myProperties",
        icon : Home
    },
    {
        label : "My Rental Request",
        href : "/dashboard/landlord/myRentalsRequest",
        icon : Book
    },
]