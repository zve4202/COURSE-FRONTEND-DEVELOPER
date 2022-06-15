import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
function NavProfile() {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center nav-link">
                <div className="me-2">{currentUser.name}</div>
                <i className="bi bi-person"></i>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item nav-link"
                >
                    Профиль
                </Link>
                <Link to="/logout" className="dropdown-item nav-link">
                    Выход
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
