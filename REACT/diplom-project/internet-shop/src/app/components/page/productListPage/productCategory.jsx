import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setSeachParams } from "../../../store/products";
import { getCategories } from "../../../store/categories";
import classNames from "classnames";

const CategoryList = ({ onItemSelect }) => {
    const dispatch = useDispatch();
    const categories = useSelector(getCategories());
    const selectedItem = useSelector((state) => state.products.search.category);
    const handleSelectQuery = (id) => {
        dispatch(setSeachParams({ category: id }));
        onItemSelect();
    };

    return (
        <ul className="list-group">
            {categories.map((item) => (
                <li
                    key={item._id}
                    className={classNames({
                        "list-group-item": true,
                        active: item._id === selectedItem
                    })}
                    onClick={() => handleSelectQuery(item._id)}
                    role="button"
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

CategoryList.propTypes = {
    onItemSelect: PropTypes.func.isRequired
};

export default CategoryList;
