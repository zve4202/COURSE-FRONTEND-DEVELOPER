import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MenuBasket = ({ user }) => {
    const productCount = 12;
    const productLabel = productCount > 99 ? "99+" : productCount;
    return (
        <Link className="nav-link " aria-current="page" to="/basket">
            <span>Корзина</span>
            {productCount > 0 && (
                <span className="badge rounded-pill bg-primary ms-1">
                    {productLabel}
                </span>
            )}

            {/* <span className="position-absolute top-5 end-5 translate-middle badge rounded-pill bg-primary">
                10
            </span> */}
        </Link>
    );
};

MenuBasket.propTypes = {
    user: PropTypes.object
};

export default MenuBasket;
