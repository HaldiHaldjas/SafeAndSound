import React from "react";
import {Routes, Route} from "react-router-dom";

//general views
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/Request";
import SeeData from "./components/SeeData";


function Routing() {
    return (
        <Routes>
            <Route path="/" />
            <Route path="signin" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="request" element={<RequestForm/>}/>
            <Route path="/seedata" element={<SeeData />} />
        </Routes>
    );
}
export default Routing;