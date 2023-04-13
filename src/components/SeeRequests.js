import React, {useState, useEffect, useRef} from "react";
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import ProfileDialog from "./ProfileDialog";


export default function SeeRequestsForm() {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([])
    // const [isChecked, setIsChecked] = useState([]);
    // const [checkedRequests, setCheckedRequests] = useState([]);
    const [userProfiles, setUserProfiles] = useState([])
    //
    // const [selectedRequest, setSelectedRequest] = useState(null);

    // const [loading, setLoading] = useState(true); // shows the spinner for user
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState("")




    // const [submitAccept, setSubmitAccept] = useState("")
    // const [requestPosition - järjekorranumber tabelis']
    //  const requestsRequestIdCollectionRef = collection(database, "requests") // see request list from database
    // function compareOffersAndRequests (if requestId.newPlaceToStart !== offerId.newPlaceToStart) => alert("Did not find any match! New search")
    // (if requestId.newPlaceToStart === offerId.newPlaceToStart) => {returns offerinfo(offerID), drivers profile link }
    // const retrieveDriverProfile = collection(database, "requestDriverProfile") // gets drivers profile from database


    // const getRequests = async () => {
    //     await getDocs(collection(database, "requests"))
    //         .then((querySnapshot) => {
    //             const newData = querySnapshot.docs
    //                 .map((doc) => ({...doc.data(), id: doc.id}));
    //             setRequests(newData);
    //             // console.log(requests, newData)
    //         })
    // }

    async function fetchRequests() {
        const querySnapshot = await getDocs(collection(database, "requests"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setRequests(newData);
        // setLoading(false); // set loading state to false when data is fetched
    }

    const getUserProfile = async () => {
        await getDocs(collection(database, "users"))
            .then((querySnapshot) => {
                const newData2 = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setUserProfiles(newData2); // (newData2.users.last_name)
                // console.log(seeDriverProfile, newData2)
                // const driverInfo = setSeeDriverProfile.
                // const driverInfo = seeDriverProfile.map((user, index) => )
            })
    }

    useEffect(() => {
        fetchRequests();
        getUserProfile();
    }, [])


    // const handleCheckBoxChange = (event, requestId) => {
    //     const checked = event.target.checked;
    //     if (checked) {
    //         setCheckedRequests([...checkedRequests, requestId]);
    //     } else {
    //         setCheckedRequests(checkedRequests.filter((id) => id !== requestId));
    //     }
    // }

    const handleCheckbox = (event, id) => {
        console.log(id)

        if (event.target.checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
            setSelectedRequest(requests.find((request) => request.id === id));

        } else {
            setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((selectedId) => selectedId !== id));
            setSelectedRequest(null);
        }
    };

    const submit = () => {
        navigate("/seerequests/confirmation", { state: { selectedRequest: selectedRequest } });
    }

    // console.log(requests)

    function handleClose() {
        setOpen(false) // false at the beginning and false when closed
    }

    function showUserInfo(userId) {



        setSelectedUser()
        setOpen(true)
    }

    // console.log(selectedRequest)
    // console.log(userProfiles)

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
                        <TableCell>User's profile</TableCell>
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
                            <TableCell>
                                <Button
                                    onClick={() => showUserInfo(request.userId)}
                                    variant="outlined">User Profile</Button>

{/*
                                {seeDriverProfile.length > 0 && seeDriverProfile.map((user, index) key={index}, {user.last_name})}
*/}
                            </TableCell>
                            <TableCell>
                                {/*<Checkbox*/}
                                {/*    checked={isChecked.includes(request.id)}*/}
                                {/*    onChange={(event) => handleCheckBoxChange(event, request.id)}*/}
                                {/*    color="success"*/}
                                {/*/>*/}
                                <Checkbox
                                    checked={selectedIds.includes(request.id)}
                                    onChange={(event) => handleCheckbox(event, request.id)}
                                />

                             </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
            </Table>
            <Button
                onClick={submit}
                variant="contained"
                sx={{
                    backgroundColor: "#F8F8F8",
                    color: "#383838",
                    "&:hover": {
                        backgroundColor: "#fff",
                        color: "#3c52b2",
                    },
                }}>Offer a ride</Button>


            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <ProfileDialog userId={selectedUser}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}