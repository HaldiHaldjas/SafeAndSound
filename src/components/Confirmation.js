import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import img2 from "../images/img2.jpg";

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
                <h3>Your selected offer:</h3>
                <p>From: {selectedOffer.from && selectedOffer.from.address}</p>
                <p>To: {selectedOffer.to && selectedOffer.to.address}</p>
                <p>Starting time: {selectedOffer.timeframe_1}</p>
                <p>Latest arrival:: {selectedOffer.timeframe_2}</p>
                <p>Number of free spots: {selectedOffer.free_spots}</p>
                <p>Price: {selectedOffer.price}€</p>
                <p>Verification code: {selectedOffer.randomId}</p>
                </div>
            <div
                style={{
                    width: "20%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>

                    <img src={driverPic}></img>
                    <p>Driver's name: {driverFirstName} {driverLastName} </p>
                    <p>Driver's phone: {driverPhone}</p>
                    <Button
                        variant="contained"
                        onClick={toProfile}>
                        Driver's profile
                    </Button>
            </div>
        </div>
    );
}
export default Confirmation;
