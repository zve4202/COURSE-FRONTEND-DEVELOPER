import React from "react";
import PropTypes from "prop-types";
import { useRole } from "../../../hooks/useRoles";
const Role = ({ roleId }) => {
    const { isLoading, getRole } = useRole();
    if (isLoading) return "Loading...";

    const { name, color } = getRole(roleId);
    return <span className={"badge mt-3 bg-" + color}>{name}</span>;
};
Role.propTypes = {
    roleId: PropTypes.string.isRequired
};

export default Role;
