import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import classNames from "classnames";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(itemsCount / pageSize);
    if (totalPages === 1) return null;

    const showPages = 10;
    const halfPages = showPages / 2;

    let startPage, endPage;
    if (totalPages <= showPages) {
        // less than showPages total pages so show all
        startPage = 1;
        endPage = totalPages;
    } else {
        // more than showPages total pages so calculate start and end pages
        if (currentPage <= halfPages + 1) {
            startPage = 1;
            endPage = showPages;
        } else if (currentPage + (halfPages - 1) >= totalPages) {
            startPage = totalPages - (showPages - 1);
            endPage = totalPages;
        } else {
            startPage = currentPage - halfPages;
            endPage = currentPage + (halfPages + 1);
        }
    }

    const pages = _.range(startPage, endPage + 1);

    const renderPageButton = (page) => {
        const linkClass = classNames({
            "page-item": true,
            active: page === currentPage
        });
        return (
            <li className={linkClass} key={"page_" + page}>
                <a
                    className="page-link"
                    onClick={() => onPageChange(page)}
                    role="button"
                >
                    {page}
                </a>
            </li>
        );
    };

    const renderFirstButtons = () => {
        const linkClass = classNames({
            "page-item": true,
            disabled: currentPage === 1
        });
        return (
            <>
                <li className={linkClass}>
                    <a
                        className="page-link"
                        onClick={() => onPageChange(1)}
                        role="button"
                    >
                        В начало
                    </a>
                </li>
                <li className={linkClass}>
                    <a
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        role="button"
                        aria-label="Предыдущая"
                    >
                        <span aria-hidden="true">&laquo;</span>
                        {/* <span className="sr-only">Предыдущая</span> */}
                    </a>
                </li>
            </>
        );
    };

    const renderLastButtons = () => {
        const linkClass = classNames({
            "page-item": true,
            disabled: currentPage === totalPages
        });
        return (
            <>
                <li className={linkClass}>
                    <a
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        role="button"
                        aria-label="Следующая"
                    >
                        <span aria-hidden="true">»</span>
                        {/* <span className="sr-only">Следующая</span> */}
                    </a>
                </li>
                <li className={linkClass}>
                    <a
                        className="page-link"
                        onClick={() => onPageChange(totalPages)}
                        role="button"
                    >
                        В конец
                    </a>
                </li>
            </>
        );
    };

    return (
        <nav>
            <ul className="pagination">
                {totalPages > showPages && renderFirstButtons()}
                {pages.map((page) => renderPageButton(page))}
                {totalPages > showPages && renderLastButtons()}
            </ul>
        </nav>
    );
};
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
