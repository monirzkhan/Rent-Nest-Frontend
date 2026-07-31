"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { Newspaper, ChevronRight, User2, HousePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenuItems } from "../_config/tenantSidebarMenuItems";
import { ISidebarItem, NavbarProps } from "@/lib/types";

export default function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();

  let navItems: ISidebarItem[] = [];

  if (user.data.role === "TENANT") {
    navItems = sidebarMenuItems.TENANT
  } else if (user.data.role === "LANDLORD") {
    navItems = sidebarMenuItems.LANDLORD;
  } else if (user.data.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar transition-all duration-300"
    >
      <SidebarHeader className="py-4 px-3 border-b border-sidebar-border/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">
            <HousePlus className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight truncate group-data-[collapsible=icon]:hidden">
            <span className="text-base font-semibold text-sidebar-foreground truncate">
              <a href={'/'} className="text-2xl text-blue-600 font-bold flex items-center justify-center gap-2">
                Rent Nest
              </a>
            </span>
            <span className="text-xs text-sidebar-foreground/60 font-medium truncate mt-0.5">
              {user.data.role.charAt(0).toUpperCase() + user.data.role.slice(1).toLowerCase()} Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`
                        transition-all duration-200 group
                        ${isActive
                          ? 'bg-primary/10 text-primary hover:bg-primary/15 font-semibold shadow-sm'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}
                      `}
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={`shrink-0 h-5 w-5 ${isActive ? 'text-primary' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/80'}`} />
                        <span className="truncate">{item.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto opacity-70 shrink-0 group-data-[collapsible=icon]:hidden" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border/50">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-sm">
            <User2 className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col overflow-hidden leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium truncate">{user.data.name}</span>
            <span className="text-xs text-sidebar-foreground/60 truncate">{user.data.email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}