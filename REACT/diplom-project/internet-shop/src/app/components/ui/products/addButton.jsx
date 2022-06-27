import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const AddButton = ({ productId, onAdd }) => {
    const [count, setCount] = useState(0);
    const [countText, setCountText] = useState("В корзину");

    useEffect(() => {
        setCountText(count === 0 ? "В корзину" : "В корзинe");
    }, [count]);
    const handleClick = (params) => {
        setCount((prevState) => prevState + 1);
        onAdd(productId);
    };

    return (
        <div className="d-flex justify-content-end ">
            <span
                role="button"
                onClick={() => handleClick()}
                className={`btn btn-sm btn-${
                    count === 0 ? "danger" : "secondary"
                } text-nowrap`}
            >
                <i className="bi bi-cart" /> {countText}
            </span>
            {count > 0 && (
                <span className="position-absolute top-1 end-0 translate-middle badge rounded-pill bg-primary">
                    {count}
                </span>
            )}
        </div>
    );
};

AddButton.propTypes = {
    productId: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired
};
export default AddButton;
