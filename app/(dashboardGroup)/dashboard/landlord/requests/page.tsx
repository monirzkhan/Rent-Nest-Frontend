import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';

import MyRentalRequestList from '../_components/myRentalRequestList';
import { RentalRequestSkelaton } from '../_components/rentalRequestSkelaton';

const MyRentalRequestPage = async() => {
    const cookieStore = await cookies();
       const isLoggedIn = !!cookieStore.get('accessToken')?.value;
   
       return (
           <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">
               <Card className="rounded-lg bg-blue-400 md:p-4 p-1  text-center text-primary-foreground">
                   <h1 className="text-xl font-bold">My Rental Requests</h1>
               </Card>
               
              <Suspense fallback={<RentalRequestSkelaton />}>
               <MyRentalRequestList />
              </Suspense>
           </Card>
       );
};

export default MyRentalRequestPage;