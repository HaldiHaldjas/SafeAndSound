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
      <header>
        <h1>Safe and sound</h1>
      </header>
      <main>
          <br/><br/><br/>
            <Router>
                  <Switch>

                      {/*<Route path="/auth" component={Auth} />*/}
                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/"  >
                              <Auth>Sign in</Auth>
                              {/*<Link to="/auth">Log in</Link>*/}
                              <br/>
                                <Button variant="contained"
                                        sx={{backgroundColor: "#add8e6",
                                            '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#3c52b2',}}}>
                                            <Link to="/register">Register</Link></Button>
                              <Button variant="contained"
                                      sx={{backgroundColor: "#add8e6",
                                          '&:hover': {
                                              backgroundColor: '#fff',
                                              color: '#3c52b2',}}}>
                                  <Link to="/request">Add a request</Link>
                              </Button>
                          </Route>
                          <Route path="/request" component={RequestForm}>
                              {/*<Button variant="contained"
                                         sx={{backgroundColor: "#add8e6",
                                          '&:hover': {
                                        backgroundColor: '#fff',
                                        color: '#3c52b2',}}}>
                                            <Link to="/request">Add a request</Link>
                                </Button>*/}
                          </Route>
                      </Switch>
            </Router>
      </main>
    </div>
  );
}


export default App;

