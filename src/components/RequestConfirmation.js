import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import img5 from "../images/img5.jpg";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../config/firebase";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ProfileDialog from "./ProfileDialog";


function RequestConfirmation() {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedRequest = location?.state?.selectedRequest;
    const userId = location?.state?.userId;
    const isSignedIn = location?.state?.isSignedIn;
    console.log(isSignedIn)
    const [userData, setUserData] = useState("")
    const [open, setOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState("")




    const getUserDocument = async () => {
        try {
            const q = query(collection(database, "requests"),
                where("randomId", "==", selectedRequest.randomId));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("User not found, please register.");
            } else {
                const dataRef= querySnapshot.docs[0].data()
                setUserData(dataRef)

            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUserDocument();
    }, [])

    function handleClose() {
        setOpen(false) // false at the beginning and false when closed
    }

    function showUserInfo(userId) {

        setSelectedUserId(userId)
        setOpen(true)
    }

    return (
        <div style={{
            width: "100%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${img5})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {isSignedIn && (
                    <>
                        <h3>Your selected request:</h3>
                        <p>Date: {selectedRequest.day}</p>
                        <p>From: {selectedRequest.from}</p>
                        <p>To: {selectedRequest.to}</p>
                        <p>Starting time: {selectedRequest.timeframe_1}</p>
                        <p>Latest arrival: {selectedRequest.timeframe_2}</p>
                        <p>Number of the spots: {selectedRequest.needed_spots}</p>
                        <p>Verification code: {selectedRequest.randomId}</p>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600,
                                color: "#fbf6f4",
                                backgroundColor: "#896c63",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => {
                                navigate("/seerequests", { state: { userId: userId, isSignedIn: {isSignedIn} } });
                            }}

                        >
                            Back
                        </Button>
                    </>
                )}
            </div>
            <div
                style={{
                    width: "20%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "25px",
                    marginTop: "1px",
                    marginLeft: "90px",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {isSignedIn && (
                    <>

                        <img src={userData.user_profile_pic}></img>
                        <p>User's name: {userData.user_first_name} {userData.user_last_name} </p>
                        <p>User's phone: {userData.user_phone}</p>
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600,
                                color: "#fbf6f4",
                                backgroundColor: "#896c63",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                            onClick={() => showUserInfo(userData.userId)}
                        >
                            User's profile
                        </Button>

                        <Dialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            fullWidth={true}
                            open={open}
                            PaperProps={{
                                style: {
                                    backgroundColor: "rgba(255, 255, 255)",
                                    borderRadius: "20px",
                                    padding: "25px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "500px"
                                }
                            }}
                        >
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                User info
                            </DialogTitle>
                            <DialogContent
                                style={{
                                    width: "900px",
                                    marginLeft: "200px"
                                }}
                            >
                                <ProfileDialog
                                    userId={selectedUserId} isSignedIn={isSignedIn}/>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose}>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </div>
        </div>
    );
}
export default RequestConfirmation;
