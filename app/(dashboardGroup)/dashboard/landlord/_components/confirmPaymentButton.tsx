"use client";

import { useState } from "react";
import { toast } from "sonner";
import { confirmPayment } from "../_actions/paymentAction";
import { Button } from "@/components/ui/button";
import { usePaymentSession } from "./paymentSessionContext";

interface ConfirmPaymentButtonProps {
    sessionId?: string | null;
    requestId?: string | null;
}

const ConfirmPaymentButton = ({ sessionId: providedSessionId, requestId }: ConfirmPaymentButtonProps) => {
    const { sessionId: contextSessionId } = usePaymentSession();
    const [isConfirming, setIsConfirming] = useState(false);

    const resolvedSessionId = providedSessionId ?? contextSessionId ?? requestId;

    const handleConfirm = async () => {
        if (!resolvedSessionId) {
            toast.error("No session ID found for payment confirmation.");
            return;
        }

        setIsConfirming(true);
        const result = await confirmPayment(resolvedSessionId);
        setIsConfirming(false);

        if (result?.success) {
            toast.success("Payment confirmed successfully.");
        } else {
            toast.error(result?.message || "Failed to confirm payment.");
        }
    };

    return (
        <div>
            <Button className='bg-green-500' onClick={handleConfirm} disabled={isConfirming}>
                {isConfirming ? "Confirming..." : "Confirm"}
            </Button>
        </div>
    );
};

export default ConfirmPaymentButton;