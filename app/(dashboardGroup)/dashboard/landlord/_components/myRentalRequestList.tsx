import React from 'react';
import { getRentalRequestsAction } from '../_actions/rentalRequestAction';
import { cookies } from 'next/headers';
import { RentalRequestTable } from './rentalRequestTable';
import { Card } from '@/components/ui/card';

const MyRentalRequestList = async () => {
    const rentalRequests = await getRentalRequestsAction();
      if (!rentalRequests || !rentalRequests.data || rentalRequests.data.length === 0) {
            return (
                <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">
                
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500 text-lg">No rental request found.</p>
                    </div>
                </Card>
            );
        }
     
    return (
        <div>
            {rentalRequests.length === 0 ? (
                <p className="text-center text-gray-500">No rental requests found.</p>
            ) : (
                
                <RentalRequestTable requests={rentalRequests} />
            )}
        </div>
    );
};

export default MyRentalRequestList;     
       

