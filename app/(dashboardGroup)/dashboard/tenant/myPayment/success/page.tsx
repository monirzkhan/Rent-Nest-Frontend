import { Card } from '@/components/ui/card';
import { ArrowRightCircle, CheckCircle2Icon, LucideArrowRightCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const PaymentSuccessPage = () => {
    return (
        <Card className='w-11/12 mx-auto rounded-lg py-4 px-8 bg-green-400 text-white space-y-4 text-center'>
            <CheckCircle2Icon className='w-16 h-16 mx-auto text-green-200' />
            <h1 className='text-2xl font-semibold text-center'> 
                Payment Successful</h1>
            <p className='text-center'>Thank you for your payment. Your transaction has been completed successfully.</p>
            <Link href="/dashboard/tenant/myPayment" className='w-full md:w-auto bg-primary text-white py-2 px-4 rounded-lg block text-center'>Payment History</Link>
        </Card>
    );
};

export default PaymentSuccessPage;