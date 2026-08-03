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
import { UpdateUsersStatus } from "../_actions/userActions";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { UserStatusUpdateButton } from "./updateUserButton";

interface UsersTableProps {
    users: { data: any[] };
}

export function UsersTable({ users }: UsersTableProps) {
    const router = useRouter();
    const [userRows, setUserRows] = useState(users.data);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        setUserRows(users.data);
        setCurrentPage(1);
    }, [users.data]);

    const pageCount = Math.max(1, Math.ceil(userRows.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedUsers = userRows.slice(startIndex, startIndex + pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.min(Math.max(page, 1), pageCount));
    };

    const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(event.target.value);
        setPageSize(newSize);
        setCurrentPage(1);
    };

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
        <div className="mx-auto flex w-full px-2 flex-col gap-4">
            <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-medium text-foreground">Showing users</p>
                    <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {pageCount} · {userRows.length} total users
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Rows per page:</label>
                    <select
                        value={pageSize}
                        onChange={handlePageSizeChange}
                        className="rounded-lg border border-border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    >
                        {[5, 10, 20, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Active Status</TableHead>
                        <TableHead>Update</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {paginatedUsers.map((user) => {
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

            <div className="flex items-center px-2 justify-between rounded-lg border border-border bg-card p-4 shadow-sm">
                <div className="text-sm text-muted-foreground">
                    Showing {userRows.length ? startIndex + 1 : 0} to {Math.min(startIndex + pageSize, userRows.length)} of {userRows.length} users
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={currentPage <= 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="rounded-lg border border-border bg-background px-3 py-2 text-sm transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={currentPage >= pageCount}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
