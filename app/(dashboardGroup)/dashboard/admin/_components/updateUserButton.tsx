'use client'

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon, Loader2 } from 'lucide-react'

interface UserStatusUpdateButtonProps {
    onStatusChange: (activeStatus: string) => Promise<{ success: boolean; message?: string }>;
}

export function UserStatusUpdateButton({
    onStatusChange,
}: UserStatusUpdateButtonProps) {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStatusChange = async (activeStatus: string) => {
        setIsUpdating(true)

        try {
            const result = await onStatusChange(activeStatus)

            if (result?.success) {
                toast.success(`User status updated to ${activeStatus}.`)
            } else {
                toast.error(result?.message || "Failed to update user status.")
            }
        } catch {
            toast.error("Something went wrong while updating the user status.")
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <ButtonGroup>
            <Button variant="outline" disabled={isUpdating}>
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Update
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" type="button" disabled={isUpdating}>
                        <ChevronDownIcon aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">

                    <DropdownMenuItem onSelect={() => handleStatusChange("ACTIVE")}>Active</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => handleStatusChange("BLOCKED")}>Blocked</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </ButtonGroup>
    )
}
