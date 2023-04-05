import { createRoot } from 'react-dom';
import './App.css';
import { Auth } from "./components/auth";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


function App() {

  return (
      <div className="App">
      <header>
        <h1>Safe and sound</h1>
      </header>
      <main>
          <br/><br/><br/>
          <Router>
              <div>
                  <Switch>
                          <Route path="/auth" component={Auth} />
                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/"  >
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
          </Router>
      </main>
    </div>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(<App />);
export default App;

