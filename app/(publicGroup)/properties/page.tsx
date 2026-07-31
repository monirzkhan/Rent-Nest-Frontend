import PropertyCard from '@/components/shared/properyCard';
import { Search } from 'lucide-react';
import React from 'react';
import { SearchBox } from '../_components/searchBox';
import { Breadcums } from '../_components/breadcums';

const PublicPropertiesPage = async () => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties`, { cache: 'no-store' })
    const properties = await data.json()

    return (
        <div className='w-11/12 mx-auto my-5 px-5 space-y-8'>
            <Breadcums></Breadcums>
            {/* Property Header */}
            <div className='flex justify-between items-center w-11/12'>
                <div className='space-y-2'>
                    <h1 className='md:text-4xl text-2xl font-bold'>Browse and Rent Property </h1>
                    <p>World Best Class Property listed here for thinking your comfort</p>
                </div>
                {/* Search Bar  */}
                <div className='w-90 flex items-center justify-end gap-2 my-2'>
                    <SearchBox></SearchBox>
                    {/* <p className='text-lg font-semibold text-green-500'>Property: {properties.data.length || 0} </p> */}
                </div>
            </div>
            {/* Property List  */}
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4'>
                {
                    properties.data.map((property: any) => (
                        <PropertyCard key={property.id} property={property}></PropertyCard>
                    ))
                }

            </div>
        </div>
    );
};

export default PublicPropertiesPage;