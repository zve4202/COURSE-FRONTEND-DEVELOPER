import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/ui/navbar";
import Basket from "./layouts/basket";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Admin from "./layouts/admin";
import Users from "./layouts/users";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { getAuthLoading, loadAuthUser } from "./store/auth";

import configureStore from "./store";
import { loadSetting } from "./store/setting";
import { loadBasket } from "./store/basket";

export const store = configureStore();

function App() {
    const dispatch = useDispatch();
    const isLoading = useSelector(getAuthLoading());

    useEffect(() => {
        dispatch(loadSetting());
        dispatch(loadAuthUser());
        dispatch(loadBasket());
    }, []);

    return (
        <div>
            <NavBar />
            {!isLoading && (
                <Switch>
                    <ProtectedRoute path="/users" exact component={Admin} />
                    <ProtectedRoute path="/products" exact component={Admin} />
                    <ProtectedRoute
                        path="/users/:userId/:edit?"
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
