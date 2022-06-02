import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { appTitle } from "../../config.json";
import logo from "../../assets/brand/logo.svg";

const MainBar = ({ children }) => {
    return (
        <header className="p-3 bg-dark text-white border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link
                        className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none"
                        to="/"
                    >
                        <img
                            src={logo}
                            alt=""
                            width="24"
                            height="24"
                            // className="d-inline-block align-text-top"
                        />
                        {" " + appTitle}
                        {/* {appTitle} */}
                    </Link>
                    <div className="navbar-nav row">{children}</div>
                </div>
            </div>
        </header>
    );
};

MainBar.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default MainBar;
