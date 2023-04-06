import React, {useState} from "react";
import {collection, doc, getDoc} from "firebase/firestore";
import {database} from "../config/firebase";
import {Signin} from "./Signin";
import { useLocation } from 'react-router-dom';




export default function Profile() {

    const location = useLocation();
    const userUid = location.state.userUid;
    const usersCollectionRef = collection(database, "users")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [profilePic, setProfilePic] = useState("")
    const [isUserDriver, setIsUserDriver] = useState(false)
    const [password, setPassword] = useState("");
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")
    const [isRegistered, setIsRegistered] = useState(false)


    console.log("trallallala")

    const getUserDocument = async (email) => {
        try {


            const userRef = database.collection("users").where("email", "==", email);
            const userDoc = await getDoc(userRef);
            console.log(userDoc)
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log(userData)
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setPhone(userData.phone)
                setProfilePic(userData.profile_pic)
                setIsUserDriver(userData.driver)
                setLicencePlate(userData.licence_plate)
                setLicencePic(userData.driving_licence_pic)

            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };
    getUserDocument(userUid)
        .then()
return (
    <div>
        <p>First name: {firstName}</p>
        <p>Last name: {lastName}</p>
        <p>E-mail: {email}</p>
        <p>Phone: {phone}</p>
        <p>Profile picture: {profilePic}</p>
        {isUserDriver &&
            <>
        <p>Licence plate: {licencePlate}</p>
        <p>Licence picture: {licencePic}</p>
            </>
        }
    </div>

)
}
