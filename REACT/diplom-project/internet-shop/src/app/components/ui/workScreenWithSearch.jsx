import React from "react";
import PropTypes from "prop-types";
import WorkScreen from "./workScreen";

const WorkScreenWithSearch = ({
    searchValue,
    onSearch,
    clearFilter,
    children
}) => {
    return (
        <WorkScreen>
            <div className="d-flex mb-3">
                <button
                    className="btn btn-secondary btn-sm me-2 text-nowrap"
                    onClick={clearFilter}
                >
                    Очистить фильтр
                </button>
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
    clearFilter: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreenWithSearch;
