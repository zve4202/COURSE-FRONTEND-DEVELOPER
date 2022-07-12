import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { updateSetting } from "../../../store/setting";

const TableHeader = ({ name, onSort, columns }) => {
    const selectedSort = useSelector(
        (state) => state.setting.config[name].sort
    );

    // console.log("selectedSort", selectedSort);
    const dispatch = useDispatch();

    const handleSort = (sort) => {
        console.log(sort);
        let newsort = { ...selectedSort };
        if (selectedSort.sort === sort) {
            newsort.order = selectedSort.order === 1 ? -1 : 1;
        } else {
            newsort = { sort, order: 1 };
        }
        dispatch(
            updateSetting(name, {
                sort: {
                    ...newsort
                }
            })
        );
        onSort();
    };

    const rendeSortArrow = (sort) => {
        if (selectedSort.sort === sort) {
            if (selectedSort.order === 1) {
                return <i className="bi bi-caret-up"></i>;
            } else {
                return <i className="bi bi-caret-down"></i>;
            }
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    const colClass =
                        "text-muted " + columns[column].class || "";
                    return (
                        <th
                            className={colClass}
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}{" "}
                            {rendeSortArrow(columns[column].path)}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    name: PropTypes.string.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
