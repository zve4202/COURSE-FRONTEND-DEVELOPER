import React from "react";
import PropTypes from "prop-types";
import WorkScreen from "./workScreen";

const WorkScreenWithSearch = ({ searchValue, onSearch, children }) => {
    return (
        <WorkScreen>
            <div className="mb-3">
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
        </WorkScreen>
    );
};

WorkScreenWithSearch.propTypes = {
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreenWithSearch;
