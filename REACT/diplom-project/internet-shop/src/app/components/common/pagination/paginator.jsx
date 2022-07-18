import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SelectPageSize from "./selectPageSize";

const Paginator = ({ name, pager, setPage, setPageSize }) => {
    if (!pager) return null;
    console.log(name, pager);
    return (
        <div className="d-flex justify-content-center">
            <ul className="pagination">
                <li
                    className={classNames({
                        "page-item": true,
                        disabled: pager.currentPage === 1
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => setPage(1)}
                        role="button"
                    >
                        В начало
                    </a>
                </li>
                <li
                    className={classNames({
                        "page-item me-2": true,
                        disabled: pager.currentPage === 1
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => setPage(pager.currentPage - 1)}
                        role="button"
                    >
                        &laquo;
                    </a>
                </li>
                {pager.pages &&
                    pager.pages.map((page, index) => (
                        <li
                            key={index + 1}
                            className={classNames({
                                "page-item": true,
                                active: page === pager.currentPage
                            })}
                        >
                            <a
                                className="page-link"
                                onClick={() => setPage(page)}
                                role="button"
                            >
                                {page}
                            </a>
                        </li>
                    ))}
                <li
                    className={classNames({
                        "page-item ms-2": true,
                        disabled: pager.currentPage === pager.totalPages
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => setPage(pager.currentPage + 1)}
                        role="button"
                    >
                        &raquo;
                    </a>
                </li>
                <li
                    className={classNames({
                        "page-item": true,
                        disabled: pager.currentPage === pager.totalPages
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => setPage(pager.totalPages)}
                        role="button"
                    >
                        В конец
                    </a>
                </li>
                <div className="page-item disabled ms-2">
                    <span className="page-link">
                        {pager.endIndex + 1}/{pager.totalDocs}
                    </span>
                </div>
                <SelectPageSize
                    value={pager.pageSize}
                    onChangePageSize={(value) => setPageSize(value)}
                    name={name}
                />
            </ul>
        </div>
    );
};

Paginator.propTypes = {
    name: PropTypes.string,
    pager: PropTypes.object,
    setPage: PropTypes.func.isRequired,
    setPageSize: PropTypes.func.isRequired
};

export default Paginator;
