import React from 'react';

const DynamicPropertyPageLandlord = ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    return (
        <div>
            <h1>Dynamic Property Page</h1>
        </div>
    );
};

export default DynamicPropertyPageLandlord;