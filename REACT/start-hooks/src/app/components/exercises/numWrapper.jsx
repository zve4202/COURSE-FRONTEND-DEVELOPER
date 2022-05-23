import React from "react";
import PropTypes from "prop-types";

const NumWrapper = ({ children }) => {
    let num = 0;
    return React.Children.map(children, (child) => {
        num++;
        const newChild = (
            <div className="row">
                <div className="col-auto">{num}</div>
                <div className="col">{child}</div>
            </div>
        );
        return newChild;
    });
};

NumWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default NumWrapper;
