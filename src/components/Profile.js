import React from "react";
import {collection} from "firebase/firestore";
import {database} from "../config/firebase";



export default function Profile() {
const usersCollectionRef = collection(database, "users")


return (

)
}
