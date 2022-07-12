import React from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../../../config.json";
import logo from "../../../assets/brand/favicon.ico";
import MenuBasket from "./menuBasket";
import MenuAdmin from "./menuAdmin";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getAdmin, getAuth } from "../../../store/auth";

const NavBar = () => {
    const currentUser = useSelector(getAuth());
    const isAdmin = useSelector(getAdmin());
    return (
        <header className="sticky-top">
            <nav className="navbar card bg-light-gray">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                aria-current="page"
                                to="/"
                            >
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
                        {currentUser && isAdmin && (
                            <li className="nav-item">
                                <MenuAdmin />
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        <MenuBasket />
                        <NavProfile />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
