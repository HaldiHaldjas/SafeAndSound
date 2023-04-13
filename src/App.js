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
import Confirmation from "./components/Confirmation";
import Profile from "./components/Profile";
import Routing from "./Routing";


function App() {

  return (
      <div className="App">
          <Navigation />
             <main>
                <Routing />
             </main>
      </div>
  );
}



export default App;

