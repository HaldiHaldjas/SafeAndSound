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
import img5 from "../images/img5.jpg";


export default function SeeRequestsForm() {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([])
    const [userProfiles, setUserProfiles] = useState([])
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [open, setOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")

    async function fetchRequests() {
        const querySnapshot = await getDocs(collection(database, "requests"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setRequests(newData);
    }

    const getUserProfile = async () => {
        await getDocs(collection(database, "users"))
            .then((querySnapshot) => {
                const newData2 = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setUserProfiles(newData2); // (newData2.users.last_name)
            })
    }

    useEffect(() => {
        fetchRequests();
        getUserProfile();
    }, [])

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

        console.log(userId)
        setSelectedUserId(userId)
        setOpen(true)
    }

    // console.log(selectedRequest)
    // console.log(userProfiles)

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${img5})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "8px",
                    marginTop: "1px",
                    marginLeft: "40px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
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
                                    variant="outlined"
                                    color="primary"
                                    sx={{ fontFamily: 'monospace',
                                        width: "180px",
                                        height: "40px",
                                        fontWeight: 600, color: "#fbf6f4",
                                        backgroundColor: "#896c63", borderRadius: "8px"
                                    }}
                                >User Profile</Button>
                            </TableCell>
                            <TableCell>
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
                variant="outlined"
                color="primary"
                sx={{ fontFamily: 'monospace',
                    width: "180px",
                    height: "40px",
                    fontWeight: 600, color: "#fbf6f4",
                    backgroundColor: "#896c63", borderRadius: "8px"
                }}
                >Confirm my choice</Button>


            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                fullWidth={true}
                maxWidth="lg"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    User info
                </DialogTitle>
                <DialogContent dividers>
                    <ProfileDialog userId={selectedUserId} isSignedIn="true"/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
            </div>
        </div>
    );
}