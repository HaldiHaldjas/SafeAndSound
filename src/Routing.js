import React from "react";
import {Routes, Route} from "react-router-dom";
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/RequestForm";
import SeeData from "./components/SeeOffers";
import RequestForm from "./components/Request";
import OfferForm from "./components/OfferForm";
import SeeRequestsForm from "./components/SeeRequests";


function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="/signin/*" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="/signin/profile" element={<Profile />}/>
            <Route path="request" element={<RequestForm/>}/>
            <Route path="offer" element={<OfferForm/>}/>
            <Route path="seeRequests" element={<SeeRequestsForm/>}/>
            <Route path="/seedata" element={<SeeData />} />
        </Routes>
    );
}
export default Routing;