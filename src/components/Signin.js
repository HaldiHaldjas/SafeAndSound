import React, {useRef} from "react";
import  { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react";
import {doc, setDoc, getDoc, collection} from "firebase/firestore";
import { database } from "../config/firebase";
import { Button } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Profile from "./Profile";

export const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUid, setUserUid] = useState("")

    const createUserDocument = async (user) => {
        try {
            const userRef = doc(database, "users", user.uid);

            const newUser = {
                first_name: "",
                last_name: "",
                email: user.email,
                password: "",
                phone: 0,
                driver: false,
                licence_plate: "",
                driving_licence_pic: "",

            };
            await setDoc(userRef, newUser);
            setUserUid(user.uid)
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
            <Router>
                <Switch>
                    <Route exact path="/">
                        <input
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br/>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#F8F8F8",
                                color: "#383838",
                                "&:hover": {
                                    backgroundColor: "#fff",
                                    color: "#3c52b2",
                                },
                            }}
                            onClick={signIn}
                        >
                            Sign in
                        </Button>
                        <br/>
                        <br/>
                    </Route>

                    <Route exact path="/Profile">
                        <Profile email={email}/>
                    </Route>

                    <Route>
                        <div>You need to log in first</div>
                    </Route>
                </Switch>

                {isLoggedIn && (
                    <Link to={{pathname: "/Profile", state: {email: email}}}>
                        Profile
                    </Link>
                )}
            </Router>
        </div>
    );
}

/*  const getUserDocument = async (uid) => {
        try {
            const userRef = doc(database, "users", uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserData(userData)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };*/

                        // <Route path="/Profile" component={Profile}/>
                        //      <Link to={{pathname: "/Profile", state: { userUid: userUid }}}>Profile</Link>
