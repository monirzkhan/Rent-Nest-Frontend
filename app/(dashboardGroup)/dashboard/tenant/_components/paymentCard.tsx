import React from 'react';
import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Banknote, CalendarIcon, ClockIcon, HomeIcon } from "lucide-react";
import { rentalPaymentCheckout } from '@/app/(publicGroup)/_actions/rentalPayment';
import { PaymentButton } from './PaymentButton';
import Link from 'next/link';

interface IPaymentRequest {
    id: string;
    transactionId: string;
    amount: number;
    status: string;
    moveInDate: string;
    durationMonths: number;
    paidAt: string;
    property: {
        title: string;
    };
}
type IPaymentProps = {
    payment: IPaymentRequest;
};

export function PaymentCard({ payment }: IPaymentProps) {
    const formattedDate = payment.paidAt
        ? new Date(payment.paidAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : "N/A";

    return (
        <Card className="flex border-amber-200 border-1 m-4 flex-col md:flex-row items-start md:items-center justify-between p-5 my-4 gap-6 hover:shadow-md transition-shadow">
            {/* Payment Info */}
            <div className="flex items-center gap-4 flex-[2] w-full min-w-0">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <HomeIcon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-semibold text-xs line-clamp-2 truncate" title={payment.transactionId}>{payment.transactionId}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Transaction ID</p>
                </div>
            </div>

            {/* Move-in Date */}
            <div className="flex-1 flex flex-col w-full">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">{formattedDate}</span>
                </div>
                <p className="text-sm text-gray-500">Paid At</p>
            </div>

            {/* Duration */}
            <div className="flex-1 flex flex-col w-full">
                <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">{payment.amount} </span>
                </div>
                <p className="text-sm text-gray-500">Amount</p>
            </div>

            {/* Status */}
            <div className="flex-1 flex flex-col items-start md:items-center w-full">
                {payment.status === "APPROVED" ? (
                    <Badge variant="info">{payment.status}</Badge>
                ) : payment.status === "REJECTED" ? (
                    <Badge variant="destructive">{payment.status}</Badge>
                ) : payment.status === "PENDING" ? (
                    <Badge variant="warning">{payment.status}</Badge>
                ) : payment.status === "PAID" ? (
                    <Badge variant="success">{payment.status}</Badge>
                ) : (
                    <Badge variant="secondary">{payment.status}</Badge>
                )}
                <p className="text-sm text-gray-500 mt-1">Request Status</p>
            </div>

            {/* Action / Payment */}

{/* 
            <div className="flex-1 flex justify-start md:justify-end w-full md:w-auto">
                {payment.status === "COMPLETED" ? (
                    <Link href={`/dashboard/tenant/myReview/${payment.id}`} className="underline text-blue-500">
                        Write Review
                    </Link>
                ) : payment.status === "APPROVED" ? (
                    <PaymentButton id={payment.id} />
                ) : (
                    <Button disabled variant="ghost" className="w-full md:w-auto">
                        Waiting for Approval
                    </Button>
                )}

            </div> */}

        </Card>
    );
}
