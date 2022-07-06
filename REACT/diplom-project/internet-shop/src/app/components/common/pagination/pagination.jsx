import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classNames from "classnames";
import SelectPageSize from "./selectPageSize";

const propTypes = {
    itemsCount: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    name: PropTypes.string.isRequired
};

const defaultProps = {
    initialPage: 1,
    pageSize: 10
};

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentDidMount() {
        // set page if itemsCount array isn't empty
        if (this.props.itemsCount > 0) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if itemsCount array has changed
        if (this.props.itemsCount !== prevProps.itemsCount) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const { itemsCount, pageSize } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(itemsCount, page, pageSize);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onPageChange(page);
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        const showPages = 10;
        const halfPages = showPages / 2;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= showPages) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= halfPages + 1) {
                startPage = 1;
                endPage = showPages;
            } else if (currentPage + (halfPages - 1) >= totalPages) {
                startPage = totalPages - (showPages - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - halfPages;
                endPage = currentPage + (halfPages - 1);
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + 1);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        const pager = this.state.pager;

        if (!pager.pages || pager.pages.length < 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination" name={this.props.name}>
                <li
                    className={classNames({
                        "page-item": true,
                        disabled: pager.currentPage === 1
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => this.setPage(1)}
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
                        onClick={() => this.setPage(pager.currentPage - 1)}
                        role="button"
                    >
                        &laquo;
                    </a>
                </li>
                {pager.pages.map((page, index) => (
                    <li
                        key={index}
                        className={classNames({
                            "page-item": true,
                            active: page === pager.currentPage
                        })}
                    >
                        <a
                            className="page-link"
                            onClick={() => this.setPage(page)}
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
                        onClick={() => this.setPage(pager.currentPage + 1)}
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
                        onClick={() => this.setPage(pager.totalPages)}
                        role="button"
                    >
                        В конец
                    </a>
                </li>
                <div className="page-item disabled ms-2">
                    <span className="page-link">
                        {pager.endIndex + 1}/{pager.totalItems}
                    </span>
                </div>
                <SelectPageSize
                    value={this.props.pageSize}
                    onChange={() => {}}
                    name={this.props.name}
                />
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
