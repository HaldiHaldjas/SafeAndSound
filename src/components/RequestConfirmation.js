import React from 'react';
import { useLocation } from 'react-router-dom';
import img2 from "../images/img2.jpg";

function RequestConfirmation() {
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    // console.log(selectedRequest)

    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${img2})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
            <h3>Your selected request:</h3>
            <p>Date: {selectedRequest.date}</p>
            <p>From: {selectedRequest.from && selectedRequest.from.address}</p>
            <p>To: {selectedRequest.to && selectedRequest.to.address}</p>
            <p>Starting time: {selectedRequest.timeframe_1}</p>
            <p>Latest arrival: {selectedRequest.timeframe_2}</p>
            <p>Number of the spots: {selectedRequest.needed_spots}</p>
            <p>User's profile: some information</p>
                <p>Verification code: {selectedRequest.randomId}</p>
        </div>
        </div>
    );
}
export default RequestConfirmation;
