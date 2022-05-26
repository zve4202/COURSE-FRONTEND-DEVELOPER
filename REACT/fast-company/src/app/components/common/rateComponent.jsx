import React from "react";
import PropTypes from "prop-types";

const RateComponent = ({ rate }) => {
    return (
        <div className="text-muted">
            <i
                className="
            bi bi-caret-down-fill
            text-primary
        "
                role="button"
            ></i>
            <i
                className="
            bi bi-caret-up
            text-secondary
        "
                role="button"
            ></i>
            <span className="ms-2">{rate}</span>
        </div>
    );
};

RateComponent.propTypes = {
    rate: PropTypes.number
};

export default RateComponent;
