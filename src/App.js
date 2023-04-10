import React from 'react';
import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation';
import RequestForm from "./components/Request";


//haldi comment

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

                 </Routes>
             </main>
      </div>
  );
}



export default App;

