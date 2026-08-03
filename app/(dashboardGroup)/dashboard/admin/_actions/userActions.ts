'use server';

import { cookies } from 'next/headers';

export async function GetAllUsersAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to get all users.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/admin/users`, `${baseUrl}/api/admin/users`];

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                
            });

            const result = await res.json();

            if (res.ok) {
                return { success: true, ...result };
            }

            if (res.status !== 404) {
                return { success: false, message: result?.message || 'Failed to Get all users.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to Get all users.' };
}

export async function UpdateUsersStatus(id:string, activeStatus:string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to update user status.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/admin/users/${id}`, `${baseUrl}/api/admin/users/${id}`];

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ activeStatus }),
            });

            const result = await res.json();

            if (res.ok) {
                return { success: true, ...result };
            }

            if (res.status !== 404) {
                return { success: false, message: result?.message || 'Failed to update users active status.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to update users active status.' };
}
