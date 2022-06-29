import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataLoaded, loadUsersList } from "../../../store/users";

const UsersLoader = ({ children }) => {
    const dataLoaded = useSelector(getDataLoaded());
    const dispatch = useDispatch();

    useEffect(() => {
        if (!dataLoaded) dispatch(loadUsersList());
    }, []);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UsersLoader;
