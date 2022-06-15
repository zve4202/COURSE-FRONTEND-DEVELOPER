import React from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../../../config.json";
import logo from "../../../assets/brand/favicon.ico";
import MenuBasket from "./menuBasket";
import { useAuth } from "../../../hooks/useAuth";
import MenuAdmin from "./menuAdmin";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser, isAdmin } = useAuth();
    return (
        <nav className="navbar bg-light card mt-1">
            <div className="container-fluid">
                {/* <div className="card d-flex bg-light mt-1"> */}
                <ul className="nav">
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
                    {currentUser && isAdmin && (
                        <li className="nav-item">
                            <MenuAdmin />
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    <MenuBasket user={currentUser} />
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link
                            className="nav-link "
                            aria-current="page"
                            to="/login"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
            {/* </div> */}
        </nav>
    );
};

export default NavBar;
