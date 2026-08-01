import { Card } from '@/components/ui/card';
import { cookies } from 'next/headers';
import React from 'react';
import { PaymentCard } from '../_components/paymentCard';

const MyPaymentPage = async() => {
     const cookieStore = await cookies();
    
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
    return (
          <div className='w-11/12 mx-auto '>
            <Card>
                <div className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-amber-400 text-black'>
                    <h1 className='text-2xl font-semibold text-center'>My Payments</h1>
                </div>
                <div>
                    {
                        payments.data.map((payment: any) => (
                            <PaymentCard key={payment.id} payment={payment}></PaymentCard>
                        ))
                    }
                </div>
            </Card>
        </div>
    );
};

export default MyPaymentPage;