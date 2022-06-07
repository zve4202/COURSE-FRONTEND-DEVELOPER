import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import "react-toastify/dist/ReactToastify.css";
import { QualityProvider } from "./hooks/useQuality";

function App() {
    return (
        <div>
            <NavBar />
            <ProfessionProvider>
                <QualityProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </QualityProvider>
            </ProfessionProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
