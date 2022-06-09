import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import categoryService from "../services/category.service";
import { toast } from "react-toastify";

const CategoryContext = React.createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [categories, setCategory] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getCategories();
    }, []);
    async function getCategories() {
        try {
            const { content } = await categoryService.fetchAll();
            setCategory(content);
        } catch (error) {
            console.log(error);
            errorCatcher(error);
        }
    }

    function getCategory(id) {
        return categories.find((user) => user._id === id);
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
        <CategoryContext.Provider value={{ categories, getCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

CategoryProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
