import React from "react";
import PropTypes from "prop-types";
import WorkScreen from "./workScreen";
import debounce from "lodash.debounce";

const WorkScreenWithSearch = ({
    placeholderText,
    searchValue,
    onSearch,
    clearFilter,
    children
}) => {
    const handleInputChangeDebounced = debounce(onSearch, 500);
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
                    type="search"
                    name="searchQuery"
                    placeholder={placeholderText || "Поиск по названию..."}
                    className="form-control"
                    onChange={handleInputChangeDebounced}
                    // value={searchValue}
                />
            </div>
            {children}
        </WorkScreen>
    );
};

WorkScreenWithSearch.propTypes = {
    placeholderText: PropTypes.string,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func,
    clearFilter: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default WorkScreenWithSearch;
