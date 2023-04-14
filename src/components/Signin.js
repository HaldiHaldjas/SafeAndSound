import React, { useRef } from "react";
import { auth } from "../config/firebase";
import { useState } from "react";
import { Button } from "@mui/material";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import img10 from '../images/img10.jpg';
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../config/firebase";

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
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${img10})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "20px",
                    padding: "8px",
                    marginTop: "1px",
                    marginLeft: "40px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <h3>Already have an account? Sign in:</h3>
                    <input placeholder="E-mail address" onChange={(e) => setEmail(e.target.value)} />
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
                        sx={{ fontFamily: 'monospace', width: "180px", height: "40px", fontWeight: 600, color: "#fbf6f4", backgroundColor: "#896c63" }}
                    >
                        Sign in
                    </Button>
                    <br />
                    <br />
                </div>
        </div>
    );
};
