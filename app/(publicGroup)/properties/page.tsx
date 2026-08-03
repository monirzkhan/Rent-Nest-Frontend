import PropertyCard from '@/components/shared/properyCard';
import { Search } from 'lucide-react';
import React, { Suspense } from 'react';
import { SearchBox } from '../_components/searchBox';
import { Breadcums } from '../_components/breadcums';
import { PropertySearchBar } from '../_components/propertySearchBar';
import PropertyList from '../_components/propertyList';
import { MyPropertySkeleton } from '@/app/(dashboardGroup)/dashboard/landlord/_components/myPropertSkelaton';

const PublicPropertiesPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    // const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/properties`, { cache: 'no-store' })
    // const properties = await data.json()

    return (
        <div className='w-11/12 mx-auto my-5 px-5 space-y-8'>
            <Breadcums></Breadcums>
            {/* Property Header */}
            <div className='md:flex  justify-between items-center w-11/12'>
                <div className='space-y-2'>
                    <h1 className='md:text-4xl text-2xl font-bold'>Browse and Rent Property </h1>
                    <p>World Best Class Property listed here for thinking your comfort</p>
                </div>
                {/* Search Bar  */}
                <div className='w-90 flex items-center justify-end gap-2 my-2'>
                    {/* <SearchBox></SearchBox> */}
                    <PropertySearchBar/>
                    {/* <p className='text-lg font-semibold text-green-500'>Property: {properties.data.length || 0} </p> */}
                </div>
            </div>
            {/* Property List  */}
            <Suspense fallback={<MyPropertySkeleton/>}>
                <PropertyList searchParams={searchParams}></PropertyList>
            </Suspense>
           
        </div>
    );
};

export default PublicPropertiesPage;