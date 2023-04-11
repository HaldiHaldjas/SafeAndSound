import React from "react";
import {Routes, Route} from "react-router-dom";
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/RequestForm";
import SeeOffers from "./components/SeeOffers";
import RequestForm from "./components/Request";
import SeeRequestsForm from "./components/SeeRequests";
import Confirmation from "./components/Confirmation";

function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="/signin/*" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="/signin/profile" element={<Profile />}/>
            <Route path="request" element={<RequestForm/>}/>
            <Route path="seeRequests" element={<SeeRequestsForm/>}/>
            <Route path="/seeOffers/*" element={<SeeOffers />} />
            <Route path="/seeOffers/confirmation" element={<Confirmation/>}/>
        </Routes>
    );
}
export default Routing;
