import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/layouts/NavBar";
import Index from "./components/layouts/Index";
import { Provider } from "./context";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
