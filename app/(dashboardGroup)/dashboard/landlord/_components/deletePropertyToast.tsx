"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Octagon, OctagonX } from "lucide-react";
import { deletePropertyAction } from "../_actions/deletePropertyAction";

interface ConfirmDeleteToastProps {
    property: {
        id: string;
        title: string;
    };
    isLoggedIn: boolean;
}

export function ConfirmDeleteToast({ property, isLoggedIn }: ConfirmDeleteToastProps) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!isLoggedIn) {
            toast.error("You must be logged in to delete a property.");
            return;
        }

        toast("Confirm deletion", {
            description: `This ${property.title} will be permanently deleted. This action cannot be undone.`,
            action: {
                label: "Delete",
                async onClick() {
                    const result = await deletePropertyAction({ id: property.id });

                    if (result?.success) {
                        toast.success(`${property.title} has been deleted successfully.`);
                        router.refresh();
                    } else {
                        toast.error(result?.message || "Failed to delete property.");
                    }
                },
            },
            cancel: {
                label: "Cancel",
                onClick: () => { },
            },
        });
    };

    return (
        <div className="flex items-center justify-center">

            <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white">

                <OctagonX /> Delete
            </Button>
        </div>
    );
}

export function DeleteSuccessToast() {
    return (
        <div className="flex items-center justify-center">
            <Button
                onClick={() => toast.success("Item deleted successfully")}
                variant="default"
                className="w-fit border-red-500 bg-red-500 text-white hover:bg-red-500/20 hover:text-red-700"
            >
                <Octagon className="mr-2 h-4 w-4" /> Delete
            </Button>

        </div>
    );
}

export function DeleteErrorToast() {
    return (
        <div className="flex items-center justify-center">
            <Button
                onClick={() => toast.error("Failed to delete item")}
                variant="outline"
                className="w-fit"
            >
                <Octagon className="mr-2 h-4 w-4" /> Delete
            </Button>
        </div>
    );
}
