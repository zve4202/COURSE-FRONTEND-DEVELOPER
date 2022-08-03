import React, { useRef } from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ name, onSort, columns, data, children }) => {
    const tableEl = useRef();
    console.log(name, data);

    const handleKeyDown = (event) => {
        console.log(event.keyCode);
        if ([9, 13, 40].includes(event.keyCode)) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(
                tableEl.current.querySelectorAll("input.table-input")
            );

            const index =
                (inputs.indexOf(tableEl.current.activeElement) + 1) %
                inputs.length;
            const input = inputs[index];
            input.focus();
            input.select();
        }
        if ([38].includes(event.keyCode)) {
            event.preventDefault();
            const inputs = Array.prototype.slice.call(
                tableEl.current.querySelectorAll("input.table-input")
            );

            const index =
                (inputs.indexOf(document.activeElement) - 1) % inputs.length;
            console.log(index);
            const input = inputs[index >= 0 ? index : inputs.length - 1];
            input.focus();
            input.select();
        }
    };

    return (
        <table
            ref={tableEl}
            className="table table-hover caption-top"
            onKeyDown={handleKeyDown}
        >
            {children || (
                <>
                    <TableHeader {...{ name, onSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    name: PropTypes.string.isRequired,
    onSort: PropTypes.func,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
