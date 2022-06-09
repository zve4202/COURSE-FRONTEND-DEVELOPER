import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navBar";
import Basket from "./layouts/basket";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Main} />
                <Route path="/basket" component={Basket} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
