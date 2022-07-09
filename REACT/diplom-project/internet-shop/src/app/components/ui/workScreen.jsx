import React from "react";
import PropTypes from "prop-types";

const WorkScreen = ({ children }) => {
    return (
        <div className="cord">
            <div className="card-body">{children}</div>
        </div>
    );
};

WorkScreen.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreen;
