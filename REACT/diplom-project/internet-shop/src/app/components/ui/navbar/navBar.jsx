import React from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../../../config.json";
import logo from "../../../assets/brand/favicon.ico";
import MenuBasket from "./menuBasket";
import MenuUser from "./menuUser";
import { useAuth } from "../../../hooks/useAuth";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <div className="container">
            <div className="card d-flex bg-light mt-1">
                <ul className="nav d-flex w-100">
                    <li className="nav-item">
                        <Link className="nav-link " aria-current="page" to="/">
                            <img
                                src={logo}
                                alt=""
                                width="24"
                                height="24"
                                className="me-1"
                            />
                            {appTitle}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/users"
                        >
                            Пользователи
                        </Link>
                    </li>
                    <li className="nav-item ms-auto">
                        <ul className="nav d-flex">
                            <li className="nav-item">
                                <MenuBasket user={currentUser} />
                            </li>
                            <li className="nav-item">
                                <MenuUser />
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;
