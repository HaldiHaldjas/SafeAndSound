import React from 'react';
import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import RequestForm from "./components/RequestForm";
import SeeOffers from "./components/SeeOffers";
import OfferForm from "./components/OfferForm";
import SeeRequestsForm from "./components/SeeRequests";
import Confirmation from "./components/OfferConfirmation";
import Profile from "./components/Profile";
import Routing from "./Routing";
import RequestConfirmation from "./components/RequestConfirmation";
import img10 from './images/img10.jpg';
import img13 from './images/img13.jpg';
import img2 from './images/img2.jpg';
import img1 from './images/img1.jpg';
import { useLocation } from 'react-router-dom';




function App() {

    const location = useLocation();

  return (
      <div className="App">
          <Navigation />
             <main>
                <Routing />
             </main>
          {(location.pathname === "/home" || location.pathname === "/" ) ? (

          <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundImage: `url(${img2})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
          }}>

              <div
                  style={{
                      width: "35%",
                      backgroundColor: "#c8cbad",
                      borderRadius: "20px",
                      padding: "25px",
                      marginTop: "-300px",
                      marginLeft: "-500px",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0.6,
                      color: "#4a3430"
                  }}
              >
              <h1 style={{ fontFamily: "monospace", fontSize: "33px" }}>Welcome to Safe & Sound,</h1>
                  <p style={{ fontFamily: "monospace", fontSize: "18px" }}> the easiest and most convenient way to get around Estonia!

                      Our app connects you with a network of cars near you. Say goodbye to the hassle of car ownership and hello to the freedom of car sharing.</p>
      </div>
      </div>
          ):( location.pathname === "/signin" || location.pathname === "/register" || location.pathname === "/request" || location.pathname === "/offer") ? (
              <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                 backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
              }}>
          </div>
          ) : ( location.pathname === "/seeoffers/confirmation" || location.pathname === "/seerequests/confirmation") ? (
              <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${img10})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
              }}>
              </div>
          ) : (
              <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${img1})`, backgroundAttachment:"fixed", backgroundSize: "cover", height: "100vh"
              }}>
              </div>
          )
          }
    </div>
  );
}

export default App;

