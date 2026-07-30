import HomeLoader from '@/components/shared/homeLoader';
import React from 'react';

const GlobalLoading = () => {
    return (
        <div className='w-full mx-auto flex items-center justify-center my-50'>
            <HomeLoader/>
        </div>
    );
};

export default GlobalLoading;