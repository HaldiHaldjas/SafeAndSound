import React, { useRef } from "react";
import { auth } from "../config/firebase";
import { useState } from "react";
import { Button } from "@mui/material";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import img1 from '../images/img1.jpg';

export const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignedIn, setIsSignedIn] = useState(false);
    const signinRef = useRef(null);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setIsSignedIn(true);
                    navigate("/profile", { state: { email: email, isSignedIn: true } });
                });
        } catch (error) {
            const errorCode = error.code;
            console.log("Error signing in:", errorCode)
        }
    };

    const toProfile = () => {
        navigate("/profile", { state: { email: email, isSignedIn: true } });
    }

    return (
        <div className="signin-container" style={{backgroundImage: `url(${img1})`}}>
            {isSignedIn ? (
                <Profile email={email} />
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
