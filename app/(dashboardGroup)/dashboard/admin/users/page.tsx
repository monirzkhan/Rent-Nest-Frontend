import { Card } from '@/components/ui/card';
import React, { Suspense } from 'react';
import { UsersListSkelaton } from '../_components/userListSkelaton';
import UsersList from '../_components/usersList';

const AdminUsersPage = () => {
    return (
        <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">
            <Card className="rounded-lg bg-linear-to-r from-green-500 to-emerald-500 md:p-4 p-1  text-center text-primary-foreground">
                <h1 className="text-xl font-bold">Manage Users</h1>
            </Card>
            
           <Suspense fallback={<UsersListSkelaton />}>
             <UsersList/>
           </Suspense>
        </Card>
    );
};

export default AdminUsersPage;