import React, { Suspense } from 'react';
import CategoryList from '../_components/categoryList';

const PublicCategoriesPage = () => {
    return (
        <div>
            <div className='text-center md:text-4xl text-xl my-4'>
                <h1 className='md:text-4xl text-2xl font-bold'>Our Property Categories</h1>
            </div>
          <div >
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryList />
            </Suspense>
          </div>
        </div>
    );
};

export default PublicCategoriesPage;