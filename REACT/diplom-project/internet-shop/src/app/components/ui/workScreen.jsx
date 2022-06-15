import React from "react";
import PropTypes from "prop-types";

const WorkScreen = ({ children }) => {
    return (
        <div className="containercontainer-fluid">
            <div className="card-body">{children}</div>
            {/* <div className="card mt-2">
                <div className="card-body">{children}</div>
            </div> */}
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
