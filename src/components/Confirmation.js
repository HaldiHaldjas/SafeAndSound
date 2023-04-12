import React from 'react';
import { useLocation } from 'react-router-dom';

function Confirmation() {
    const location = useLocation();
    const selectedOffer = location?.state?.selectedOffer;
    console.log(selectedOffer)

    return (
        <div>
            <h3>Selected offer:</h3>
            <p>From: {selectedOffer.from && selectedOffer.from.address}</p>
            <p>To: {selectedOffer.to && selectedOffer.to.address}</p>
            <p>Timeframe 1: {selectedOffer.timeframe_1}</p>
            <p>Timeframe 2: {selectedOffer.timeframe_2}</p>
            <p>Free spots: {selectedOffer.free_spots}</p>
            <p>Price: {selectedOffer.price}€</p>
            <p>Verification code: {selectedOffer.verif_code}</p>
        </div>
    );
}
export default Confirmation;
