import React, { useState } from "react";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import {database, storage} from "../config/firebase";
import { useLocation } from 'react-router-dom';
import { useNavigate} from "react-router-dom";
import { v4 } from "uuid";
import {Button} from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import CheckIcon from "@mui/icons-material/Check";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

export default function EditProfileDialog(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId;
    const isSignedIn = location.state?.isSignedIn;
    const firstName = location.state?.firstName;
    const lastName = location.state?.lastName;
    const phone = location.state?.phone;
    const profilePic = location.state?.profilePic
    const licencePlate = location.state?.licencePlate;
    const isUserDriver = location.state?.isUserDriver;
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [newLicencePlate, setNewLicencePlate] = useState("")
    const [newLicencePic, setNewLicencePic] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isProfilePicUploaded, setIsProfilePicUploaded] = useState(false);
    const [isLicencePicUploaded, setIsLicencePicUploaded] = useState(false);


    console.log(firstName)
    console.log(lastName)
    console.log(phone)

    const submit = async () => {

        try {
            const userRef = doc(database, "users", userId);


                if ( newFirstName.length > 0 ) {
                    await updateDoc(userRef,
                        { first_name: newFirstName})
                }
                if ( newLastName.length > 0 ) {
                    await updateDoc(userRef,
                        { last_name: newLastName})
                }
                if ( newPhone.length > 0 ) {
                    await updateDoc(userRef,
                        { phone: newPhone})
                }
                if ( newLicencePlate.length > 0 ) {
                    await updateDoc(userRef,
                        { licence_plate: newLicencePlate})
                }
                if ( newProfilePic.length > 0 ) {
                    await updateDoc(userRef,
                        { profile_pic: newProfilePic})
                }
                if ( newLicencePic.length > 0 ) {
                    await updateDoc(userRef,
                        { driving_licence_pic: newLicencePic})
                }
            setIsSubmitted(true)


        }

        catch (err) {
            console.error(err);
        }
    };

    const upLoadImage = (file, imageName, setImage, setIsUpLoaded) => {
        if (file == null)
            return;
        const imageRef = ref(storage, `images/${imageName.name + v4() }`);
        uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImage(url);
                    setIsUpLoaded(true);

                })

            }
        )
    }


    return (
        <div style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {isSignedIn && (
                <div>
                    <img src={profilePic} />
                    <br />
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        margin: "0 auto",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "right",

                    }}>

                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={6} sm={6} md={6}  >
                                <p>Change profile picture:</p>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <input placeholder={profilePic} type="file"
                                       onChange={(e) =>
                                           upLoadImage(e.target.files[0], "profilePic",
                                               setNewProfilePic, setIsProfilePicUploaded)} />
                                {isProfilePicUploaded &&
                                    <CheckIcon
                                        sx={{color: "green",
                                            marginBottom: "-5px",
                                            marginLeft: "-80px"}}>
                                    </CheckIcon>}

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <p>First name:</p>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} sx={{textAlign: "left"}}>
                                <input placeholder={firstName}
                                       onChange={(e) => setNewFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} >
                                <p>Last name:</p>

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} sx={{textAlign: "left"}} >
                                <input placeholder={lastName}
                                       onChange={(e) => setNewLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}  >
                                <p>Phone:</p>

                            </Grid>
                            <Grid item xs={6} sm={6} md={6} sx={{textAlign: "left"}} >
                                <input placeholder={phone}
                                       onChange={(e) => setNewPhone(e.target.value)}
                                />
                            </Grid>
                            {isUserDriver && (
                                <>

                                    <Grid item xs={6} sm={6} md={6} >
                                        <p>Licence plate:</p>

                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} sx={{textAlign: "left"}}>
                                        <input placeholder={licencePlate}
                                               onChange={(e) => setNewLicencePlate(e.target.value)}
                                        />

                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} >
                                        <p>Change driving licence:</p>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} >
                                        <input placeholder={firstName} type="file"
                                               onChange={(e) =>
                                                   upLoadImage(e.target.files[0], "licencePic",
                                                       setNewLicencePic, setIsLicencePicUploaded)} />

                                        {isLicencePicUploaded &&
                                            <CheckIcon
                                                sx={{color: "green",
                                                    marginBottom: "-5px",
                                                    marginLeft: "-80px"}}>
                                            </CheckIcon>}
                                    </Grid>
                                </>

                            )}
                        </Grid>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={submit}
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600, color: "#fbf6f4",
                                backgroundColor: "#896c63", borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#ccada2",
                                    color: "#3e2723",
                                },
                            }}
                        >
                            Submit
                        </Button>
                        {isSubmitted &&
                            <CheckIcon
                                sx={{color: "green"}}></CheckIcon>}
                    </Box>

                </div>
            )}
        </div>
    );
}