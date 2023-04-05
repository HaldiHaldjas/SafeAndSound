import React, { useState} from "react";
import  { auth } from "../config/firebase";
import {addDoc, collection, getDocs} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {database} from "../config/firebase";


export default function RegistrationForm() {


    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [isNewUserDriver, setIsNewUserDriver] = useState(false)
    const [newPassword, setNewPassword] = useState("");
    const usersCollectionRef = collection(database, "users")
const handleRegistration = async () => {

    try {
     /*   const userCredentials = await createUserWithEmailAndPassword(
            auth,
            newEmail,
            newPassword
        );
*/
        await addDoc(usersCollectionRef, {
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail,
            password: newPassword,
            phone: newPhone,
            driver: isNewUserDriver
        });

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
        <input type="checkbox" onChange={(e) => setIsNewUserDriver(e.target.checked)}/>
        <label>I also want to be a driver</label><br />
        <button onClick={handleRegistration}>Registrate</button><br /><br />
        <a href="..">I already have an account</a>

    </div>

)


}