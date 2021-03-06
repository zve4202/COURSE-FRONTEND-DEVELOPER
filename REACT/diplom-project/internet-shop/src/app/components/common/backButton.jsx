import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const BackButton = ({ tooltip }) => {
    const history = useHistory();
    return (
        <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => history.goBack()}
            title={tooltip || "Вернуться к предыдущей странице"}
        >
            <i className="bi bi-caret-left"></i>
        </button>
    );
};

BackButton.propTypes = {
    caption: PropTypes.string,
    tooltip: PropTypes.string
};

export default BackButton;
