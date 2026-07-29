import React from 'react';
import HomeBanner from './_components/homeBanner';
import FeaturePropertyList from './_components/featurePropertyList';

const RootPage = () => {
    return (
        <div className='w-11/12 mx-auto px-10 items-center justify-center my-12'>
            <HomeBanner></HomeBanner>
            <FeaturePropertyList></FeaturePropertyList>
        </div>
    );
};

export default RootPage;