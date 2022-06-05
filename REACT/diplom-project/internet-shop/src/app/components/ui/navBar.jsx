import React from "react";
import { Link } from "react-router-dom";
import { appTitle } from "../../config.json";
import logo from "../../assets/brand/favicon.ico";

const NavBar = () => {
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
                            Users
                        </Link>
                    </li>
                    <li className="nav-item ms-auto">
                        <ul className="nav d-flex">
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/"
                                >
                                    Корзина
                                    <span className="position-absolute top-5 end-5 translate-middle badge rounded-pill bg-warning">
                                        10
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link "
                                    aria-current="page"
                                    to="/login"
                                >
                                    Войти
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        // <MainBar>
        //     <ul className="navbar-nav">
        //         <li className="nav-item col-lg-10">
        //             <Link className="nav-link " aria-current="page" to="/users">
        //                 Users
        //             </Link>
        //         </li>
        //         <li className="nav-item col-lg-2">
        //             <Link className="nav-link " aria-current="page" to="/login">
        //                 Login
        //             </Link>
        //         </li>
        //     </ul>
        // </MainBar>
    );
};

export default NavBar;
