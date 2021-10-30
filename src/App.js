import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import Header from "./Header";

function App() {
  return (
    <div className="App main">
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path="/user/:id" component={UserPage} />
            <Route exact path="/" component={HomePage} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
