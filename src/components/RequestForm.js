import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { googleMapsApiKey } from "../config/config";
import Profile from "./Profile";




export default function RequestForm() {

    const [date, setDate] = useState("")
    const [placeToStart, setPlaceToStart] = useState("")
    const [placeToGo, setPlaceToGo] = useState("")
    const [timeToGo, setTimeToGo] = useState("")
    const [timeToArrive, setTimeToArrive] = useState(0)
    const [neededSpots, setNeededSpots] = useState(false)
    // const [price, setPrice] = useState("");
    const [submitRequest, setSubmitRequest] = useState("")
    const [seeDriveHistory, setSeeDriveHistory] = useState(false)
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
                date: date,
                from: placeToStart,
                to: placeToGo,
                timeframe_1: timeToGo,
                timeframe_2: timeToArrive,
                needed_spots: neededSpots,
                randomId: randomId

            });
            setSubmitRequest(true)
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
        setPlaceToStart({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
        });
    }

    const handlePlaceToGoSelect = () => {
        const place = placeToGoRef.current.getPlace();
        if (!place || !place.geometry) {
            console.error('Invalid place object:', place);
            return;
        }
        setPlaceToGo({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
        });
    };

    console.log(placeToStart)
    console.log(placeToGo)
    return (

        <div>
            <h3>Where do you want to go? Insert request</h3>
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
                <input type="text" placeholder="From" />
            </Autocomplete>

            <Autocomplete
                onLoad={(ref) => placeToGoRef.current = ref}
                onPlaceChanged={handlePlaceToGoSelect}
                options={{ componentRestrictions: { country: "ee" }, types: ["(regions)"] }}
            >
                <input type="text" placeholder="To" />
            </Autocomplete>
            </LoadScript>
            <input type="time" placeholder="Departure time" onChange={(e) => setTimeToGo(e.target.value)}/><br />
            <input type="time" placeholder="ETA - estimated arrival time" onChange={(e) => setTimeToArrive(e.target.value)}/><br />
            <input type="number" placeholder="Needed spots" type="number"onChange={(e) => setNeededSpots(Number(e.target.value))}/><br />
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
                    onClick={Profile}
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
                 <Button><Link to="/" >Go back to signing in</Link></Button>

                <Button><Link to="/">Back</Link></Button>
            }
        </div>
    )
}