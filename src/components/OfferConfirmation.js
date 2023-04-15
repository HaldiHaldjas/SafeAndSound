import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import { database } from "../config/firebase";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import img2 from "../images/img2.jpg";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import ProfileDialog from "./ProfileDialog";
import DialogActions from "@mui/material/DialogActions";

function OfferConfirmation() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedOffer = location?.state?.selectedOffer;
    const [driverPic, setDriverPic] = useState("")
    const [driverData, setDriverData] = useState("")
    const [open, setOpen] = useState(false)
    const [selectedDriverId, setSelectedDriverId] = useState("")





    const getUserDocument = async () => {
        try {
            const q = query(collection(database, "offers"),
                where("randomId", "==", selectedOffer.randomId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("User not found, please register.");
            } else {
                const dataRef= querySnapshot.docs[0].data()
                setDriverData(dataRef)

            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getUserDocument();
        }, [])

    function handleClose() {
        setOpen(false) // false at the beginning and false when closed
    }

    function showUserInfo(userId) {

        setSelectedDriverId(userId)
        setOpen(true)
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
                <p>Date: {selectedOffer.day}</p>
                <p>From: {selectedOffer.from}</p>
                <p>To: {selectedOffer.to}</p>
                <p>Starting time: {selectedOffer.timeframe_1}</p>
                <p>Latest arrival:: {selectedOffer.timeframe_2}</p>
                <p>Number of free spots: {selectedOffer.needed_spots}</p>
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

                    <img src={driverData.user_profile_pic}></img>
                    <p>Driver's name: {driverData.user_first_name} {driverData.user_last_name} </p>
                    <p>Driver's phone: {driverData.user_phone}</p>
                    <Button
                        variant="contained"
                        onClick={() => {
                            showUserInfo(driverData.userId)}}
                        >
                        Driver's profile
                    </Button>

                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    fullWidth={true}
                    open={open}
                    PaperProps={{
                        style: {
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            borderRadius: "20px",
                            padding: "25px",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "500px"
                        }
                    }}
                >
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        User info
                    </DialogTitle>
                    <DialogContent
                        style={{
                            width: "900px",
                            marginLeft: "200px"
                        }}
                    >
                        <ProfileDialog
                            userId={selectedDriverId} isSignedIn="true"/>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
export default OfferConfirmation;
