import React from "react";
import PropTypes from "prop-types";
import Role from "./role";
import { useRole } from "../../../hooks/useRoles";

const RolesList = ({ roles }) => {
    const { isLoading, getRole } = useRole();
    if (!isLoading) {
        return (
            <>
                {roles.map((roleId) => {
                    const role = getRole(roleId);
                    return <Role key={roleId} {...role} />;
                })}
            </>
        );
    }
    return <p>Loading...</p>;
};

RolesList.propTypes = {
    roles: PropTypes.array
};

export default RolesList;
