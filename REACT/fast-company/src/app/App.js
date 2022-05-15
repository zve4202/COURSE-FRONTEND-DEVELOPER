import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./layouts/navBar";
import UserSwith from "./layouts/usersSwitch";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UserSwith} />
            </Switch>
        </div>
    );
}

export default App;
