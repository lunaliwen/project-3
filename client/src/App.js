import React from "react";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./pages/Home";
import profile from "./pages/profile";
import Detail from "./pages/Detail";
import register from "./pages/register";


function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={profile} />
        <Route exact path="/home/:id" component={Detail} />
        <Route exact path="/register" component={register} />
 
        </Switch>
    
      </div>
    </Router>

    
  );
}

export default App;
