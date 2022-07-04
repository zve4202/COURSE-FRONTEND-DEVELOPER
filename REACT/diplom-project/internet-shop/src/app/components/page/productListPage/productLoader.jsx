import React from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

const ProductLoader = ({ children }) => {
    const { isLoading, error } = useSelector((state) => state.products);

    const loadDiv = () => {
        if (isLoading || error) {
            return (
                <div className="card mb-3">
                    {isLoading ? (
                        <div className="card-body">Загрузка данных...</div>
                    ) : (
                        error && (
                            <div className="card-body text-danger">{error}</div>
                        )
                    )}
                </div>
            );
        }

        return null;
    };
    return (
        <div className="d-flex flex-column w-100 h-100">
            {loadDiv() || children}
        </div>
    );
};

ProductLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProductLoader;
