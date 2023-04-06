import './App.css';
import { Signin } from "./components/Signin";
import RegistrationForm from "./components/RegistrationForm";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Button from "@mui/material/Button";


function App() {

  return (
      <div className="App">
      <header>
        <h1>Safe and sound</h1>
      </header>
      <main>
          <br/><br/><br/>
            <Router>
                  <Switch>


                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/"  >
                              <Signin>Sign in</Signin>

                              <br/>
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


export default App;

