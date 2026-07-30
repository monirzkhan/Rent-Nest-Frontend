import PropertyGallery from '@/components/shared/carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const HomeBanner = () => {
    return (
        <div className='md:flex w-11/12 mx-auto justify-between items-center space-y-4'>
            <div className='space-y-4'>
                <h1 className='text-xl  md:text-5xl font-extrabold text-accent-foreground'>Executive-Grade Rentals for Every Journey</h1>
                <p className='text-sm md:text-xl italic text-primary'>Whether traveling for business or leisure, LuxeStay provides fully-furnished, stylish properties in prime locations — so you feel at home, wherever you go.</p>
                <Link href={"/properties"}>
                <Button>Browse Properties</Button>
                </Link>

            </div>
            {/* <Pattern></Pattern> */}
            <PropertyGallery></PropertyGallery>
        </div>
    );
};

export default HomeBanner;