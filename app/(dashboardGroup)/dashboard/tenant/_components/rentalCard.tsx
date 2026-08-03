import React from 'react';
import { Badge } from "@/components/reui/badge";
import { Button } from "@/components/ui/button";
import { IRentalRequest } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, HomeIcon } from "lucide-react";
import { rentalPaymentCheckout } from '@/app/(publicGroup)/_actions/rentalPayment';
import { PaymentButton } from './PaymentButton';
import Link from 'next/link';

type IRentalProps = {
    rental: IRentalRequest;
};

export function RentalCard({ rental }: IRentalProps) {
    const formattedDate = rental.moveInDate
        ? new Date(rental.moveInDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
        : "N/A";

    return (
        <Card className="flex border-amber-200 border-1 m-4 flex-col md:flex-row items-start md:items-center justify-between p-5 my-4 gap-6 hover:shadow-md transition-shadow">
            {/* Property Info */}
            <div className="flex items-center gap-4 flex-[2] w-full min-w-0">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                    <HomeIcon className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-semibold text-lg line-clamp-2" title={rental.property?.title}>{rental.property?.title || "Unknown Property"}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">Property Name</p>
                </div>
            </div>

            {/* Move-in Date */}
            <div className="flex-1 flex flex-col w-full">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">{formattedDate}</span>
                </div>
                <p className="text-sm text-gray-500">Move-in Date</p>
            </div>

            {/* Duration */}
            <div className="flex-1 flex flex-col w-full">
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-gray-700">{rental.durationMonths} Months</span>
                </div>
                <p className="text-sm text-gray-500">Duration</p>
            </div>

            {/* Status */}
            <div className="flex-1 flex flex-col items-start md:items-center w-full">
                {rental.status === "APPROVED" ? (
                    <Badge variant="info">{rental.status}</Badge>
                ) : rental.status === "REJECTED" ? (
                    <Badge variant="destructive">{rental.status}</Badge>
                ) : rental.status === "PENDING" ? (
                    <Badge variant="warning">{rental.status}</Badge>
                ) : rental.status === "ACTIVE" ? (
                    <Badge variant="success">{rental.status}</Badge>
                ) : (
                    <Badge variant="secondary">{rental.status}</Badge>
                )}
                <p className="text-sm text-gray-500 mt-1">Request Status</p>
            </div>

            {/* Action / Payment */}


            <div className="flex-1 flex justify-start md:justify-end w-full md:w-auto">
                {rental.status === "PENDING" ? (
                    <Link href={`/dashboard/tenant/myReview/${rental.id}`} className="underline text-blue-500">
                        Write Review
                    </Link>
                ) : rental.status === "APPROVED" ? (
                    <PaymentButton id={rental.id} />
                ) : (
                    <Button disabled variant="ghost" className="w-full md:w-auto">
                        Pending Approval
                    </Button>
                )}

            </div>

        </Card>
    );
}
