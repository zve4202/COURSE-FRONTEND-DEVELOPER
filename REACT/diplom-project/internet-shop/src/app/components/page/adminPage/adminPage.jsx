import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUsers } from "../../../store/users";

import WorkScreen from "../../ui/workScreen";
import CategoryList from "../usersPages/usersCategory";
import UsersListPage from "../usersPages/usersListPage";
import AdminSideBar from "./adminSideBar";

export const adminPathes = {
    pathUsers: "/users",
    pathProducts: "/products"
};
const menu = [
    { path: adminPathes.pathUsers, name: "ПОЛЬЗОВАТЕЛИ" },
    { path: adminPathes.pathProducts, name: "ТОВАРЫ" }
];

const AdminPage = () => {
    const history = useHistory();

    const name = history.location.pathname.slice(1);

    // console.log(name);
    const dispatch = useDispatch();

    const onItemSelect = (path) => {
        history.push(path);
    };

    const onFilter = () => {
        if (history.location.pathname === adminPathes.pathUsers) {
            dispatch(loadUsers());
        }
    };

    return (
        <WorkScreen>
            <div className="d-flex">
                <AdminSideBar
                    menu={menu}
                    selected={history.location.pathname}
                    onItemSelect={onItemSelect}
                >
                    {history.location.pathname === adminPathes.pathUsers && (
                        <div className="mt-3">
                            <CategoryList name={name} onItemSelect={onFilter} />
                        </div>
                    )}
                </AdminSideBar>
                <div className="content_wrapper card bg-light p-2">
                    {history.location.pathname === adminPathes.pathUsers && (
                        <UsersListPage />
                    )}
                </div>
            </div>
        </WorkScreen>
    );
};

export default AdminPage;
