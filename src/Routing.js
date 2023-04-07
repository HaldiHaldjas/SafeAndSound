import React from "react";
import {Routes, Route} from "react-router-dom";
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/Request";


function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="/signin/*"element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="/signin/profile" element={<Profile />}/>
            <Route path="request" element={<RequestForm/>}/>
        </Routes>
    );
}
export default Routing;