import { Card } from '@/components/ui/card';
import React from 'react';

const CategoryCard = ({ category }: { category: any }) => {
    return (
        <Card className=" rounded-lg bg-linear-to-r from-green-500 to-emerald-500 md:p-4 p-1  text-center text-primary-foreground" >
            {category.name}
        </Card>
    );
};

export default CategoryCard;