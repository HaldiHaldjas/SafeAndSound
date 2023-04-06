import React from 'react';
import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { Routes, Route } from "react-router-dom";
import Button from "@mui/material/Button";
import Navigation from './components/Navigation';
import Routing from './Routing'
import RequestForm from "./components/Request";


function App() {

  return (
      <div className="App">
          <Navigation />
             <main>
                 <Routes>
                     <Route path="/" />
                     <Route path="request" element={<RequestForm/>}/>
                     <Route path="/signin" element={ <Signin/> } />
                     <Route path="/register" element={ <RegistrationForm/> } />

                 </Routes>
             </main>
      </div>
  );
}

/*
          <br/><br/><br/>
            <Router>
                  <Switch>


                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/"  >
                              <Signin>Sign in</Signin>
                               <br/>


                              <Route></Route>
                                <Button variant="contained"
                                        sx={{backgroundColor: "#add8e6",
                                            '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#3c52b2',}}}>
                                            <Link to="/register">Register</Link></Button>
                          </Route>
                      </Switch>
            </Router>
      </main>
    </div>
  );
}
*/


export default App;

