import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import formatService from "../services/format.service";
import { toast } from "react-toastify";

const FormatContext = React.createContext();

export const useFormat = () => {
    return useContext(FormatContext);
};

export const FormatProvider = ({ children }) => {
    const [formats, setCormats] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getCategories();
    }, []);
    async function getCategories() {
        try {
            const { content } = await formatService.fetchAll();
            setCormats(content);
        } catch (error) {
            console.log(error);
            errorCatcher(error);
        }
    }

    function getFormat(id) {
        return formats.find((format) => format._id === id);
    }
    function errorCatcher(error) {
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
        <FormatContext.Provider value={{ formats, getFormat }}>
            {children}
        </FormatContext.Provider>
    );
};

FormatProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
