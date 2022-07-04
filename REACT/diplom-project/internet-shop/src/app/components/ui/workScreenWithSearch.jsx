import React from "react";
import PropTypes from "prop-types";
import WorkScreen from "./workScreen";
import debounce from "lodash.debounce";

const WorkScreenWithSearch = ({
    seacher,
    searchValue,
    onSearch,
    clearFilter,
    children
}) => {
    const handleSearchQuery = (e) => {
        onSearch && onSearch(e);
    };

    const handleInputChangeDebounced = debounce(handleSearchQuery, 500);
    return (
        <WorkScreen>
            <div className="d-flex mb-3">
                <button
                    className="btn btn-secondary btn-sm me-2 text-nowrap"
                    onClick={clearFilter}
                >
                    Очистить фильтр
                </button>
                {seacher || (
                    <input
                        type="search"
                        name="searchQuery"
                        placeholder="Поиск по названию..."
                        className="form-control"
                        onChange={handleInputChangeDebounced}
                        value={searchValue}
                    />
                )}
            </div>
            {children}
        </WorkScreen>
    );
};

WorkScreenWithSearch.propTypes = {
    seacher: PropTypes.node,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    clearFilter: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreenWithSearch;
