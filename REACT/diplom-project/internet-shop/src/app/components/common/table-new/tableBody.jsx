import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const TableBody = ({ data, columns, loading }) => {
    const renderContent = (item, column, index) => {
        if (column.component) {
            const component = column.component;
            if (typeof component === "function") {
                return component({ ...item, index });
            }
            return component;
        }
        return _.get(item, column.name);
    };
    return (
        <tbody>
            {loading || data.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1}>
                        <div className="w-100 text-center">
                            {loading ? "Загрузка данных..." : "Нет данных"}
                        </div>
                    </td>
                </tr>
            ) : (
                data.map((item) => (
                    <tr key={item._id}>
                        {columns.map((column, index) => (
                            <td key={index + 1}>
                                {renderContent(item, column, index)}
                            </td>
                        ))}
                        <td className="flex-grow-1"></td>
                    </tr>
                ))
            )}
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired
};

export default TableBody;
