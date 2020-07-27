import React from 'react';
import {BrowserRouter, Router, Switch, Route, Link} from "react-router-dom";
import AddTeam from "./components/add-team.component";
import Team from "./components/Team";
import Customer from "./components/Customer";
import TeamList from "./components/TeamList"; 
import CustomerList from "./components/CustomerList"; 

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/"><img className="logo" alt="logo" src="../logo.png"></img></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link to={"/teams"} className="nav-link">Teams</Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/add"} className="nav-link">Add Team</Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/customers"} className="nav-link">Customers</Link>
                  </li>
              </ul>
          </div>
      </nav>
      <div id="mainContainer" className="container mt-3">
        <Switch>
          <Route exact path={["/", "/teams"]} component={TeamList} />
          <Route exact path="/add" component={AddTeam} />
          <Route path="/teams/:id" component={Team} />
          <Route exact path={["/", "/customers"]} component={CustomerList} />
          <Route path="/customers/:id" component={Customer} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
