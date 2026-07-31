import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IPostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type IAuthor = {
    id: string;
    name: string;
    email: string;
    activeStatus: string;
    role: string;
    createdAt: string;
    updatedAt: string;
};

export type IProperty = {
    id: string;
    title: string;
    description: string;
    rentAmount: string;
    bedrooms: number;
    bathrooms: number;
    areas: number;
    address: string;
    thumbnail: string;
    images: string[];
    status: "AVAILABLE" | "RENTED";
    landlordId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    category: {
        id: string;
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    };
    landlord: {
        id: string;
        name: string;
        email: string;
        role: string;
        activeStatus: string;
        createdAt: string;
        updatedAt: string;
    };
};



export type IUser = {
    success: boolean,
    message: string,
    data: {
        id: string;
        name: string;
        email: string;
        role: "TENANT" | "LANDLORD" | "ADMIN";
        activeStatus: "ACTIVE" | "BLOCKED";
        createdAt: string;
        updatedAt: string;
        profile: {
            id: string;
            profilePhoto: string;
            bio: string;
            userId: string;
            createdAt: string;
            updatedAt: string;
        } | null;
    }
};

export type NavbarProps = {
    user: IUser
}

export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}