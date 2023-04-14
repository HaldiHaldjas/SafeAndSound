import React from "react";
import {Routes, Route} from "react-router-dom";
import {Signin} from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import Profile from "./components/Profile";
import RequestForm from "./components/RequestForm";
import SeeOffers from "./components/SeeOffers";
import OfferForm from "./components/OfferForm";
import SeeRequestsForm from "./components/SeeRequests";
import OfferConfirmation from "./components/OfferConfirmation";
import RequestConfirmation from "./components/RequestConfirmation";
import EditProfileDialog from "./components/EditProfileDialog";
import SeeOffers1 from "./components/SeeOffers1"
import SeeOffers2 from "./components/SeeOffers2"
import SeeRequests1 from "./components/SeeRequests1";

function Routing() {
    return (
        <Routes>
            <Route path="/"/>
            <Route path="signin" element={<Signin/>}/>
            <Route path="register" element={<RegistrationForm/>}/>
            <Route path="/profile/*" element={<Profile />}/>
            <Route path="request" element={<RequestForm/>}/>
            <Route path="offer" element={<OfferForm/>}/>
            <Route path="seerequests" element={<SeeRequests1/>}/>
            <Route path="/seeoffers/*" element={<SeeOffers2 />} />
            <Route path="/seeoffers/confirmation" element={<OfferConfirmation/>}/>
            <Route path="/seerequests/confirmation" element={<RequestConfirmation/>}/>
            <Route path="/profile/edit" element={<Profile />}/>
        </Routes>
    );
}
export default Routing;


