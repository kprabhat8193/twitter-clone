import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Feed from "./Feed";
import { useStateValue } from "./StateProvider";
import LoginScreen from "./LoginScreen";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route path="/explore">
              <Sidebar isActive="explore" />
            </Route>
            <Route path="/notifications">
              <Sidebar isActive="notifications" />
            </Route>
            <Route path="/messages">
              <Sidebar isActive="messages" />
            </Route>
            <Route path="/bookmarks">
              <Sidebar isActive="bookmarks" />
            </Route>
            <Route path="/lists">
              <Sidebar isActive="lists" />
            </Route>
            <Route path="/profile">
              <Sidebar isActive="profile" />
            </Route>
            <Route path="/more">
              <Sidebar isActive="more" />
            </Route>
            <Route path="/">
              <Sidebar isActive="home" />
              <Feed />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
