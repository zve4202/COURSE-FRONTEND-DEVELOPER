import React from "react";
import PropTypes from "prop-types";

import Role from "./roles";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({ users, onSort, selectedSort, ...rest }) => {
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
            component: (user) => <Role roleId={user.role} />
        }
    };

    return (
        <Table
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
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
