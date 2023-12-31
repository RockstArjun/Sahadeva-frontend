import axios from "axios";
import React, { useRef } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Admin from "./components/admin";
import Chat from "./components/chat";
import Home from "./components/pages/Home";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";

function App() {
  const axiosClient = useRef(
    axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
      responseType: "json",
    })
  );

  return (
    <>
      <Router>
        <video src="/videos/video-1.mp4" autoPlay loop muted />

        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Home axiosClient={axiosClient} />
          </Route>
          <Route path="/login" exact>
            <SignIn axiosClient={axiosClient} />
          </Route>
          <Route path="/chat" exact>
            <Chat axiosClient={axiosClient} />
          </Route>
          <Route path="/admin" exact>
            <Admin axiosClient={axiosClient} />
          </Route>
          <Route path="/admin-signIn" exact>
            <SignIn axiosClient={axiosClient} />
          </Route>
          <Route path="/admin-signUp" exact>
            <SignUp axiosClient={axiosClient} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
