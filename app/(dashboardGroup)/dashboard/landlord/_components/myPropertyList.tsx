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
    return (
        <Card className="grid grid-cols-1 gap-4 md:p-4 p-1 md:grid-cols-2 w-11/12 mx-auto">
            {properties.data.map((property: any) => (
                <PropertyCardLandlord key={property.id} property={property} isLoggedIn={isLoggedIn} />
            ))}
        </Card>
    );
};

export default MyPropertyList;