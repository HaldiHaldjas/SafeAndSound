import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import img14 from "../images/img14.jpg";

function RequestConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    // console.log(selectedRequest)
    const [passengerFirstName, setPassengerFirstName] = useState("")
    const [passengerLastName, setPassengerLastName] = useState("")
    const [passengerPhone, setPassengerPhone] = useState(0)
    const [passengerPic, setPassengerPic] = useState("")

    const userId = selectedRequest.userId;

    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setPassengerFirstName(userData.first_name)
                setPassengerLastName(userData.last_name)
                setPassengerPhone(userData.phone)
                setPassengerPic(userData.profile_pic)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };


    getUserDocument()
        .then()

    const toProfile = () => {
        navigate("/profile", { state: { userId: userId, isSignedIn: true } });
    }


    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${img14})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
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

                <img src={passengerPic}></img>
                <p>Passenger's name: {passengerFirstName} {passengerLastName} </p>
                <p>Passenger's phone: {passengerPhone}</p>
                <Button
                    variant="contained"
                    onClick={toProfile}>
                    Passenger's profile
                </Button>
        </div>
        </div>
    );
}
export default RequestConfirmation;
