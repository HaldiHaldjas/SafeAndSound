import React, {useState} from "react";
import {collection, query, where} from "firebase/firestore";
import { database } from "../config/firebase";
import { Button } from "@mui/material";

export const Signin1 = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userUid, setUserUid] = useState("")


    const signIn = async (email) => {
        try {
            const userCollection = collection(database, "users");
            const myquery =  query(userCollection.where("email", "===", email));

            myquery.get().then((querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log('No matching documents.');

                }
                console.log(querySnapshot);
            })

        } catch (err) {
            console.error(err);
        }
    }


        return (
            <div>
                {/*<Router>*/}
                {/*    <Switch>*/}
                {/*        <Route exact path="/">*/}
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
                    onClick={() => signIn(email)}
                >
                    Sign in
                </Button>
                <br/>
                <br/>
            </div>
        );

}
