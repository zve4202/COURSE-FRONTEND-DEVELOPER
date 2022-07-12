import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAdmin } from "../../../store/auth";

const MenuAdmin = () => {
    const isAdmin = useSelector(getAdmin());
    return (
        isAdmin && (
            <Link className="nav-link " aria-current="page" to="/users">
                Админ-меню
            </Link>
        )
    );
};

export default MenuAdmin;
