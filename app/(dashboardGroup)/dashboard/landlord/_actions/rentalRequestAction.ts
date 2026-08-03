'use server';

import { cookies } from 'next/headers';

export async function getRentalRequestsAction() {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to get rental requests.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/landlord/requests`, `${baseUrl}/api/requests`];

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
                return { success: false, message: result?.message || 'Failed to Get rental requests.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to Get rental requests.' };
}
export async function UpdateRentalRequestsStatusAction(id:string, status:string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to update rental request status.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/landlord/requests/${id}`, `${baseUrl}/api/requests/${id}`];

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            const result = await res.json();

            if (res.ok) {
                return { success: true, ...result };
            }

            if (res.status !== 404) {
                return { success: false, message: result?.message || 'Failed to update rental requests status.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to update rental request status.' };
}

//Admin
export async function getRentalRequestsActionAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to get rental requests.' };
    }

    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/admin/rentals`, `${baseUrl}/api/admin/rentals`];

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
                return { success: false, message: result?.message || 'Failed to Get rental requests.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to Get rental requests.' };
}