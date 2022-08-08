import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { updateSetting } from "../../../store/setting";

const TableHeader = ({ name, onSort, columns, headered }) => {
    const selectedSort = useSelector(
        (state) => state.setting.config[name].sort
    );

    const dispatch = useDispatch();

    const handleSort = (sort) => {
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
        if (onSort) onSort();
    };

    const renderSort = (column) => {
        if (column.sortable) {
            if (selectedSort.name === column.name) {
                if (selectedSort.order === 1) {
                    return (
                        <span className="g-1">
                            <i className="bi bi-caret-up-fill" />
                            {column.caption}
                        </span>
                    );
                } else {
                    return (
                        <span className="g-1">
                            <i className="bi bi-caret-down-fill" />
                            {column.caption}
                        </span>
                    );
                }
            } else {
                return (
                    <span className="g-1">
                        <i className="bi bi-caret-left" />
                        {column.caption}
                    </span>
                );
            }
        }
        return <span>{column.caption}</span>;
    };

    return (
        <thead>
            <tr className="small">
                {columns.map((column, index) => {
                    return (
                        <th
                            key={index + 1}
                            {...{
                                name: headered && column.name,
                                role: headered && column.sortable && "button",
                                onClick:
                                    headered &&
                                    column.sortable &&
                                    (() => handleSort(column.name)),
                                scope: "col"
                            }}
                            style={
                                column.width
                                    ? { width: `${column.width}px` }
                                    : { width: "auto" }
                            }
                        >
                            {headered && renderSort(column)}
                        </th>
                    );
                })}
                <th className="flex-grow-1"></th>
            </tr>
        </thead>
    );
};

TableHeader.defaultProps = {
    headered: true
};

TableHeader.propTypes = {
    name: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    headered: PropTypes.bool,
    onSort: PropTypes.func
};

export default TableHeader;
