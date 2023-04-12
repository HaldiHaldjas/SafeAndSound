import React from 'react';
import { useLocation } from 'react-router-dom';

function RequestConfirmation() {
    const location = useLocation();
    const checkedRequest = location?.state?.checkedRequests;
    console.log(checkedRequest)

    return (
        <div>
            <h3>Selected request:</h3>
            <p>From: {checkedRequest.from && checkedRequest.from.address}</p>
            <p>To: {checkedRequest.to && checkedRequest.to.address}</p>
            <p>Timeframe 1: {checkedRequest.timeframe_1}</p>
            <p>Timeframe 2: {checkedRequest.timeframe_2}</p>
            <p>Free spots: {checkedRequest.needed_spots}</p>
            {/*<p>Price: {checkedRequest.price}</p>*/}
            <p>Verification code: {checkedRequest.verif_code}</p>
        </div>
    );
}
export default RequestConfirmation;
