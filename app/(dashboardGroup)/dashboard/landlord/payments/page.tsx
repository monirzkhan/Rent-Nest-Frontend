import React, { Suspense } from 'react';
import MyPaymentPage from '../../tenant/myPayment/page';
import { PaymentSkelaton } from '../_components/paymentSkelaton';

const LandlordPaymentPage = () => {
    return (
        <div>
            <Suspense fallback={<PaymentSkelaton />}> 
            <MyPaymentPage />
            </Suspense>
        </div>
    );
};

export default LandlordPaymentPage;