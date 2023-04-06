import React from "react";
import {Routes, Route} from "react-router-dom";

//general views
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";


function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="profile" element={<Profile userUid={userUid}/>}/>
        </Routes>
    );
}
export default Routing;