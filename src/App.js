import ReactDOM from "react-dom";
import { render } from 'react-dom';

import {useEffect, useState} from "react";
import './App.css';
import { Auth } from "./components/auth";
import { database } from "./config/firebase";
import {getDocs, collection, addDoc} from "firebase/firestore"
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";


function App() {

  return (
      <div className="App">
      <header>
        <h1>Safe and sound</h1>
      </header>
      <main>
          <br/><br/><br/>
          <BrowserRouter>
              <div>
                  <Switch>
                          <Route path="/auth" component={Auth} />
                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/">
                              <Link to="/auth">
                                  <button className="button" style={{width: "100px", padding: "20px"}}>Log in</button>
                              </Link>

                              <br/>

                              <Link to="/register">
                                  <button className="button" style={{width: "100px", padding: "20px"}}>Register</button>
                              </Link>


                          </Route>
                      </Switch>
              </div>
          </BrowserRouter>
      </main>
    </div>
  );
}



ReactDOM.render(<App />, document.getElementById('root'));
export default App;


/*   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const [newFirstName, setNewFirstName] = useState("")
   const [newLastName, setNewLastName] = useState("")
   const [newEmail, setNewEmail] = useState("")
   const [newPhone, setNewPhone] = useState(0)
   const [isNewUserDriver, setIsNewUserDriver] = useState(false)




   const usersCollectionRef = collection(database, "users")

   const onSubmitUser = async () => {
       try {
       await addDoc(usersCollectionRef, {
           first_name: newFirstName,
           last_name: newLastName,
           email: newEmail,
           phone: newPhone,
           driver: isNewUserDriver
       });
       } catch (err) {
           console.error(err)
       }
   }
*/


      /*    <div>
              <h3>Sign up</h3>
              <input placeholder="First name" onChange={(e) => setNewFirstName(e.target.value)}/>
              <input placeholder="Last name" onChange={(e) => setNewLastName(e.target.value)}/>
              <input placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/>
              <input placeholder="Phone" type="number"onChange={(e) => setNewPhone(Number(e.target.value))}/>
              <input type="checkbox" onChange={(e) => setIsNewUserDriver(e.target.checked)}/>
              <label>I also want to be a driver</label>
              <button onClick={onSubmitUser}>Registrate</button>
              <a href="Login">I already have an account</a>
              <div>
                  {users.map((user) => (
                      <div>
                          <p>{user.first_name}</p>
                          <p>{user.last_name}</p>
                      </div>
                  ))}
              </div>
          </div>
          </div>*!/}*/