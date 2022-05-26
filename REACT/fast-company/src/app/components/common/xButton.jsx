import React from "react";
import PropTypes from "prop-types";

const XButton = ({ onClick }) => {
    return (
        <button
            className="btn btn-sm text-primary d-flex align-items-center"
            onClick={onClick}
        >
            <i className="bi bi-x-lg"></i>
        </button>
    );
};

XButton.propTypes = {
    onClick: PropTypes.func
};

export default XButton;
