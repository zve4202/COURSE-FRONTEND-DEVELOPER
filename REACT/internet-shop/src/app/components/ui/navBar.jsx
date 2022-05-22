import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/users">
                        Users
                    </Link>
                </li>
                <li className="nav-item col-md-1 ms-auto">
                    <Link className="nav-link " aria-current="page" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
