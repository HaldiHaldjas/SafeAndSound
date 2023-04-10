
/!*See requests/offers
List of request/offers
aligned with a drivers profile with checkbox and submit button under
checkbox for using a request/offer -
Submit button
New search button
Home icon*!/

import React, {useState} from "react";
import {collection, doc, getDoc} from "firebase/firestore";
import {database} from "../config/firebase";
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Profile from "./Profile";
// import {Signin} from "./Signin";
// import { useLocation } from 'react-router-dom'; // where do we use user location?
// import { Auth } from "./auth";
// import { Link } from "react-router-dom";
// Next button is for seeing driver profile
// import Button from "@mui/material/Button";
// import checkbox from mui;

export default function SeeRequestsForm() {

    // const location = useLocation();
    // const userUid = location.state.userUid;
    // const usersCollectionRef = collection(database, "users")
    // const userProfile = collection(database, "users", possible userID)
    const [newDate, setNewDate] = useState("")
    const [newPlaceToStart, setNewPlaceToStart] = useState("")
    const [newPlaceToGo, setNewPlaceToGo] = useState("")
    const [newTimeToGo, setNewTimeToGo] = useState("")
    const [newTimeToArrive, setNewTimeToArrive] = useState(0)
    const [newFreeSpots, setNewFreeSpots] = useState(false)
    // const [newPrice, setNewPrice] = useState("");
    const [seeDriverProfile, setSeeDriverProfile] = useState(false)
    const [submitAccept, setSubmitAccept] = useState("")
    // const [requestPostition - järjekorranumber tabelis']
    const requestsRequestIdCollectionRef = collection(database, "requests") // see request list from database
    // function compareOffersAndRequests (if requestId.newPlaceToStart !== offerId.newPlaceToStart) => alert("Did not find any match! New search")
    // (if requestId.newPlaceToStart === offerId.newPlaceToStart) => {returns offerinfo(offerID), drivers profile link }
    // const retrieveDriverProfile = collection(database, "requestDriverProfile") // gets drivers profile from database

    console.log("Lähme sõidame!")

    const getRequestList = async (requestId) => {
        try {
            const requestRef = doc(database, "requests", requestId);
            const requestDoc = await getDoc(requestRef);
            if (requestDoc.exists()) {
                const requestData = requestDoc.data();
                console.log(requestData)
                setNewDate(requestData.date) // needs to added to database
                setNewPlaceToStart(requestData.first_name)
                setNewPlaceToGo(requestData.last_name)
                setNewTimeToGo(requestData.email)
                setNewTimeToArrive(requestData.phone)
                setNewFreeSpots(requestData.profile_pic)
                // setNewPrice(offerData.driver)
                setSeeDriverProfile(userData.last_name) // we could use a username here

            } else {
                console.log("We did not find any matching requests");
            }
        } catch (err) {
            console.error(err);
        }
    };

    /*return (
        <div>
            {/!*<p> {getRequestList} </p>*!/}

                <p><label>From: </label> {newPlaceToStart}</p>
            <p>Last name: {lastName}</p>
            <p>E-mail: {email}</p>
            <p>Phone: {phone}</p>
            <p>Profile picture: {profilePic}</p>
            {isUserDriver &&
                <>
                    <p>Licence plate: {licencePlate}</p>
                    <p>Licence picture: {licencePic}</p>
                </>
            }*!/}
        </div>

    )*/
}



const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'from', headerName: 'Place to start', width: 130 }, // type coordinates
    { field: 'to', headerName: 'Place to go', width: 130 }, // type coordinates
    { field: 'leaving', headerName: 'Time to leave', width: 70 }, // type time
    { field: 'arriving', headerName: 'Time to arrive', width: 70 }, // type time
    { field: 'price', headerName: 'Price/Cost', width: 70 }, // number + "eur"
    { field: 'driver', headerName: "Driver's profile", width: 70 },
    { <Checkbox // input type="checkbox"
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        // checked={choosedriver}
        inputProps={{
            'aria-label': 'choose driver',
        }}
    />},
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function DataTable() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}

