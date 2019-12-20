import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";

// - [ ] Build a `PrivateRoute` component and use it to protect a route that renders the `BubblesPage` component
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubble" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
