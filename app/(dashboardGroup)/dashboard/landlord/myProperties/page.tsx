import PropertyCard from '@/components/shared/properyCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React from 'react';

const MyPropertiesPage = async () => {
    const cookieStore = await cookies();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/landlord/properties`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );
    const properties = await res.json();
    return (
        <Card className='flex flex-col gap-4 w-11/12 mx-auto mt-4 p-4'>
            <Card className='bg-primary text-primary-foreground p-4 rounded-lg text-center'>
                <h1 className='text-2xl font-bold'>My Properties</h1>
            </Card>
            <div className='flex justify-end'>
                <Button variant={'default'}>Post Property</Button>
            </div>
            <Card className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
                


                {
                    properties.data.map((property: any) => (
                        <PropertyCard key={property.id} property={property} />
                    ))
                }


            </Card>
        </Card>
    );
};

export default MyPropertiesPage;