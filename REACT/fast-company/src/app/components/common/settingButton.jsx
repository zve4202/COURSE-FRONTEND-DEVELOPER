import React from "react";
import PropTypes from "prop-types";

const SettingButton = ({ onClick }) => {
    return (
        <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={onClick}
        >
            <i className="bi bi-gear"></i>
        </button>
    );
};

SettingButton.propTypes = {
    onClick: PropTypes.func
};

export default SettingButton;
