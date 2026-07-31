import PropertyCard from '@/components/shared/properyCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import React from 'react';

const FeaturePropertyList = async () => {

    const data = await fetch('https://rentnest-seven.vercel.app/api/properties', { cache: 'no-store' })
    const properties = await data.json()
    return (
        <div className='space-y-12'>
            <div className='text-center md:text-4xl text-xl font-semibold '>
                <h1>Browse Properties and Rent</h1>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1   gap-4'>
                {
                    properties.data.slice(0, 6).map((property: any) => (
                        <PropertyCard key={property.id} property={property}></PropertyCard>
                    ))
                }

            </div>
            <div className='flex justify-center'>
                <Link href={"/properties"}>
                <Button variant={"link"} >
                    Browse All
                </Button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturePropertyList;