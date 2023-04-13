import React, { useRef } from "react";
import { auth } from "../config/firebase";
import { useState } from "react";
import { Button } from "@mui/material";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import img1 from '../images/img1.jpg';
import { collection, getDocs, query, where } from "firebase/firestore";

    export const Signin = () => {

        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [userId, setUserId] = useState("")
        const [isSignedIn, setIsSignedIn] = useState(false);

        const signIn = async () => {
            try {

                await signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
                        setIsSignedIn(true);
                        navigate("/profile", { state: { userId: userId, isSignedIn: true } });

                    });
            } catch (error) {
                const errorCode = error.code;
                console.log("Error signing in:", errorCode)
            }
        };

        const getUserDocument = async () => {
            try {
                const q = query(collection(database, "users"), where("email", "==", email));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("User not found, please register.");
                } else {
                    setUserId(querySnapshot.docs[0].id)
                }
            } catch (err) {
                console.error(err);
            }
        };
        getUserDocument()
            .then()



    return (
        <div className="signin-container" style={{backgroundImage: `url(${img1})`}}>
            {isSignedIn ? (
                <Profile userId={userId} />
            ) : (
                <div ref={signinRef} className="signin-form" style={{backgroundImage: `url(${img1})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"}}>
                    <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={signIn}
                        sx={{ fontFamily: 'Roboto Mono', fontWeight: 700 }}
                    >
                        Sign in
                    </Button>
                    <br />
                    <br />
                </div>

            )}
        </div>
    );
};
