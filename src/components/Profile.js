import React, {useEffect, useState} from "react";
import { doc, getDoc } from "firebase/firestore";
import {database} from "../config/firebase";
import {useLocation} from 'react-router-dom';
import Button from "@mui/material/Button";
import { useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditProfileDialog from "./EditProfileDialog";
import img11 from "../images/img11.jpg";
import '../App.css'



export default function Profile() {

    const navigate = useNavigate();
    const location = useLocation();
    const userId = location?.state?.userId;
    const isSignedIn = location.state?.isSignedIn;
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [profilePic, setProfilePic] = useState("")
    const [isUserDriver, setIsUserDriver] = useState(false)
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")
    const [open, setOpen] = useState(false)


    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setPhone(userData.phone)
                setProfilePic(userData.profile_pic)
                setIsUserDriver(userData.driver)
                setLicencePlate(userData.licence_plate)
                setLicencePic(userData.driving_licence_pic)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };

    getUserDocument()
        .then()

    const editProfile = () => {
        setOpen(true)
        navigate("/profile/edit", { state:
                {
                    profilePic: profilePic,
                    userId: userId,
                    isSignedIn: true,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    licencePlate: licencePlate,
                    isUserDriver: isUserDriver
                } });
    }


    const toRequest = () => {
        navigate("/request", { state: { userId: userId, isSignedIn: true } });
    }

    const toOffer = () => {
        navigate("/offer", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeOffers = () => {
        navigate("/seeOffers", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeOffers1 = () => {
        navigate("/seeOffers1", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeOffers2 = () => {
        navigate("/seeOffers2", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeRequests = () => {
        navigate("/seerequests", { state: { userId: userId, isSignedIn: true } });
    }

    function handleClose() {
        setOpen(false)
    }
    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${img11})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
            }}>

            {isSignedIn && (
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
                    <img src={profilePic} />
                    <h1>{firstName} {lastName}</h1>

                    <p>E-mail: {email}</p>
                    <p>Phone: {phone}</p>
                    {isUserDriver && (
                        <>
                            <p>Licence plate: {licencePlate}</p>
                            <label>Driving licence:</label><br />
                            <img src={licencePic} />
                        </>
                    )}
                    <br />
                    <Button
                        variant="contained"
                        sx={{
                            marginTop: "10px",
                            fontFamily: 'monospace',
                            backgroundColor: "#774e3f",
                            "&:hover": {
                                backgroundColor: "#ccada2",
                                color: "#3e2723",
                            },
                            width: "80px",
                            height: "40px",
                            fontWeight: 'bold',
                            borderWidth: '2px',
                        }}
                        onClick={editProfile}
                    >
                        Edit
                    </Button>
                </div>
            )}
            <div style={{
                width: "10%",
                position: "absolute",
                top: "20%",
                right: "10%",
            }}>
                {isSignedIn && (
                    <>
                        {isUserDriver && (
                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: 'monospace',
                                    backgroundColor: "#896c63",
                                    "&:hover": {
                                        backgroundColor: "#ccada2",
                                        color: "#3e2723",
                                    },
                                    width: "200px",
                                    height: "40px",
                                    fontWeight: 'bold',
                                    borderWidth: '2px',
                                }}
                                onClick={toOffer}
                            >
                                Insert an offer
                            </Button>
                        )}
                        <br /><br />
                        <Button
                            variant="contained"
                            sx={{
                                fontFamily: 'monospace',
                                backgroundColor: "#896c63",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "200px",
                                height: "40px",
                                fontWeight: 'bold',
                                borderWidth: '2px',
                                }}
                            onClick={toRequest}
                        >
                            Insert a request
                        </Button>
                        <br /><br />
                        <Button
                            variant="contained"
                            sx={{
                                fontFamily: 'monospace',
                                backgroundColor: "#896c63",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "200px",
                                height: "40px",
                                fontWeight: 'bold',
                                borderWidth: '2px',
                            }}
                            onClick={toSeeOffers}
                        >
                            All offers
                        </Button>
                        <br /><br />
                        <Button
                            variant="contained"
                            sx={{
                                fontFamily: 'monospace',
                                backgroundColor: "#896c63",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "200px",
                                height: "40px",
                                fontWeight: 'bold',
                                borderWidth: '2px',
                            }}
                            onClick={toSeeRequests}
                        >
                            All requests
                        </Button>
                    </>
                )}
            </div>
        </div>
    );

}
