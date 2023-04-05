import React from "react";
import {collection, doc, getDoc} from "firebase/firestore";
import {database} from "../config/firebase";



export default function Profile() {
const usersCollectionRef = collection(database, "users")

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

return (
    getUserDocument()
)
}
