import HomeLoader from '@/components/shared/homeLoader';
import React from 'react';

const GlobalLoading = () => {
    return (
        <div className='w-11/12 mx-auto flex items-center justify-center my-20'>
            <HomeLoader/>
        </div>
    );
};

export default GlobalLoading;