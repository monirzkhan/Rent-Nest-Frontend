import { Card } from '@/components/ui/card';
import { CircleMinus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PaymentCancelPage = () => {
    return (
      <Card className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-red-400 text-white space-y-4 text-center'>
            <CircleMinus className='w-16 h-16 mx-auto text-red-200' />
            <h1 className='text-2xl font-semibold text-center'> 
                Payment Cancelled</h1>
            <p className='text-center'>Your payment has been cancelled.</p>
            <Link href="/dashboard/tenant/myPayment" className='w-full md:w-auto bg-primary text-white py-2 px-4 rounded-lg block text-center'>Payment History</Link>
        </Card>
    );
};

export default PaymentCancelPage;