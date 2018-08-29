import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/protectRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profiles from "./components/profiles/Profile";
import Profile from "./components/Profile/Profile";
import Notfound from "./components/notfound";

import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/Createprofile";
import EditProfile from "./components/create-profile/editProfile";
import { clearCurrentProfile } from "./actions/profileAction";
import  AddExperience  from "./components/add-credentials/addExperience";
import  AddEducation  from "./components/add-credentials/addEducation";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //clear profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route  path="/login" component={Login} />
              <Route  path="/profiles" component={Profiles} />
              <Route  path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
              <PrivateRoute  path="/create-profile" component={CreateProfile} />
              </Switch>
              <Switch>
              <PrivateRoute  path="/edit-profile" component={EditProfile} />
              </Switch>
              <Switch>
              <PrivateRoute  path="/add-experience" component={AddExperience} />
              </Switch>
              <Switch>
              <PrivateRoute  path="/add-education" component={AddEducation} />
              </Switch>
              <Route  path="/not-found" component={Notfound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
