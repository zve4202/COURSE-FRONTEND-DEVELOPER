import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const MenuUser = () => {
    const { currentUser, signOut } = useAuth();

    return (
        <ul className="nav d-flex">
            <li className="nav-item">
                {currentUser ? (
                    <Link
                        className="nav-link "
                        aria-current="page"
                        to={`/users/${currentUser._id}`}
                    >
                        {currentUser.name}
                    </Link>
                ) : (
                    <Link className="nav-link" aria-current="page" to="/login">
                        Войти
                    </Link>
                )}
            </li>
            {currentUser && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        aria-current="page"
                        to="/"
                        onClick={signOut}
                    >
                        Выход
                    </Link>
                </li>
            )}
        </ul>
    );
};

MenuUser.propTypes = {
    currentUser: PropTypes.object,
    signOut: PropTypes.func
};

export default MenuUser;
