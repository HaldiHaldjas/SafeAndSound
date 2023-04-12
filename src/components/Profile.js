import React, {useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../config/firebase";
import {Link, useLocation} from 'react-router-dom';
import Button from "@mui/material/Button";
import { useNavigate} from "react-router-dom";


export default function Profile() {

    const navigate = useNavigate();
    const location = useLocation();
    let email = location?.state?.email;
    console.log(email)
    let isSignedIn = location.state?.isSignedIn;
    console.log(isSignedIn)
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

    const toSeeOffers = () => {
        navigate("/request", { state: { email: email, isSignedIn: true } });
    }

    const toSeeRequests = () => {
        navigate("/request", { state: { email: email, isSignedIn: true } });
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
                            <p>Licence picture: {licencePic}</p>
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
                                    backgroundColor: "#add8e6",
                                    "&:hover": {
                                        backgroundColor: "#fff",
                                        color: "#3c52b2",
                                    },
                                    width: "180px",
                                    height: "40px"

                                }}
                            >
                                <Link to="/offer">Insert an offer</Link>
                            </Button>
                        )}
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
                            onClick={toRequest}
                        >
                            Insert a request
                        </Button>
                        <br /><br />
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
                            onClick={toSeeOffers}
                        >
                            All offers
                        </Button>
                        <br /><br />
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
