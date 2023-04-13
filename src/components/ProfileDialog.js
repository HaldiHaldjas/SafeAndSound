import React, {useState} from "react";
import { doc, getDoc } from "firebase/firestore";
import {database} from "../config/firebase";
import {useLocation} from 'react-router-dom';
import { useNavigate} from "react-router-dom";

export default function ProfileDialog(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = props.userId;
    const isSignedIn = props.isSignedIn;
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [profilePic, setProfilePic] = useState("")
    const [isUserDriver, setIsUserDriver] = useState(false)
    const [licencePlate, setLicencePlate] = useState("")
    const [licencePic, setLicencePic] = useState("")


    const getUserDocument = async () => {
        try {
            const userRef = doc(database, "users", userId);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setFirstName(userData.first_name)
                setLastName(userData.last_name)
                setEmail(userData.email)
                setPhone(userData.phone)
                setProfilePic(userData.profile_pic)
                setIsUserDriver(userData.driver)
                setLicencePlate(userData.licence_plate)
                setLicencePic(userData.driving_licence_pic)
            } else {
                console.log("User document does not exist");
            }
        } catch (err) {
            console.error(err);
        }
    };

    getUserDocument()
        .then()

    return (
        <div style={{
            width: "70%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center"
        }}>
            {isSignedIn && (
                <div
                    style={{
                        width: "50%",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        padding: "20px",
                        marginTop: "40px",
                        marginLeft: "40px"
                    }}>
                    <img src={profilePic} />
                    <h1>{firstName} {lastName}</h1>
                    <p>E-mail: {email}</p>
                    <p>Phone: {phone}</p>
                    {isUserDriver && (
                        <>
                            <p>Licence plate: {licencePlate}</p>
                            <label>Driving licence:</label><br />
                            <img src={licencePic} />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
