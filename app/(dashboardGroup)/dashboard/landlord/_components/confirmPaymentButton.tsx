"use client";

import { useState } from "react";
import { toast } from "sonner";
import { confirmPayment } from "../_actions/confirmPaymentAction";
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
    console.log(resolvedSessionId , "from Confirm Button resolvedSessionId");
    console.log(contextSessionId , "from Confirm Button contextSessionId");
    console.log(requestId , "from Confirm Button requestId");
    console.log(resolvedSessionId , "from Confirm Button requestId resolvedSessionId");

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