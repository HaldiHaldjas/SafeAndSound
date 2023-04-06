import React, {useState} from "react";
import {collection, doc, getDoc} from "firebase/firestore";
import {database} from "../config/firebase";
import {Signin} from "./Signin";
import { useLocation } from 'react-router-dom';




export default function Profile() {

    const location = useLocation();
    const userUid = location.state.userUid;
    const usersCollectionRef = collection(database, "users")
    const [userEmail, setUserEmail] = useState("")

    console.log("trallallala")

    const getUserDocument = async (userUid) => {
        try {
            const userRef = doc(database, "users", userUid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log(userData)


                setUserEmail(userData.email)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };
    getUserDocument(userUid)
return (
    <p>{userEmail}</p>
)
}
