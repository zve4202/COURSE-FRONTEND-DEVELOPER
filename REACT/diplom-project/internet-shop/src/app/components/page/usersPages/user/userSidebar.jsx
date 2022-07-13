import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import SideBarWrapper from "../../../common/sideBar";

const UserSideBar = ({ user, menu, selected, onItemSelect, children }) => {
    const { roles } = useSelector((state) => state);
    const getRole = (id) => {
        if (roles.isLoading) {
            return "загрузка";
        }
        return roles.entities.find((role) => role._id === id).name;
    };
    return (
        <SideBarWrapper caption="Профиль пользователя ">
            {user && (
                <div className="card mb-3">
                    <div className="card-header text-lg text-black">
                        {user.name}
                    </div>
                    <div className="card-body text-lg">
                        <div className="form-control-plaintext">
                            {user.email}
                        </div>
                        <div className="form-control-plaintext">
                            {getRole(user.role)}
                        </div>
                    </div>
                </div>
            )}
            {menu &&
                menu.map((item) => (
                    <div
                        key={item.path}
                        className={classNames({
                            "list-group-item": true,
                            active: item.path === selected.path
                        })}
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        <i className={`bi ${item.icon} me-2`}></i>
                        {item.name}
                    </div>
                ))}
        </SideBarWrapper>
    );
};

UserSideBar.propTypes = {
    user: PropTypes.object.isRequired,
    menu: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserSideBar;
