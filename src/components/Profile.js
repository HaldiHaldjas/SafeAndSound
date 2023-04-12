import React, {useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../config/firebase";
import {Link, useLocation} from 'react-router-dom';
import Button from "@mui/material/Button";
import { useNavigate} from "react-router-dom";


export default function Profile() {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location?.state?.email;
    const isSignedIn = location.state?.isSignedIn;
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState(0)
    const [profilePic, setProfilePic] = useState("")
    const [isUserDriver, setIsUserDriver] = useState(false)
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")


    const getUserDocument = async () => {
        try {
            const q = query(collection(database, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("User not found, please register.");
            } else {
                console.log(querySnapshot.docs[0].data())
                const userData = querySnapshot.docs[0].data();
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setPhone(userData.phone)
                setProfilePic(userData.profile_pic)
                setIsUserDriver(userData.driver)
                setLicencePlate(userData.licence_plate)
                setLicencePic(userData.driving_licence_pic)

            }
        } catch (err) {
            console.error(err);
        }
    };
    getUserDocument()
        .then()

    const toRequest = () => {
        navigate("/request", { state: { email: email, isSignedIn: true } });
    }

    const toOffer = () => {
        navigate("/offer", { state: { email: email, isSignedIn: true } });
    }

    const toSeeOffers = () => {
        navigate("/seeOffers", { state: { email: email, isSignedIn: true } });
    }

    const toSeeRequests = () => {
        navigate("/seerequests", { state: { email: email, isSignedIn: true } });
    }



    return (
        <div style={{
            display: "flex",
            alignItems: "center"
            }}>
            {isSignedIn && (
                <div
                    style={{
                        width: "50%",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "20px",
                        marginTop: "40px",
                        marginLeft: "40px"
                    }}
                >
                    <h1>Welcome, {firstName}!</h1>
                    <img src={profilePic} />
                    <p>First name: {firstName}</p>
                    <p>Last name: {lastName}</p>
                    <p>E-mail: {email}</p>
                    <p>Phone: {phone}</p>
                    {isUserDriver && (
                        <>
                            <p>Licence plate: {licencePlate}</p>
                            <img src= {licencePic} />
                        </>
                    )}
                </div>
            )}
            <div style={{
                width: "50%" }}>
                {isSignedIn && (
                    <>
                        {isUserDriver && (
                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: 'monospace',
                                    backgroundColor: "#774e3f",
                                    "&:hover": {
                                        backgroundColor: "#ccada2",
                                        color: "#3e2723",
                                    },
                                    width: "180px",
                                    height: "40px"

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
                                backgroundColor: "#774e3f",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "180px",
                                height: "40px"
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
                                backgroundColor: "#774e3f",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "180px",
                                height: "40px"

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
                                backgroundColor: "#774e3f",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                                width: "180px",
                                height: "40px"

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
