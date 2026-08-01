import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React from 'react';
import { RentalCard } from '../../_components/rentalCard';
import ReviewForm from '../../_components/reviewForm';

const DynamicReviewPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params;
    const cookieStore = await cookies();

     const res = await fetch(
         `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/rentals/${id}`,
         {
             cache: "no-store",
             headers: {
                 Cookie: cookieStore.toString(),
             },
         }
     );
     const rentals = await res.json();
     const review = rentals.data
     const propertyId: string = review.propertyId
    return (
          <div className='w-11/12 mx-auto '>
            <Card>
                <div className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-amber-400 text-black'>
                    <h1 className='text-2xl font-semibold text-center'>Write Review</h1>
                </div>
                <div>
                   <Card className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-white text-black  space-y-4'>
                    <div className='space-y-2 text-center'>
                        <h1 className='text-2xl'>{review.property.title}</h1>
                    <p>{review.property.description}</p>
                    </div>
                    
                    <ReviewForm propertyId={propertyId}></ReviewForm>
                   </Card>
                </div>
            </Card>
        </div>
    );
};

export default DynamicReviewPage;