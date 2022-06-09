import React from "react";
import PropTypes from "prop-types";

import Roles from "./roles";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort, onDelete, ...rest }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        email: {
            path: "email",
            name: "E-Mail"
        },
        roles: {
            name: "Роль",
            component: (user) => <Roles roles={user.roles} />
        },
        delete: {
            component: (user) => (
                <div className="d-flex justify-content-end">
                    <button
                        onClick={() => onDelete(user._id)}
                        className="btn btn-sm btn-danger"
                    >
                        Удалить
                    </button>
                </div>
            )
        }
    };

    return (
        <Table
            caption="Пользователи"
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UserTable;
