 
"use client"

import { rentalPaymentCheckout } from "@/app/(publicGroup)/_actions/rentalPayment";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export function PaymentButton({ id }: { id: string }) {
    const [pending, startTransition] = useTransition();

    const handlePayment = () => {
        startTransition(async () => {
            try {
                const result = await rentalPaymentCheckout(id);
                if (result && !result.success) {
                    toast.error(result.message || "Failed to start checkout");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
            }
        });
    }

    return (
        <Button onClick={handlePayment} disabled={pending} className="w-full md:w-auto bg-green-500">
            {pending ? "Redirecting..." : "Pay Now"}
        </Button>
    )
}