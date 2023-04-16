import React from "react";
import { auth } from "../config/firebase";
import { useState } from "react";
import { Button } from "@mui/material";
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

        const signIn = async () => {
            try {

                await signInWithEmailAndPassword(auth, email, password)
                    .then(() => {
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
                    marginTop: "-60px",
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
                        sx={{ fontFamily: 'monospace',
                            width: "180px",
                            height: "40px",
                            fontWeight: 600, color: "#fbf6f4",
                            backgroundColor: "#896c63", borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "#ccada2",
                                color: "#3e2723",
                            },
                    }}>
                        Sign in
                    </Button>
                    <br />
                    <br />
                </div>
            <p style={{position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", textAlign: "center", fontSize: "12px", color: "#896c63"}}>
                Image by <a href="https://www.freepik.com/free-photo/beautiful-mountain-road-landscape_16694695.htm" style={{color: "#896c63"}}>Freepik</a>. All rights reserved.
            </p>
        </div>
    );
};
