import React from "react";
import PropTypes from "prop-types";
import BackButton from "../backButton";

const SideBarWrapper = ({ backBtn, caption, children }) => {
    return (
        <div className="sidebar_wrapper p-2 card bg-light flex-column me-2 h-100">
            <div className="mb-3">{backBtn || <BackButton />}</div>
            {caption && (
                <div className="card-header list-group-item-success mb-3">
                    <i className="bi bi bi-gear me-2" />
                    {caption}
                </div>
            )}
            {children}
        </div>
    );
};

SideBarWrapper.propTypes = {
    backBtn: PropTypes.node.isRequired,
    caption: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default SideBarWrapper;
