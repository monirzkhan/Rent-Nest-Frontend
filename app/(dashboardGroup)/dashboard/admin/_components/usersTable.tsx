"use client";


import { Badge } from "@/components/reui/badge"
import { Button } from "@/components/ui/button";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { SettingsIcon } from "lucide-react";
import { UpdateUsersStatus } from "../_actions/userActions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { UserStatusUpdateButton } from "./updateUserButton";

interface UsersTableProps {
    users: { data: any[] };
}

export function UsersTable({ users }: UsersTableProps) {
    const router = useRouter();
    const [userRows, setUserRows] = useState(users.data);

    useEffect(() => {
        setUserRows(users.data);
    }, [users.data]);

    const handleStatusChange = async (userId: string, status: string) => {
        const result = await UpdateUsersStatus(userId, status);

        if (result?.success) {
            setUserRows((prev) =>
                prev.map((user: any) =>
                    user.id === userId ? { ...user, status } : user
                )
            );
            router.refresh();
        }

        return result;
    };

    const getStatusVariant = (status: string) => {
        switch (status?.toUpperCase()) {
            case "ACTIVE":
                return "success";
            case "BLOCKED":
                return "destructive";
        }
    };

    const formatStatus = (activeStatus: string) =>
        activeStatus ? activeStatus.charAt(0).toUpperCase() + activeStatus.slice(1).toLowerCase() : "Pending";
    return (
        <div className="mx-auto flex w-full flex-col">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Active Status</TableHead>
                        <TableHead >Update</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {userRows.map((user) => {
                        const formattedCreatedAt = new Date(
                            user.createdAt).toLocaleDateString();
                        
                        return (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">
                                            {user.name}
                                        </span>
                                        
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge variant="focus" size="lg">
                                        {user.email}
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                   {
                                    user.activeStatus==="ACTIVE"?
                                     <Badge variant="success" size="lg">
                                        {user.role}
                                    </Badge>
                                    :
                                     <Badge variant="destructive" size="lg">
                                        {user.role}
                                    </Badge>
                                   }
                                </TableCell>

                                <TableCell>
                                    {formattedCreatedAt}
                                </TableCell>

                                <TableCell>
                                    {
                                    user.activeStatus==="ACTIVE"?
                                     <Badge variant="success" size="lg">
                                        {formatStatus(user.activeStatus)}
                                    </Badge>
                                    :
                                     <Badge variant="destructive" size="lg">
                                        {formatStatus(user.activeStatus)}
                                    </Badge>
                                   }
                                </TableCell>

                                <TableCell className="text-right">
                                    <UserStatusUpdateButton
                                        onStatusChange={(status) => handleStatusChange(user.id, status)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}