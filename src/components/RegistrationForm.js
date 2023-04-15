import React, { useState } from "react";
import {addDoc, collection} from "firebase/firestore";
import {auth, database, storage} from "../config/firebase";
import Button from "@mui/material/Button";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate} from "react-router-dom";
import Profile from "./Profile";
import img10 from '../images/img10.jpg';


export default function RegistrationForm() {

    const navigate = useNavigate();
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPhone, setNewPhone] = useState(0);
    const [newProfilePic, setNewProfilePic] = useState("");
    const [isProfilePicUploaded, setIsProfilePicUploaded] = useState(false);
    const [isNewUserDriver, setIsNewUserDriver] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [licencePlate, setLicencePlate] = useState("");
    const [licencePic, setLicencePic] = useState("");
    const [isLicencePicUploaded, setIsLicencePicUploaded] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const usersCollectionRef = collection(database, "users");

    const handleRegistration = async () => {

    try {

        await createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {

                const newUser =
                 addDoc(usersCollectionRef, {
                        first_name: newFirstName,
                        last_name: newLastName,
                        email: newEmail,
                        phone: newPhone,
                        profile_pic: newProfilePic,
                        driver: isNewUserDriver,
                        licence_plate: licencePlate,
                        driving_licence_pic: licencePic,
                 })
                newUser.then((doc) => {
                    const userId = doc.id
                    setIsRegistered(true)
                    navigate("/profile", { state: { userId: userId, isSignedIn: true } });
                })
            });
        } catch (err) {
            console.error(err)
        }
    }

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
        <div>
            {isRegistered ? (
                <Profile />
            ) : (
                <>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundImage: `url(${img10})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
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
                            <h3>New here? Please register:</h3>
                            <input
                                placeholder="Your first name*"
                                onChange={(e) =>
                                    setNewFirstName(e.target.value)}/>
                            <br />
                            <input
                                placeholder="Your last name*"
                                onChange={(e) =>
                                    setNewLastName(e.target.value)}/>
                            <br />
                            <input placeholder="E-mail address*"
                                   onChange={(e) =>
                                       setNewEmail(e.target.value)}/>
                            <br />
                            <input
                                placeholder="Password*"
                                type="password"
                                onChange={(e) =>
                                    setNewPassword(e.target.value)}/>
                            <br />
                            <input
                                placeholder="Phone number"
                                type="number"
                                onChange={(e) =>
                                    setNewPhone(Number(e.target.value))}/>
                            <br />
                            <label htmlFor="profilePic">
                                Profile picture:
                            </label>
                            <input
                                placeholder="Profile picture (optional)"
                                type="file"
                                id="profilePic"
                                   onChange={(e) =>
                                       upLoadImage(e.target.files[0], "profilePic",
                                           setNewProfilePic, setIsProfilePicUploaded)} />
                            {isProfilePicUploaded &&
                                <CheckIcon
                                    sx={{color: "green",
                                        marginBottom: "-5px",
                                        marginLeft: "-80px"}}>
                                </CheckIcon>}
                            <br />
                            <input type="checkbox"
                                   onChange={(e) =>
                                       setIsNewUserDriver(e.target.checked)}/>
                            <label>
                                I also want to be a driver
                            </label>
                            <br />
                            {isNewUserDriver &&
                                <>
                                    <input
                                        placeholder="Licence plate"
                                        onChange={(e) =>
                                            setLicencePlate(e.target.value)}/>
                                    <br />
                                    <label
                                        for="licencePic">
                                        Picture of driving licence:
                                    </label>
                                    <input
                                        placeholder="Picture of driving licence"
                                        type="file"
                                        id="licencePic"
                                           onChange={(e) =>
                                               upLoadImage(e.target.files[0], "licencePic",
                                                   setLicencePic, setIsLicencePicUploaded)} />
                                    {isLicencePicUploaded &&
                                        <CheckIcon
                                            sx={{color: "green",
                                                marginBottom: "-5px",
                                                marginLeft: "-60px"}}>
                                        </CheckIcon>}
                                </>
                            }
                            <br />
                            <Button variant="outlined"
                                    color="primary"
                                    sx={{ fontFamily: 'monospace',
                                        width: "180px",
                                        height: "40px",
                                        fontWeight: 600, color: "#fbf6f4",
                                        backgroundColor: "#896c63", borderRadius: "8px"
                                    }}}}
                                    onClick={ handleRegistration }>
                                Register
                            </Button>
                            <br />
                            <br />
                            <Button variant="outlined"
                                    color="primary"
                                    sx={{ fontFamily: 'monospace',
                                        width: "180px",
                                        height: "40px",
                                        fontWeight: 600, color: "#fbf6f4",
                                        backgroundColor: "#896c63", borderRadius: "8px"
                                    }}
                                    onClick={() => {
                                        navigate("/signin");
                                    }}
                                    >
                                Back to signing in
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}