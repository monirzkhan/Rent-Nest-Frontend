'use server';

import { cookies } from 'next/headers';

export async function confirmPayment(rentalRequestId: string) {
    console.log(rentalRequestId , "from Confirm actions");
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        return { success: false, message: 'You must be logged in to confirm a payment.' };
    }

    //Get Payments Details
     const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/payments`,
        {
            cache: "no-store",
            headers: {
                Cookie: cookieStore.toString(),
            },
        }
    );
    const payments = await res.json();
    const sessionIdArray=payments.data.filter((s: any)=>s.rentalRequestId===rentalRequestId)
    const sessionId=sessionIdArray[0].transactionId;
     if (!sessionId) {
        return { success: false, message: 'SessionId Not Found' };
    }

    //Confirm Payment
    const baseUrl = process.env.BACKEND_API_URL || 'https://rentnest-seven.vercel.app';
    const endpoints = [`${baseUrl}/api/payments/confirm`, `${baseUrl}/api/payments/confirm`];

    for (const endpoint of endpoints) {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ sessionId }),
            });

            const result = await res.json();

            if (res.ok) {
                return { success: true, ...result };
            }

            if (res.status !== 404) {
                return { success: false, message: result?.message || 'Failed to confirm payment.' };
            }
        } catch (error: any) {
            return { success: false, message: error.message || 'Something went wrong' };
        }
    }

    return { success: false, message: 'Failed to confirm payment.' };
}
