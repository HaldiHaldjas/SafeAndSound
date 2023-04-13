import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Confirmation() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedOffer = location?.state?.selectedOffer;
    const [driverFirstName, setDriverFirstName] = useState("")
    const [driverLastName, setDriverLastName] = useState("")
    const [driverPhone, setDriverPhone] = useState(0)
    const [driverPic, setDriverPic] = useState("")

    const userId = selectedOffer.userId;

    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setDriverFirstName(userData.first_name)
                setDriverLastName(userData.last_name)
                setDriverPhone(userData.phone)
                setDriverPic(userData.profile_pic)
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
            display: "flex",
            alignItems: "center"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    padding: "20px",
                    marginTop: "40px",
                    marginLeft: "40px"
                }}>
                <h3>Selected offer:</h3>
                <p>From: {selectedOffer.from && selectedOffer.from.address}</p>
                <p>To: {selectedOffer.to && selectedOffer.to.address}</p>
                <p>Timeframe 1: {selectedOffer.timeframe_1}</p>
                <p>Timeframe 2: {selectedOffer.timeframe_2}</p>
                <p>Free spots: {selectedOffer.free_spots}</p>
                <p>Price: {selectedOffer.price}</p>
                <p>Verification code: {selectedOffer.randomId}</p>
                </div>
            <div style={{
                width: "50%" }}>

                    <img src={driverPic}></img>
                    <p>Driver's name: {driverFirstName} {driverLastName} </p>
                    <p>Driver's phone: {driverPhone}</p>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#add8e6",
                            "&:hover": {
                                backgroundColor: "#fff",
                                color: "#3c52b2",
                            },
                            width: "180px",
                            height: "40px"

                        }}
                        onClick={toProfile}>
                        Driver's profile
                    </Button>
            </div>
        </div>
    );
}
export default Confirmation;
