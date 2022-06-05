import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import roleService from "../services/role.service";

const RoleContext = React.createContext();

export const useRole = () => {
    return useContext(RoleContext);
};

export const RoleProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getRolesList();
    }, []);
    function getRole(id) {
        return roles.find((role) => role._id === id);
    }
    async function getRolesList() {
        try {
            const { content } = await roleService.fetchAll();
            setRoles(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function errorCatcher(error) {
        console.log("error: ", error);
        const { message } = error.response.data || error;
        setError(message);
    }

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <RoleContext.Provider value={{ roles, isLoading, getRole }}>
            {children}
        </RoleContext.Provider>
    );
};

RoleProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
