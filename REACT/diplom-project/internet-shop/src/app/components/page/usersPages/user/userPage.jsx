import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser, loadUsers } from "../../../../store/users";
import { loadRoles } from "../../../../store/roles";
import WorkScreen from "../../../ui/workScreen";
import UserSideBar from "./userSidebar";
import { updateSetting } from "../../../../store/setting";
import UserEditPage from "./userEditPage";
import UserOrders from "../orders";

export const userPathes = {
    pathEdit: "edit",
    pathOrders: "orders"
};
const menu = [
    { path: userPathes.pathOrders, name: "ЗАКАЗЫ", icon: "bi-cash" },
    { path: userPathes.pathEdit, name: "ИЗМЕНИТЬ ДАННЫЕ", icon: "bi-gear" }
];

const UserPage = ({ userId }) => {
    const name = "users";
    const selectedMenu = useSelector(
        (state) => state.setting.config[name].selectedMenu
    );

    // const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));

    useEffect(() => {
        if (!user) {
            dispatch(loadRoles());
            dispatch(loadUsers());
        }
    }, []);

    const onItemSelect = (item) => {
        dispatch(
            updateSetting(name, {
                selectedMenu: item
            })
        );
    };

    return (
        <WorkScreen>
            <div className="d-flex">
                <UserSideBar
                    user={user}
                    menu={menu}
                    selected={selectedMenu}
                    onItemSelect={onItemSelect}
                />
                <div className="content_wrapper card bg-light p-2">
                    {selectedMenu.path === userPathes.pathEdit && (
                        <UserEditPage />
                    )}
                    {selectedMenu.path === userPathes.pathOrders && (
                        <UserOrders />
                    )}
                </div>
            </div>
        </WorkScreen>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
