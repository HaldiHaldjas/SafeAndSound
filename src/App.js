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


function App() {

  return (
      <div className="App">
          <Navigation />
             <main>
                 <Routes>
                     <Route path="/" />
                     <Route path="request" element={<RequestForm/>}/>
                     <Route path="/signin/*" element={ <Signin/> } />
                     <Route path="/register" element={ <RegistrationForm/> } />
                     <Route path="/seeOffers/*" element={<SeeOffers />} />
                     <Route path="seeRequests" element={<SeeRequestsForm/>}/>
                     <Route path="/seeOffers/confirmation" element={<Confirmation />} />



                 </Routes>
             </main>
      </div>
  );
}



export default App;

