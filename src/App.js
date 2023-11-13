import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./containers/NavBar";
import Home from "./containers/Home";
import Register from "./containers/Register";
import Login from "./containers/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./containers/Dashboard";
import Jobs from "./containers/Jobs";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
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
                        <NavBar />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />

                        <Switch>
                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                            <PrivateRoute exact path="/jobs" component={Jobs} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;