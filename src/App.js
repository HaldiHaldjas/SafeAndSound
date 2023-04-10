import React from 'react';
import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import Navigation from './components/Navigation';
import Routing from './Routing'
import RequestForm from "./components/Request";
import SeeData from "./components/SeeData";



function App() {

    return (
        <div className="App">
            <Navigation />
            <main>
                <Routes>
                    <Route path="/request" element={<RequestForm/>}/>
                    <Route path="/signin" element={<Signin/>} />
                    <Route path="/register" element={<RegistrationForm/>} />
                    <Route path="/seedata" element={<SeeData />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
