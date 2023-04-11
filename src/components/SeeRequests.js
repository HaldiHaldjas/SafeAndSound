import React, {useState, useEffect} from "react";
import {getDocs, collection} from "firebase/firestore";
import {database} from "../config/firebase";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

// import { DataGrid } from '@mui/x-data-grid';
// import { Signin } from "./Signin";
// import { useLocation } from 'react-router-dom'; // where do we use user location?
// import { Link } from "react-router-dom";
// Next button is for seeing driver profile

import Profile from "./Profile";



export default function SeeRequestsForm() {
    const [requests, setRequests] = useState([])
    // const [seeDriverProfile, setSeeDriverProfile] = useState(false)
    // const [submitAccept, setSubmitAccept] = useState("")
    // const [requestPosition - järjekorranumber tabelis']
    //  const requestsRequestIdCollectionRef = collection(database, "requests") // see request list from database
    // function compareOffersAndRequests (if requestId.newPlaceToStart !== offerId.newPlaceToStart) => alert("Did not find any match! New search")
    // (if requestId.newPlaceToStart === offerId.newPlaceToStart) => {returns offerinfo(offerID), drivers profile link }
    // const retrieveDriverProfile = collection(database, "requestDriverProfile") // gets drivers profile from database


    const getRequests = async () => {
        await getDocs(collection(database, "requests"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setRequests(newData);
                console.log(requests, newData)
            })
    }
    useEffect(() => {
        getRequests();
    }, [])

    return (
        <div className="Requests list">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Verification Code</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Timeframe 1</TableCell>
                        <TableCell>Timeframe 2</TableCell>
                        <TableCell>Needed Spots</TableCell>
                        <TableCell>My choice</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.length > 0 && requests.map((request, index) => (
                        <TableRow key={index}>
                             <TableCell>{request.id}</TableCell>
                             <TableCell>{request.day}</TableCell>
                             <TableCell>{request.from.address}</TableCell>
                             <TableCell>{request.to.address}</TableCell>
                             <TableCell>{request.timeframe_1}</TableCell>
                             <TableCell>{request.timeframe_2}</TableCell>
                             <TableCell>{request.needed_spots}</TableCell>
                             <TableCell><Checkbox/></TableCell>
                             <br/><br/>
                        </TableRow>
                      ))}
                    }
                </TableBody>
            </Table>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#F8F8F8",
                    color: "#383838",
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: "#3c52b2",
                    },
                }}>Offer a ride</Button>
        </div>
    )
}


