import React, { useState } from "react";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {database} from "../config/firebase";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import {GoogleApiWrapper} from "google-maps-react";

function RequestForm() {

    const { google } = window;

    const [date, setDate] = useState("")
    const [placeToStart, setPlaceToStart] = useState({
        Latitude: null,
        Longitude: null
    });
    const [placeToGo, setPlaceToGo] = useState({
        Latitude: null,
        Longitude: null
    });
    const [timeToGo, setTimeToGo] = useState("")
    const [timeToArrive, setTimeToArrive] = useState(0)
    const [freeSpots, setFreeSpots] = useState(false)
    const [submitRequest, setSubmitRequest] = useState("")
    const [seeDriveHistory, setSeeDriveHistory] = useState(false)

    const requestsCollectionRef = collection(database, "requests") // see users requests collection from database

    const handleRequest = async () => {
        try {
            const geocoder = new google.maps.Geocoder();
            const startRequest = { address: placeToStart };
            const endRequest = { address: placeToGo };
            geocoder.geocode(startRequest, (startResults, startStatus) => {
                if (startStatus === google.maps.GeocoderStatus.OK) {
                    const startLocation = startResults[0].geometry.location;
                    console.log(startLocation.lat());
                    geocoder.geocode(endRequest, (endResults, endStatus) => {
                        if (endStatus === google.maps.GeocoderStatus.OK) {
                            const endLocation = endResults[0].geometry.location;
                            addDoc(requestsCollectionRef, {
                                day: date,
                                from: {Latitude: startLocation.lat(), Longitude: startLocation.lng()},
                                to: {Latitude: endLocation.lat(), Longitude: endLocation.lng()},
                                timeframe_1: timeToGo,
                                timeframe_2: timeToArrive,
                                needed_spots: freeSpots,
                            }).then(() => {
                                setSubmitRequest(true);
                            }).catch((error) => {
                                console.error(error);
                            });
                        } else {
                            console.error('Geocode was not successful for the following reason: ' + endStatus);
                        }
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + startStatus);
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handlePlaceToStartSelect = (place) => {
        if (place) {
            console.log(place)

            const address = place.formatted_address;
            console.log(address)
            setPlaceToStart(address);
        } else {
            // handle the case when place is not defined or is null
        }
    };




    const handlePlaceToGoSelect = (place) => {
        if (place) {
            const address = place.formatted_address;
            console.log(address)
            setPlaceToGo(address);
        } else {
            // handle the case when place is not defined or is null
        }
    };


    return (

        <div>
            <h3>Where do you want to go? Insert request</h3>
            <input type="date" placeholder="Day" onChange={(e) => setDate(e.target.value)}/>
            <Autocomplete
                onLoad={(autocomplete) => console.log("autocomplete: ", autocomplete)}
                onPlaceChanged={handlePlaceToStartSelect}
                options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
            >
                <input type="text" placeholder="From" />
            </Autocomplete>

            <Autocomplete
                onLoad={(autocomplete) => console.log("autocomplete: ", autocomplete)}
                onPlaceChanged={handlePlaceToGoSelect}
                options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
            >
                <input type="text" placeholder="To" />
            </Autocomplete>
            <input type="time" placeholder="Departure time" onChange={(e) => setTimeToGo(e.target.value)}/><br />
            <input type="time" placeholder="ETA - estimated arrival time" onChange={(e) => setTimeToArrive(e.target.value)}/><br />
            <input type="number" placeholder="Free spots" type="number"onChange={(e) => setFreeSpots(Number(e.target.value))}/><br />
            {/*<input placeholder="Price" type="number"onChange={(e) => setPrice(Number(e.target.value))}/><br />*/}

            <Button variant="contained"
                    sx={{backgroundColor: "#add8e6",
                '&:hover': {
                    backgroundColor: '#fff',
                    color: '#3c52b2',}}}
                    onClick={handleRequest}
            > Submit </Button>
            <Button variant="contained"
                    sx={{backgroundColor: "#add8e6",
                '&:hover': {
                    backgroundColor: '#fff',
                    color: '#3c52b2',}}}
                    // onClick={(e) => Open Profile page (e.target.value)}
            > My profile </Button>
            <Button variant="contained"
                    sx={{backgroundColor: "#add8e6",
                        '&:hover': {
                            backgroundColor: '#fff',
                            color: '#3c52b2',}}}
                    // onClick={(e) => {setSeeDriveHistory} Go to my profile previous drives page (e.target.value)}
            > Previous drives </Button>
            <label>Home button?</label><br />
            <br />
             // what does this "/" mean?
                <Button><Link to="/" >Go back to signing in</Link></Button>

                <Button><Link to="/">Back</Link></Button>
            }
        </div>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDAjrgSjkzIiZj_OX2KnhdA5mWNLtWsalI'
})(RequestForm);