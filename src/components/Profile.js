import React, {useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {database} from "../config/firebase";
import { useLocation } from 'react-router-dom';


export default function Profile() {

    console.log("profile!")

    const location = useLocation();
    const email = location?.state?.email;

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState(0)
    const [profilePic, setProfilePic] = useState("")
    const [isUserDriver, setIsUserDriver] = useState(false)
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")


    const getUserDocument = async () => {
        try {
            const q = query(collection(database, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("User not found, please register.");
            } else {
                console.log(querySnapshot.docs[0].data())
                const userData = querySnapshot.docs[0].data();
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setPhone(userData.phone)
                setProfilePic(userData.profile_pic)
                setIsUserDriver(userData.driver)
                setLicencePlate(userData.licence_plate)
                setLicencePic(userData.driving_licence_pic)

            }
        } catch (err) {
            console.error(err);
        }
    };
    getUserDocument()
        .then()

return (
    <div>
            <h1>Welcome, {firstName}!</h1>
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
