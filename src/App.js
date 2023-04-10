import './App.css';
import { Auth } from "./components/auth";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from "@mui/material/Button";
import RequestForm from "./components/RequestForm"

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

