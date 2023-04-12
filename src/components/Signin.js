    import React, {useRef} from "react";
    import  { auth } from "../config/firebase";
    import { useState } from "react";
    import { Button } from "@mui/material";
    import Profile from "./Profile";
    import { useNavigate} from "react-router-dom";
    import { signInWithEmailAndPassword } from "firebase/auth";

    export const Signin = () => {

        const navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [isSignedIn, setIsSignedIn] = useState(false);

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


        return (
            <div>
                {isSignedIn ? (
                    <Profile email={email} />
                ) : (
                    <>
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
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
                        <br />
                        <br />
                    </>
                )}
            </div>
        );
    }

