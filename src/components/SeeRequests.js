import React, {useState, useEffect} from "react";
import {doc, getDocs, collection} from "firebase/firestore";
import {database} from "../config/firebase";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

export default function SeeRequestsForm() {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([])
    // const [isChecked, setIsChecked] = useState([]);
    const [checkedRequests, setCheckedRequests] = useState([]);
    const [seeDriverProfile, setSeeDriverProfile] = useState([])
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

    const getDriverProfile = async () => {
        await getDocs(collection(database, "users"))
            .then((querySnapshot) => {
                const newData2 = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setSeeDriverProfile(newData2); // (newData2.users.last_name)
                console.log(seeDriverProfile, newData2)
                // const driverInfo = setSeeDriverProfile.
                // const driverInfo = seeDriverProfile.map((user, index) => )
            })
    }

    useEffect(() => {
        getRequests();
    }, [])

    useEffect(() => {
        getDriverProfile();
    }, [])

    const handleCheckBoxChange = (event, requestId) => {
        const checked = event.target.checked;
        if (checked) {
            setCheckedRequests([...checkedRequests, requestId]);
        } else {
            setCheckedRequests(checkedRequests.filter((id) => id !== requestId));
        }
    }

    /*    const handleCheckBoxChange = (event, id) => {
        if (event.target.checked) {
            setIsChecked((prevIsChecked) => [...prevIsChecked, id]);
            setCheckedRequests(requests.find((request) => request.id === id));
            console.log(checkedRequests)
        } else {
            setIsChecked((prevIsChecked) => prevIsChecked.filter((isChecked) => isChecked !== id));
            setCheckedRequests(null);
        }
    }*/

  /*  const handleButtonClick = (event) => {
        if (event === handleCheckBoxChange) {
            alert("So this is your choice?")
        } else {
            alert("Going alone?")
        }
    }*/

    const handleButtonClick = () => {
        navigate("/seeOffers/confirmation", {state: {checkedRequests: checkedRequests} });
    }
    return (
        <div className="Requests list">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Verification Code</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Timeframe 1</TableCell>
                        <TableCell>Timeframe 2</TableCell>
                        <TableCell>Needed Spots</TableCell>
                        <TableCell>Driver's profile</TableCell>
                        <TableCell>My choice</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.length > 0 && requests.map((request, index) => (
                        <TableRow key={index}>
                             <TableCell>{request.randomId}</TableCell>
                             <TableCell>{request.date}</TableCell>
                             <TableCell>{request.from.address}</TableCell>
                             <TableCell>{request.to.address}</TableCell>
                             <TableCell>{request.timeframe_1}</TableCell>
                             <TableCell>{request.timeframe_2}</TableCell>
                             <TableCell>{request.needed_spots}</TableCell>
                            <TableCell>User Profile
{/*
                                {seeDriverProfile.length > 0 && seeDriverProfile.map((user, index) key={index}, {user.last_name})}
*/}
                            </TableCell>
                            <TableCell>
                                <Checkbox
                                    checked={checkedRequests.includes(request.id)}
                                    onChange={(event) => handleCheckBoxChange(event, request.id)}
                                    color="success"
                                />
                             </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
            </Table>
            <Button
                onClick={handleButtonClick}
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