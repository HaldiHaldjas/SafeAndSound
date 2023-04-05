import { createRoot } from 'react-dom/client';
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
                  <Switch>
                          <Route path="/auth" component={Auth} />
                          <Route path="/register" component={RegistrationForm} />
                          <Route path="/"  >
                              <Link to="/auth">Log in</Link>
                              <br/>
                              <Link to="/register">Register</Link>
                          </Route>
                      </Switch>
          </Router>
      </main>
    </div>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(<App />);
export default App;

