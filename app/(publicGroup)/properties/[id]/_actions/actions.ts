'use server';

import { cookies } from "next/headers";

export async function createRentalRequest(data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    // console.log(data);

    if (!token) {
        return { success: false, message: 'You must be logged in to request for rent.' };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app'}/api/rentals`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        return { success: false, message: error.message || 'Something went wrong' };
    }
}
