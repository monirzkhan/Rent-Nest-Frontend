import { Card } from '@/components/ui/card';
import React from 'react';
import { cookies } from 'next/headers';
import { RentalStats } from './_components/RentalStats';

const TenantDashboard = async () => {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );
    const rentals = await res.json();
    return (
        <div className='w-11/12 mx-auto space-y-4'>
            <Card>
                <div className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-blue-400 text-white'>
                    <h1 className='text-2xl font-semibold text-center'>Tenant Dashboard</h1>
                </div>
            </Card>
            <Card>
                <div>
                    {
                        rentals.data.map((rental: any) => (
                            <RentalStats key={rental.id} rental={rental}></RentalStats>
                        ))
                    }
                </div>
            </Card>
        </div>
    );
};

export default TenantDashboard;