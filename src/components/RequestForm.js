import React, {useState, useRef, useEffect} from "react";
import {addDoc, collection, doc, getDoc} from "firebase/firestore";
import { database } from "../config/firebase";
import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { googleMapsApiKey } from "../config/config";
import { useNavigate} from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import '../App.css'
import img13 from "../images/img13.jpg";



export default function RequestForm() {

    const navigate = useNavigate();
    const location = useLocation();
    const isSignedIn = location.state?.isSignedIn;
    const userId = location.state?.userId;
    const [userData, setUserData] = useState(null)
    const [date, setDate] = useState("")
    const [placeToStart, setPlaceToStart] = useState("")
    const [placeToGo, setPlaceToGo] = useState("")
    const [timeToGo, setTimeToGo] = useState("")
    const [timeToArrive, setTimeToArrive] = useState(0)
    const [neededSpots, setNeededSpots] = useState(false)
    const [submitRequest, setSubmitRequest] = useState(false)
    //const [seeDriveHistory, setSeeDriveHistory] = useState(false)
    const placeToStartRef = useRef(null);
    const placeToGoRef = useRef(null);

    const requestsCollectionRef = collection(database, "requests") // see users requests collection from database

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    const handleRequest = async () => {
        // random id-generator
        let randomId = generateString(5)

        try {
            await addDoc(requestsCollectionRef, {
                day: date,
                from: placeToStart,
                to: placeToGo,
                timeframe_1: timeToGo,
                timeframe_2: timeToArrive,
                needed_spots: neededSpots,
                randomId: randomId,
                userId: userId,
                user_first_name: userData.first_name,
                user_last_name: userData.last_name,
                user_email: userData.email,
                user_phone: userData.phone,
                user_profile_pic: userData.profile_pic,
                user_licence_plate: userData.licence_plate,
                user_licence_Pic: userData.driving_licence_pic,

            });
            document.getElementById("RequestForm").reset();
            setSubmitRequest(true);


        } catch (err) {
            console.error(err)
        }
    }

    const handlePlaceToStartSelect = () => {
        const place = placeToStartRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToStart(place.formatted_address);
    }

    const handlePlaceToGoSelect = () => {
        const place = placeToGoRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToGo(place.formatted_address);
    };


    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserDocument(userId);
    },[]);

    const toProfile = () => {
        navigate("/profile", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeOffers = () => {
        navigate("/seeOffers", { state: { userId: userId, isSignedIn: true } });
    }

    const toSeeRequests = () => {
        navigate("/seerequests", { state: { userId: userId, isSignedIn: true } });
    }


    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${img13})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"

        }}>
            <div
                style={{
                    width: "45%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                    <form id="RequestForm">
                        <h3>Do you need a ride? Insert your request here:</h3>
                        <label style={{ fontSize: "12px" }}>Date of the ride:</label>
                        <input type="date" placeholder="Day" onChange={(e) => setDate(e.target.value)}/>

                        <LoadScript
                            googleMapsApiKey={googleMapsApiKey}
                            libraries={['places']}
                        >
                        <Autocomplete
                            onLoad={(ref) =>  placeToStartRef.current = ref}
                            onPlaceChanged={handlePlaceToStartSelect}
                            options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                        >
                            <input type="text" placeholder="Starting point*" />
                        </Autocomplete>

                        <Autocomplete
                            onLoad={(ref) => placeToGoRef.current = ref}
                            onPlaceChanged={handlePlaceToGoSelect}
                            options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
                        >
                            <input type="text" placeholder="Endpoint*" />
                        </Autocomplete>
                        </LoadScript>
                        <label style={{ fontSize: "12px" }}>What time do you need the ride? Please choose the earliest starting time:</label>
                        <input
                            type="time"
                            placeholder="Departure time*"
                            onChange={(e) => setTimeToGo(e.target.value)}/><br />
                        <label style={{ fontSize: "12px" }}>And the latest time of arrival:</label>
                        <input
                            type="time"
                            placeholder="Time of arrival*"
                            onChange={(e) => setTimeToArrive(e.target.value)}/><br />
                        <label style={{ fontSize: "12px" }}>How many people need the ride? Insert the number:</label>
                        <input
                            type="number"
                            placeholder="*"
                            min="1"
                            max="9"
                            style={{width: "20px"}}
                            onChange={(e) => setNeededSpots(Number(e.target.value))}/><br />

                        <Button variant="contained"

                                onClick={handleRequest}
                        > Submit </Button>
                        <br />
                        {submitRequest &&
                            <CheckIcon
                                sx={{color: "green",
                                    marginBottom: "-5px",
                                    marginLeft: "10px"}}></CheckIcon>}
                    </form>
                    </div>
                    <div style={{
                        width: "50%" }}>
                         <Button
                             variant="contained"
                             onClick={toProfile}>
                             Go to profile
                         </Button>
                        <br /><br />
                        <Button variant="contained"

                            // onClick={(e) => {setSeeDriveHistory} Go to my profile previous drives page (e.target.value)}
                        > Previous drives </Button>
                        <br /><br />
                        <Button
                            variant="contained"

                            onClick={toSeeOffers}
                        >
                            All offers
                        </Button>
                        <br /><br />
                        <Button
                            variant="contained"

                            onClick={toSeeRequests}
                        >
                            All requests
                        </Button>

                </div>
        </div>
    )
}