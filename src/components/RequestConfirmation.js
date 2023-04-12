import React from 'react';
import { useLocation } from 'react-router-dom';

function RequestConfirmation() {
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    console.log(selectedRequest)

    return (
        <div>
            <h3>Selected request:</h3>
            <p>From: {selectedRequest.from && selectedRequest.from.address}</p>
            <p>To: {selectedRequest.to && selectedRequest.to.address}</p>
            <p>Timeframe 1: {selectedRequest.timeframe_1}</p>
            <p>Timeframe 2: {selectedRequest.timeframe_2}</p>
            <p>Free spots: {selectedRequest.needed_spots}</p>
            {/*<p>Price: {checkedRequest.price}</p>*/}
            <p>Verification code: {selectedRequest.randomId}</p>
        </div>
    );
}
export default RequestConfirmation;
