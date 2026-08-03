import React from 'react';
import { getRentalRequestsAction } from '../_actions/rentalRequestAction';
import { cookies } from 'next/headers';
import { RentalRequestTable } from './rentalRequestTable';

const MyRentalRequestList = async () => {
    const rentalRequests = await getRentalRequestsAction();
     
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
       

