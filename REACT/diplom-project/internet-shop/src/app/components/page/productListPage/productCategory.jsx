import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";

import { getCategories } from "../../../store/categories";
import classNames from "classnames";

const CategoryList = ({ name, onItemSelect }) => {
    const categories = useSelector(getCategories());
    if (!categories) return null;

    const dispatch = useDispatch();
    const query = useSelector((state) => state.setting.config[name].query);

    const handleSelectQuery = (id) => {
        dispatch(
            updateSetting(name, {
                query: {
                    ...query,
                    category: id
                }
            })
        );
        onItemSelect();
    };

    return (
        <div className="sidebar_wrapper p-2 card bg-light flex-column me-2 h-100">
            <ul className="list-group">
                <li
                    key="item_clear"
                    className={classNames({
                        "list-group-item btn-secondary": true,
                        disabled: !query.category
                    })}
                    onClick={() => handleSelectQuery(null)}
                    role="button"
                >
                    ВСЕ КАТЕГОРИИ
                </li>
                {categories.map((item) => (
                    <li
                        key={item._id}
                        className={classNames({
                            "list-group-item": true,
                            active: item._id === query.category
                        })}
                        onClick={() => handleSelectQuery(item._id)}
                        role="button"
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

CategoryList.propTypes = {
    name: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};

export default CategoryList;
