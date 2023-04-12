import React, { useState } from "react";
import {addDoc, collection} from "firebase/firestore";
import {auth, database, storage} from "../config/firebase";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate} from "react-router-dom";


export default function RegistrationForm() {

    const navigate = useNavigate();
    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [ProfilePicUpload, setProfilePicUpload] = useState(null)
    const [isProfilePicUploaded, setIsProfilePicUploaded] = useState(false);
    const [isNewUserDriver, setIsNewUserDriver] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")
    const [licencePicUpload, setLicencePicUpload] = useState(null)
    const [isLicencePicUploaded, setIsLicencePicUploaded] = useState(false)
    const [isRegistered, setIsRegistered] = useState(false)




    const usersCollectionRef = collection(database, "users")

    const upLoadProfilePic = () => {
        if (ProfilePicUpload == null)
            return;
        const imageRef = ref(storage, `images/${ProfilePicUpload.name + v4() }`);
        uploadBytes(imageRef, ProfilePicUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setNewProfilePic(url);
                setIsProfilePicUploaded(true);

            })

            }
        )
    }

    const upLoadLicencePic = () => {
        if (licencePicUpload == null)
            return;
        const imageRef = ref(storage, `images/${licencePicUpload.name + v4() }`);
        uploadBytes(imageRef, licencePicUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setLicencePic(url);
                    setIsLicencePicUploaded(true);

                })

            }
        )
    }


    const handleRegistration = async () => {

    try {

        await createUserWithEmailAndPassword(auth, newEmail, newPassword)
            .then((userCredential) => {

                addDoc(usersCollectionRef, {
                    first_name: newFirstName,
                    last_name: newLastName,
                    email: newEmail,
                    phone: newPhone,
                    profile_pic: newProfilePic,
                    driver: isNewUserDriver,
                    licence_plate: licencePlate,
                    driving_licence_pic: licencePic,
        })});
        document.getElementById("RegForm").reset();
        setIsRegistered(true)
        } catch (err) {
            console.error(err)
        }
    }

    const toSignin = () => {
        navigate("/signin");
    }

return (
    <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
    <div
        style={{
            width: "50%",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "20px",
            marginTop: "40px",
            marginLeft: "40px",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <h3>Sign up</h3>
        <input placeholder="First name" onChange={(e) => setNewFirstName(e.target.value)}/><br />
        <input placeholder="Last name" onChange={(e) => setNewLastName(e.target.value)}/><br />
        <input placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/><br />
        <input placeholder="Password"  type="password" onChange={(e) => setNewPassword(e.target.value)}/><br />
        <input placeholder="Phone" type="number"onChange={(e) => setNewPhone(Number(e.target.value))}/><br />
        <label for="profilePic">Profile picture:</label>
        <input placeholder="Profile picture" type="file" id="profilePic"
               onChange={(e) => setProfilePicUpload(e.target.files[0])} />
        <br />
        <Button variant="contained"
                sx={{backgroundColor: "#add8e6",
                    height: "30px",

                    '&:hover': {
                        backgroundColor: '#fff',
                        color: '#3c52b2',
                        }
                }}
                onClick={upLoadProfilePic}>
                Upload picture
        </Button>
        <br />
        {isProfilePicUploaded &&
            <CheckIcon
                sx={{color: "green",
                    paddingTop: "10px"}}></CheckIcon>}

        <br />
        <input type="checkbox" onChange={(e) => setIsNewUserDriver(e.target.checked)}/>
        <label>I also want to be a driver</label><br />
        {isNewUserDriver &&
            <>
                <input placeholder="Licence plate" onChange={(e) => setLicencePlate(e.target.value)}/> <br />
                <label for="licencePic">Picture of driving licence:</label>
                <input placeholder="Picture of driving licence" type="file" id="licencePic"
                       onChange={(e) => setLicencePicUpload(e.target.files[0])} />
                <br />
                <Button variant="contained"
                        sx={{backgroundColor: "#add8e6",
                            height: "30px",

                            '&:hover': {
                                backgroundColor: '#fff',
                                color: '#3c52b2',
                            }
                        }}
                        onClick={upLoadLicencePic}>
                    Upload picture
                </Button>
                <br />
                {isLicencePicUploaded &&
                    <CheckIcon
                        sx={{color: "green",
                            paddingTop: "10px"}}></CheckIcon>}
            </>
        }
        <br />
        <Button variant="contained"
                sx={{backgroundColor: "#add8e6",
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: '#3c52b2',}}} onClick={handleRegistration}>Register</Button>

        <Button variant="contained"
                sx={{backgroundColor: "#add8e6",
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: '#3c52b2',},
                        marginLeft: "25px"}}
                onClick={toSignin}>
         Sign in
        </Button>

        </div>

    </div>

)


}