import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserLink = ({ name, id }) => {
    return <Link to={`/users/${id}`}>{name}</Link>;
};

UserLink.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};
export default UserLink;
