import React from 'react';
import { GetAllUsersAction } from '../_actions/userActions';
import { Card } from '@/components/ui/card';
import { UsersTable } from './usersTable';

const UsersList = async () => {
    const users = await GetAllUsersAction()

    if (!users || !users.data || users.data.length === 0) {
        return (
            <Card className="mx-auto mt-4 flex w-11/12 flex-col gap-4 p-2">

                <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 text-lg">No Users found.</p>
                </div>
            </Card>
        );
    }
    return (
        <Card className=" w-11/12 mx-auto">
           
                <UsersTable users={users} />
            
        </Card>
    );
}

    export default UsersList;