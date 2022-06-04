import React from "react";
import PropTypes from "prop-types";

const MainScreen = ({ searchValue, onSearch, children }) => {
    return (
        <div className="container">
            <div className="card mt-2 p-3">
                <input
                    type="text"
                    name="searchQuery"
                    placeholder="Поиск по названию..."
                    className="form-control"
                    onChange={onSearch}
                    value={searchValue}
                />
            </div>
            {children}
        </div>
    );
};

MainScreen.propTypes = {
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default MainScreen;
