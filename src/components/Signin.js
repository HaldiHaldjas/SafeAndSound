import React, {useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate} from "react-router-dom";
import { database } from "../config/firebase";
import { Button } from "@mui/material";
import Profile from "./Profile"


export const Signin = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [noUser, setNoUser] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)

    const signIn = async () => {
        try {
            const q = query(collection(database, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                setNoUser(true)
                console.log("User not found, please register.");
            } else {
                const userDoc = querySnapshot.docs[0];
                if (userDoc.data().password === password) {
                    setIsLoggedIn(true);
                    console.log("jeei, logged in !");
                    navigate("/signin/profile", { state: { email: email } });
                } else {
                    setWrongPassword(true)
                    console.log("Wrong password!");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {isLoggedIn ? (
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
                        onClick={() => signIn(email)}
                    >
                        Sign in
                    </Button>
                    {noUser &&
                        <p>User not found, please register!</p>}
                    {wrongPassword &&
                        <p>Wrong password!</p>}

                    <br />
                    <br />
                </>
            )}
        </div>
    );

}