import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React from 'react';
import PropertyCardLandlord from './propertyCardLandlord';

const MyPropertyList = async () => {
    const cookieStore = await cookies();
    const isLoggedIn = !!cookieStore.get('accessToken')?.value;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/landlord/properties`,
        {
            cache: 'no-store',
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );
    const properties = await res.json();
    if (!properties || !properties.data || properties.data.length === 0) {
        return (
            <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">
            
                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 text-lg">No properties found.</p>
                </div>
            </Card>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:p-4 m-1 md:grid-cols-2 w-11/12 mx-auto">
            {properties.data.map((property: any) => (
                <PropertyCardLandlord key={property.id} property={property} isLoggedIn={isLoggedIn} />
            ))}
        </div>
    );
};

export default MyPropertyList;