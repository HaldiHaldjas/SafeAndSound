import React from "react";
import {Routes, Route} from "react-router-dom";

//general views
import {Signin1} from "./components/Signin1";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/Request";


function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="signin" element={<Signin1/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="request" element={<RequestForm/>}/>
        </Routes>
    );
}
export default Routing;