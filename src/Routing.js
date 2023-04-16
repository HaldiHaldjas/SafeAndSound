import React from "react";
import {Routes, Route} from "react-router-dom";
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/RequestForm";
import SeeOffers from "./components/SeeOffers";
import OfferForm from "./components/OfferForm";
import OfferConfirmation from "./components/OfferConfirmation";
import RequestConfirmation from "./components/RequestConfirmation";
import SeeRequests from "./components/SeeRequests";

function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="/profile/*" element={<Profile />}/>
            <Route path="request" element={<RequestForm/>}/>
            <Route path="offer" element={<OfferForm/>}/>
            <Route path="seerequests" element={<SeeRequests/>}/>
            <Route path="/seeoffers/*" element={<SeeOffers />} />
            <Route path="/seeoffers/confirmation" element={<OfferConfirmation/>}/>
            <Route path="/seerequests/confirmation" element={<RequestConfirmation/>}/>
            <Route path="/profile/edit" element={<Profile />}/>
        </Routes>
    );
}
export default Routing;


