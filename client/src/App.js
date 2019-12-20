import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

// ### Stage 1 - Authentication

// Build a login form to authenticate your users.

// - [ ] Construct an AXIOS request to retrieve a token from the server. You'll use this token to interact with the API
// - [ ] Save the token to localStorage
// - [ ] Build a `axiosWithAuth` module to create an instance of axios with the authentication header
// - [ ] Build a `PrivateRoute` component and use it to protect a route that renders the `BubblesPage` component

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/build" component={BubblePage} />>
      </div>
    </Router>
  );
}

export default App;
