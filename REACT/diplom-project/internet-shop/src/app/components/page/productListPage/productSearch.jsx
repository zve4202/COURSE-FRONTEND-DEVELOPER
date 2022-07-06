import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setSeachParams } from "../../../store/products";

const ProductSearch = ({ onSearch }) => {
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.products.search.text);

    const handleSearchQuery = ({ target }) => {
        dispatch(setSeachParams({ text: target.value }));
        onSearch();
    };

    return (
        <input
            type="search"
            name="searchQuery"
            placeholder="Поиск по артисту и названию альбома..."
            className="form-control"
            onChange={handleSearchQuery}
            value={searchText}
        />
    );
};

ProductSearch.propTypes = {
    onSearch: PropTypes.func.isRequired
};
export default ProductSearch;
