import React, { useState, useEffect } from "react";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, database, storage, storageRef} from "../config/firebase";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


export default function RegistrationForm() {


    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [newProfilePic, setNewProfilePic] = useState("")
    const [isNewUserDriver, setIsNewUserDriver] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)
    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([])

    const imageListRef = ref(storage, "images/")

    const usersCollectionRef = collection(database, "users")

    const upLoadImage = () => {
        if (imageUpload == null)
            return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4() }`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);
                setNewProfilePic(url);
                setImageList((prev) => [...prev, url]);
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
    setIsRegistered(true)
    } catch (err) {
        console.error(err)
    }
}


return (

    <div>
        <h3>Sign up</h3>
        <input placeholder="First name" onChange={(e) => setNewFirstName(e.target.value)}/><br />
        <input placeholder="Last name" onChange={(e) => setNewLastName(e.target.value)}/><br />
        <input placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/><br />
        <input placeholder="Password"  type="password" onChange={(e) => setNewPassword(e.target.value)}/><br />
        <input placeholder="Phone" type="number"onChange={(e) => setNewPhone(Number(e.target.value))}/><br />
        <label for="profilePic">Profile picture:</label>
        <input placeholder="Profile picture" type="file" id="profilePic"
               onChange={(e) => setImageUpload(e.target.files[0])} /> <br />
        <button onClick={upLoadImage}>Upload picture</button> <br /> <br />

        <input type="checkbox" onChange={(e) => setIsNewUserDriver(e.target.checked)}/>
        <label>I also want to be a driver</label><br />
        {isNewUserDriver &&
            <>
                 <input placeholder="Licence plate" onChange={(e) => setLicencePlate(e.target.value)}/> <br />
                 <input placeholder="Picture of driving licence" onChange={(e) => setLicencePic(e.target.value)}/>
            </>
        }
        <br />
        <Button variant="contained"
                sx={{backgroundColor: "#add8e6",
                    '&:hover': {
                        backgroundColor: '#fff',
                        color: '#3c52b2',}}} onClick={handleRegistration}>Register</Button><br /><br />
        <br />
        {isRegistered ?
        <Button><Link to="/signin" >Go back to signing in</Link></Button>
          :
        <Link to="/">Back</Link>
        }

    </div>

)


}