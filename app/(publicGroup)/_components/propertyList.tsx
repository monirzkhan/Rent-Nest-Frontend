import PropertyCard from '@/components/shared/properyCard';
import React from 'react';
import { getProperty } from '../_actions/getProperty';

const PropertyList = async({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {

    const query = await searchParams;
  const properties = await getProperty({ query });
    return (
         <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                {
                    properties.data.map((property: any) => (
                        <PropertyCard key={property.id} property={property}></PropertyCard>
                    ))
                }

            </div>
    );
};

export default PropertyList;