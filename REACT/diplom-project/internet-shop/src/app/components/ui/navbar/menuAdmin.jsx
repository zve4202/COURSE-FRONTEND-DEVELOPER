import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const MenuAdmin = () => {
    const { isAdmin } = useAuth();
    if (isAdmin) {
        return (
            <ul className="nav d-flex">
                <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/users">
                        Пользователи
                    </Link>
                </li>
            </ul>
        );
    }
    return null;
};

export default MenuAdmin;
