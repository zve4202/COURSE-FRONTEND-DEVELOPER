import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdmin } from "../../../store/auth";

const MenuAdmin = () => {
    const isAdmin = useSelector(getAdmin());
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
