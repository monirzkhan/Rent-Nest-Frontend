'use server';

import { cookies } from 'next/headers';

export async function deletePropertyAction(data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to delete a property.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/landlord/properties/${data.id}`, `${baseUrl}/api/properties/${data.id}`];

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (res.ok) {
                return { success: true, ...result };
            }

            if (res.status !== 404) {
                return { success: false, message: result?.message || 'Failed to delete property.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to delete property.' };
}
