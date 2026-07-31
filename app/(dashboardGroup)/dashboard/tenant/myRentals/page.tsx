import { Card } from '@/components/ui/card';
import { getMe } from '@/service/getMe';
import { cookies } from 'next/headers';
import React from 'react';
import { RentalCard } from '../_components/rentalCard';

const MyRentalPage = async () => {
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

    console.log(rentals);
    return (
        <div className='w-11/12 mx-auto '>
            <Card>
                <div>
                    <h1 className='text-2xl font-semibold text-center'>My Rental Request</h1>
                </div>
                <div>
                    {
                        rentals.data.map((rental: any) => (
                            <RentalCard key={rental.id} rental={rental}></RentalCard>
                        ))
                    }
                </div>
            </Card>
        </div>
    );
};

export default MyRentalPage;