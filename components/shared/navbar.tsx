"use client";
// import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LayoutDashboardIcon, LogOutIcon, Settings, TextAlignJustify, User, User2Icon } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import RegisterButton from "./registerButton";

import { toast } from "sonner";
import { logout } from "@/service/logout";
import { useRouter } from "next/navigation";

export type NavigationSection = {
    title: string;
    href: string;
};
type IUser = {
    success: boolean,
    message: string,
    data: {
        activeStatus:
        string
        createdAt
        :
        string
        email
        :
        string
        id
        :
        string
        name
        :
        string
        role: string
        profile: {


            id: string,
            profilePhoto: string,
            bio: string | null,
            userId: string,
            createdAt: string,
            updatedAt: string

        }
    }
}

type NavbarProps = {
    user: IUser
}
// User menu items configuration
const userMenuItems = [
    { label: "Dashboard", icon: LayoutDashboardIcon, action: "dashboard" },
    { label: "Profile", icon: User, action: "profile" },
    { label: "Settings", icon: Settings, action: "settings" },
];
const navigationData: NavigationSection[] = [
    {
        title: "About us",
        href: "/about",
    },
    {
        title: "Properties",
        href: "/croperties",
    },
    {
        title: "Categories",
        href: "/categories",
    },
    {
        title: "Team",
        href: "#",
    },
    {
        title: "Blogs",
        href: "/blogs",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];

const CollaborateButton = ({ className }: { className?: string }) => (
    <Link href={'/login'}>
        <RegisterButton></RegisterButton>

        {/* <Button className={cn("relative text-sm font-medium rounded-full h-10 p-1 ps-4 pe-12 group transition-all duration-500 hover:ps-12 hover:pe-4 w-fit overflow-hidden hover:bg-primary/80", className)}>
    <span className="relative z-10 transition-all duration-500 hover:cursor-pointer">
      
    </span>
    <div className="absolute right-1 w-8 h-8 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
      <ArrowUpRight size={16} />
    </div>
    
  </Button> */}
    </Link>

);

const Navbar = ({ user }: NavbarProps) => {
    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleScroll = useCallback(() => {
        setSticky(window.scrollY >= 50);
    }, []);

    const handleResize = useCallback(() => {
        if (window.innerWidth >= 768) setIsOpen(false);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [handleScroll, handleResize]);

    const router = useRouter()
    const handleUserMenuAction = async (action: string) => {
        if (action === "dashboard") {
            if (user.data.role === 'TENANT') {
                router.push("/dashboard/tenant")
            }
            else if (user.data.role === 'LANDLORD') {
                router.push("/dashboard/landlord")
            }
            else if (user.data.role === 'ADMIN') {
                router.push("/dashboard/admin")
            }
            return;
        }

        if (action === "logout") {
            await logout();
            toast.success("User Logged Out Successfully!");
            router.push("/login");
        }
    };
    const name = user.data?.name
    const email = user.data?.email
    const role = user.data?.role

    return (
        <div>
            <header className="bg-background">
                <div className="max-w-7xl mx-auto w-full px-4 py-4 sm:px-6">
                    <nav
                        className={cn(
                            "w-full flex items-center h-fit justify-between gap-3.5 lg:gap-6 transition-all duration-500",
                            sticky
                                ? "p-2.5 bg-background/60 backdrop-blur-lg border border-border/40 shadow-2xl shadow-primary/5 rounded-full"
                                : "bg-transparent border-transparent"
                        )}
                    >
                        <a href={'/'}>
                            Rent Nest
                        </a>
                        <div>
                            <NavigationMenu className="max-lg:hidden bg-muted p-0.5 rounded-full">
                                <NavigationMenuList className="flex gap-0">
                                    {navigationData.map((navItem) => (
                                        <NavigationMenuItem key={navItem.title}>
                                            <NavigationMenuLink
                                                href={navItem.href}
                                                className="px-2 lg:px-4 py-2 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground hover:bg-background outline outline-transparent hover:outline-border hover:shadow-xs transition tracking-normal"
                                            >
                                                {navItem.title}
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                        {/* User Dropdown */}
                        {
                            user.success ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User2Icon className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm font-medium">
                                                    {name || "name"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {email || "email"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {role || ""}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            return (
                                                <DropdownMenuItem
                                                    key={item.action}
                                                    onClick={() => handleUserMenuAction(item.action)}
                                                >
                                                    <Icon className="w-4 h-4 mr-2" />
                                                    <span>{item.label}</span>
                                                </DropdownMenuItem>
                                            );
                                        })}
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={async () => {
                                            await handleUserMenuAction("logout");
                                        }}>
                                            <LogOutIcon className="w-4 h-4 mr-2" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) :
                                <CollaborateButton className="hidden lg:flex" />
                            // <Link href={"/login"} >
                            //     <Button className="cursor-pointer">
                            //         Login
                            //     </Button>
                            // </Link>
                        }


                        <div className="lg:hidden">
                            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                                <DropdownMenuTrigger className="rounded-full bg-background border border-border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors">
                                    <TextAlignJustify size={20} />
                                    <span className="sr-only">Menu</span>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-56 mt-2"
                                >
                                    {navigationData.map((item) => (
                                        <DropdownMenuItem key={item.title}>
                                            <a href={item.href} className="w-full cursor-pointer text-sm font-medium">{item.title}</a>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
