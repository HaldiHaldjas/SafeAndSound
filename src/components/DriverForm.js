import React, { useState} from "react";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {database} from "../config/firebase";
import {Link} from "react-router-dom";


export default function DriverForm() {


    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")

    const usersCollectionRef = collection(database, "users")
    const handleRegistration = async () => {

        try {
            await addDoc(usersCollectionRef, {
                licence_plate: licencePlate,
                driving_licence_pic: licencePic,
            });

        } catch (err) {
            console.error(err)
        }
    }



    return (

        <div>
            <h3>Additional information for drivers</h3>
            <input placeholder="Licence plate" onChange={(e) => setLicencePlate(e.target.value)}/><br />
            <input placeholder="Picture of driving licence" onChange={(e) => setLicencePic(e.target.value)}/><br />
              <button onClick={handleRegistration}>Registrate</button><br /><br />
            <Link to="/">Back</Link>
        </div>

    )


}