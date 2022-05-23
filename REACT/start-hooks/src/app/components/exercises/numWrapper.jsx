import React from "react";
import PropTypes from "prop-types";

const NumWrapper = ({ children }) => {
    let npp = 0;
    return React.Children.map(children, (child) => {
        npp++;
        const config = {
            ...child.props,
            num: npp
        };
        return React.cloneElement(child, config);
    });
};

NumWrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default NumWrapper;
