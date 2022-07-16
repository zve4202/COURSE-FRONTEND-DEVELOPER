import React from "react";
import PropTypes from "prop-types";

const PaginationSet = ({ name, totalDocs, onPageChange, children }) => {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <Pagination
                    totalDocs={totalDocs}
                    onPageChange={onPageChange}
                    name={name}
                />
            </div>
            <div className="d-flex justify-content-center">
                <Pagination
                    totalDocs={totalDocs}
                    onPageChange={onPageChange}
                    name={name}
                />
            </div>
        </div>
    );
};

PaginationSet.propTypes = {
    name: PropTypes.string.isRequired,
    totalDocs: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PaginationSet;
