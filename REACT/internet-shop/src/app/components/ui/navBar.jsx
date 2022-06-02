import React from "react";
import { Link } from "react-router-dom";
import MainBar from "../common/mainBar";
const NavBar = () => {
    return (
        <MainBar>
            <ul className="navbar-nav col">
                <li className="nav-item col">
                    <Link className="nav-link " aria-current="page" to="/users">
                        Users
                    </Link>
                </li>
                <li className="d-flex nav-item col end-50">
                    <Link className="nav-link " aria-current="page" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </MainBar>
    );
};

export default NavBar;
