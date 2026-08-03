import React from 'react';
import HomeBanner from './_components/homeBanner';
import FeaturePropertyList from './_components/featurePropertyList';
import PublicCategoriesPage from './categories/page';

const RootPage = () => {
    return (
        <div className='w-11/12 mx-auto px-8 py-8  items-center justify-center space-y-16'>
            <HomeBanner></HomeBanner>
            <PublicCategoriesPage></PublicCategoriesPage>
            <FeaturePropertyList></FeaturePropertyList>
            
        </div>
    );
};

export default RootPage;