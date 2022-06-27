import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/ui/navbar";
import Basket from "./layouts/basket";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { getAuthLoading, loadAuthUser } from "./store/auth";

import configureStore from "./store";

export const store = configureStore();

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(getAuthLoading());

    useEffect(() => {
        dispatch(loadAuthUser());
    }, []);

    return (
        <div>
            <NavBar />
            {!isLoading && (
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
            )}
            <ToastContainer />
        </div>
    );
}

export default App;