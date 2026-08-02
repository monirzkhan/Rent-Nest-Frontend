
import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import PostPropertyModal from '../_components/postPropertyModal';
import { MyPropertySkeleton } from '../_components/myPropertSkelaton';
import MyPropertyList from '../_components/myPropertyList';

const MyPropertiesPage = async () => {
    const cookieStore = await cookies();
    const isLoggedIn = !!cookieStore.get('accessToken')?.value;

    return (
        <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">
            <Card className="rounded-lg bg-blue-400 md:p-4 p-1  text-center text-primary-foreground">
                <h1 className="text-xl font-bold">My Properties</h1>
            </Card>
            <div className="flex justify-end">
                <PostPropertyModal isLoggedIn={isLoggedIn} />
            </div>
           <Suspense fallback={<MyPropertySkeleton />}>
             <MyPropertyList/>
           </Suspense>
        </Card>
    );
};

export default MyPropertiesPage;