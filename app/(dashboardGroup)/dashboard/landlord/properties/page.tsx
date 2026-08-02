
import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React from 'react';
import PostPropertyModal from '../_components/postPropertyModal';
import PropertyCardLandlord from '../_components/propertyCardLandlord';

const MyPropertiesPage = async () => {
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
        <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-4">
            <Card className="rounded-lg bg-blue-500 p-4 text-center text-primary-foreground">
                <h1 className="text-2xl font-bold">My Properties</h1>
            </Card>
            <div className="flex justify-end">
                <PostPropertyModal isLoggedIn={isLoggedIn} />
            </div>
            <Card className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 w-11/12 mx-auto">
                {properties.data.map((property: any) => (
                    <PropertyCardLandlord key={property.id} property={property} />
                ))}
            </Card>
        </Card>
    );
};

export default MyPropertiesPage;