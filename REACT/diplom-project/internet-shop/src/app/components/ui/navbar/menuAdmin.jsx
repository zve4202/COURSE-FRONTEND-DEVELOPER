import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const MenuAdmin = () => {
    const { isAdmin } = useAuth();
    if (isAdmin) {
        return (
            <Link className="nav-link " aria-current="page" to="/users">
                Пользователи
            </Link>
        );
    }
    return null;
};

export default MenuAdmin;
