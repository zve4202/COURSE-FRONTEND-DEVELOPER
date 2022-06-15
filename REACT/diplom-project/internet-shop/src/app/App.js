import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/ui/navbar";
import AuthProvider from "./hooks/useAuth";
import Basket from "./layouts/basket";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Route path="/basket" component={Basket} />
                    <Route path="/logout" component={LogOut} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
