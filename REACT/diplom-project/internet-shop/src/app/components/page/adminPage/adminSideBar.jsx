import React from "react";
import PropTypes from "prop-types";

import BackButton from "./backButton";
import SideBarWrapper from "../../common/wrappers/sideBar";

const AdminSideBar = ({ menu, selected, onItemSelect, children }) => {
    return (
        <SideBarWrapper
            backBtn={<BackButton />}
            {...{ menu, selected, onItemSelect }}
        >
            {children}
        </SideBarWrapper>
    );
};

AdminSideBar.propTypes = {
    menu: PropTypes.object.isRequired,
    selected: PropTypes.object.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AdminSideBar;
