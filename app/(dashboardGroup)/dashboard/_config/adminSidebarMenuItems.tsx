import { ISidebarItem } from "@/lib/types"
import { BookAIcon, BookmarkCheck, FileText, Home, LayoutDashboard, UserIcon, UserShield } from "lucide-react"



export const ADMIN_SIDEBAR_ITEMS : ISidebarItem[] = [
    {
        label : "Admin Dashboard",
        href : "/dashboard/admin",
        icon : LayoutDashboard
    },
    {
        label : "Users Managements",
        href : "/dashboard/admin/users",
        icon : UserIcon
    },
    // {
    //     label : "Total Properties",
    //     href : "/dashboard/admin/total-properties",
    //     icon : Home
    // },
    // {
    //     label : "Total Rentals",
    //     href : "/dashboard/admin/total-rentals",
    //     icon : BookmarkCheck
    // },
    // {
    //     label : "Update Users",
    //     href : "/dashboard/admin/update-users",
    //     icon : UserShield
    // },
]