import React from 'react';
import ReviewForm from '../_components/reviewForm';

const ReviewPage = () => {
    return (
        <div className='w-11/12 mx-auto space-y-4'>
            <h1>Go to Payment Page Payment Page to write your review </h1>
            <ReviewForm propertyId="propertyId"></ReviewForm>
        </div>
    );
};

export default ReviewPage;