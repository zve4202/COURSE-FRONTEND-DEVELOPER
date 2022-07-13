import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const BackButton = ({ caption, tooltip }) => {
    const history = useHistory();
    return (
        <button
            className="btn btn-outline-secondary w-100"
            onClick={() => history.goBack()}
            title={tooltip || "Вернуться к предыдущей форме"}
        >
            <i className="bi bi-caret-left"></i>
            {caption || "Назад"}
        </button>
    );
};

BackButton.propTypes = {
    caption: PropTypes.string,
    tooltip: PropTypes.string
};

export default BackButton;
