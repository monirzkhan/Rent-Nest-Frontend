import { ISidebarItem } from "@/lib/types"
import { Banknote, FileText, LayoutDashboard, UserStar } from "lucide-react"
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarMenuItems"
import { LANDLORD_SIDEBAR_ITEMS } from "./landlordSidebarMenuItems"



const TENANT_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Dashboard",
        href : "/dashboard/tenant",
        icon : LayoutDashboard
    },
    {
        label : "My Rental",
        href : "/dashboard/my-rentals",
        icon : FileText
    },
    {
        label : "Payment",
        href : "/dashboard/my-payment",
        icon : Banknote
    },
    {
        label : "Review",
        href : "/dashboard/my-review",
        icon : UserStar
    }
]


export const sidebarMenuItems = {
    TENANT : TENANT_SIDEBAR_ITEMS,
    LANDLORD : LANDLORD_SIDEBAR_ITEMS,
    ADMIN : ADMIN_SIDEBAR_ITEMS
}