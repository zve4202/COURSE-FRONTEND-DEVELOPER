import React from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";

import { filterProducts, setSeachParams } from "../../../store/products";

const ProductSearch = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.products.search.search);

    const dispatchFilter = async () => {
        dispatch(filterProducts());
    };
    const handleDispatchFilterDebounced = debounce(dispatchFilter, 500);

    const handleSearchQuery = ({ target }) => {
        dispatch(setSeachParams({ text: target.value }));
        handleDispatchFilterDebounced();
    };

    return (
        <input
            type="search"
            name="searchQuery"
            placeholder="Поиск по артисту и названию альбома..."
            className="form-control"
            onChange={handleSearchQuery}
            value={searchQuery}
        />
    );
};

export default ProductSearch;
