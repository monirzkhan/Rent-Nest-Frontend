import React from 'react';
import { getAllCategories } from '../_actions/categoryAction';
import { Card } from '@/components/ui/card';
import CategoryCard from './categoryCard';

const CategoryList = async () => {
    const categoriesData= await getAllCategories()
    const categories = categoriesData.data
    
    if (!categories || categories.length === 0) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-gray-500 text-lg">No Categories found.</p>
            </div>
        );
    }

    return (
        <div className="w-11/12 mx-auto grid grid-cols-1 gap-4 md:grid-cols-3 my-8">

        
            {
                categories.slice(0,6).map((category: any) => (
                   <CategoryCard key={category.id} category={category} />
                ))
            }
        
         </div>
    );
};

export default CategoryList;