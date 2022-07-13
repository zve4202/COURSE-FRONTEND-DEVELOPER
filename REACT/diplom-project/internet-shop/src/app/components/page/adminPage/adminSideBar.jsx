import React from "react";
import PropTypes from "prop-types";

import classNames from "classnames";

import SideBarWrapper from "../../common/sideBar/sideBarWrapper";
import BackButton from "./backButton";

const AdminSideBar = ({ menu, selected, onItemSelect, children }) => {
    return (
        <SideBarWrapper backBtn={<BackButton />} caption="Меню администратора">
            <ul className="list-group">
                {menu.map((item) => (
                    <li
                        key={item.path}
                        className={classNames({
                            "list-group-item": true,
                            active: item.path === selected
                        })}
                        onClick={() => onItemSelect(item.path)}
                        role="button"
                    >
                        {item.name}
                    </li>
                ))}
                {children}
            </ul>
        </SideBarWrapper>
    );
};

AdminSideBar.propTypes = {
    menu: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AdminSideBar;
