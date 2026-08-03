"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/reui/badge"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RentalStatusUpdateButton } from "./rentalStatusButton"
import { UpdateRentalRequestsStatusAction } from "../_actions/rentalRequestAction"
import ConfirmPaymentButton from "./confirmPaymentButton";
import { PaymentSessionProvider } from "./paymentSessionContext";


interface RentalRequestTableProps {
  requests: {
    data: any[];
  };
}

function RentalRequestTableContent({ requests }: RentalRequestTableProps) {
  const router = useRouter();
  const [requestRows, setRequestRows] = useState(requests.data);

  useEffect(() => {
    setRequestRows(requests.data);
  }, [requests.data]);

  const handleStatusChange = async (requestId: string, status: string) => {
    const result = await UpdateRentalRequestsStatusAction(requestId, status);

    if (result?.success) {
      setRequestRows((prev) =>
        prev.map((request: any) =>
          request.id === requestId ? { ...request, status } : request
        )
      );
      router.refresh();
    }

    return result;
  };

  const getStatusVariant = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "destructive";
      case "PENDING":
        return "warning";
      default:
        return "secondary";
    }
  };

  const formatStatus = (status: string) =>
    status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : "Pending";

  const getPaymentSessionId = (request: any) => {
    return (
      request?.sessionId ||
      request?.payment?.sessionId ||
      request?.paymentSessionId ||
      request?.checkoutSessionId ||
      request?.stripeSessionId ||
      request?.transactionId ||
      null
    );
  };

  return (
    <div className="mx-auto flex w-full flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Move in Date</TableHead>
            <TableHead>Months</TableHead>
            <TableHead>Rent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
            <TableHead >Payment</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requestRows.map((request: any) => {
            const formattedMoveInDate = new Date(
              request.moveInDate
            ).toLocaleDateString();

            return (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {request.property.title}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      Tenant: {request.tenant.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge variant="info" size="sm">
                    {formattedMoveInDate}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge variant="info-light" size="sm">
                    {request.durationMonths}
                  </Badge>
                </TableCell>

                <TableCell>
                  {request.property.rentAmount}/monthly
                </TableCell>

                <TableCell>
                  <Badge variant={getStatusVariant(request.status)} size="sm" radius="full">
                    {formatStatus(request.status)}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <RentalStatusUpdateButton
                    onStatusChange={(status) => handleStatusChange(request.id, status)}
                  />
                </TableCell>

                <TableCell>
                  {request.status === "COMPLETED" ? (
                    <ConfirmPaymentButton
                      sessionId={getPaymentSessionId(request)}
                      requestId={request.id || request._id || request.rentalRequestId || request.requestId}
                    />
                  ) : request.status === "ACTIVE" ? (
                    <Badge variant="success" size="sm" radius="full">
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="secondary" size="sm" radius="full">
                      Pending
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function RentalRequestTable({ requests }: RentalRequestTableProps) {
  return (
    <PaymentSessionProvider>
      <RentalRequestTableContent requests={requests} />
    </PaymentSessionProvider>
  );
}