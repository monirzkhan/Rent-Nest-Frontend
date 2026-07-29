import PropertyCard from '@/components/shared/properyCard';

import React from 'react';

const FeaturePropertyList = async () => {

    const data = await fetch('https://rentnest-seven.vercel.app/api/properties')
    const properties = await data.json()
    return (
        <div className='space-y-12'>
            <div className='text-center text-4xl font-semibold '>
                <h1>Browse Properties and Rent</h1>
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {
                    properties.data.map((property: any) => (
                        <PropertyCard key={property.id} property={property}></PropertyCard>
                    ))
                }

            </div>
        </div>
    );
};

export default FeaturePropertyList;