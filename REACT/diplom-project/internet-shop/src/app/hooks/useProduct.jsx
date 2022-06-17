import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import productService from "../services/product.service";
import { toast } from "react-toastify";

const ProductContext = React.createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        getProducts();
    }, []);
    async function getProducts() {
        try {
            const { content } = await productService.fetchAllEx();
            setProducts(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function getProduct(id) {
        return products.find((user) => user._id === id);
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
        <ProductContext.Provider value={{ products, getProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
