import React from 'react';
import { useLocation } from 'react-router-dom';

function RequestConfirmation() {
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    // console.log(selectedRequest)

    return (
        <div>
            <h3>Selected request:</h3>
            <p>Verification code: {selectedRequest.randomId}</p>
            <p>Date: {selectedRequest.date}</p>
            <p>From: {selectedRequest.from && selectedRequest.from.address}</p>
            <p>To: {selectedRequest.to && selectedRequest.to.address}</p>
            <p>Time to leave: {selectedRequest.timeframe_1}</p>
            <p>Time to arrive: {selectedRequest.timeframe_2}</p>
            <p>Needed spots: {selectedRequest.needed_spots}</p>
            <p>User's profile: some information</p>
        </div>
    );
}
export default RequestConfirmation;
