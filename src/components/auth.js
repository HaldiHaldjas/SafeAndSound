import React from "react";
import  { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import {Link} from "react-router-dom";

export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



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
            const newUser = {
                name: "", // add the user's name here
                email: user.email,
                profilePicture: "", // add the user's profile picture URL here
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
                createUserDocument(user);
                getUserDocument(user.uid);
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
        </div>
    );
};