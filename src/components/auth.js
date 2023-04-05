import React from "react";
import  { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import { Link } from "react-router-dom";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    const getUserDocument = async (uid) => {
        try {
            const userRef = doc(database, "users", uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log(userData);
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };
    const createUserDocument = async (user) => {
        try {
            const userRef = doc(database, "users", user.uid);
            console.log('userRef:', userRef);
            const newUser = {
                first_name: "",
                last_name: "",
                email: user.email,
                password: user.password,
                phone: 0,
                driver: false,
                licence_plate: "",
                driving_licence_pic: "",
            };
            await setDoc(userRef, newUser);
        } catch (err) {
            console.error(err);
        }
    };

    const signIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                createUserDocument(user)
                setIsLoggedIn(true)

            });
        } catch (err) {
            console.error(err)
        }
    };
    return (
        <div>
            <input placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder="Password"
                   type="password"
                   onChange={(e) => setPassword(e.target.value)}/><br />
            <button onClick={signIn}>Sign in</button><br /><br />
            <Link to="/">Back</Link>
            {isLoggedIn &&
                <p>trallalalaaa</p>
            }
        </div>
    );
};