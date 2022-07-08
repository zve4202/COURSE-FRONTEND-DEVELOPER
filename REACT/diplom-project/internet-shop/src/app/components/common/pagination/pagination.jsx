import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import classNames from "classnames";
import SelectPageSize from "./selectPageSize";
import { connect } from "react-redux";
import { updateSetting } from "../../../store/setting";

const propTypes = {
    totalDocs: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    config: PropTypes.object,
    updateSetting: PropTypes.func
};

const defaultProps = {
    initialPage: 1,
    pageSize: 10
};

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
        this.pagenation = this.props.config[this.props.name].pagenation;
        // this.saveSetting = this.saveSetting.bind(this);
    }

    componentDidMount() {
        // set page if totalDocs array isn't empty
        console.log("componentDidMount");
        if (this.props.totalDocs > 0) {
            this.setPage(1);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if totalDocs array has changed
        if (this.props.totalDocs !== prevProps.totalDocs) {
            this.setPage(1);
        }
    }

    saveSetting() {
        if (this.pagenation) {
            this.props.updateSetting(this.props.name, {
                pagenation: this.pagenation
            });
        }
    }

    setPage(page) {
        const { totalDocs } = this.props;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(totalDocs, page, this.pagenation.pageSize);

        this.pagenation = {
            ...this.pagenation,
            currentPage: page
        };
        this.saveSetting();

        // update state
        this.setState({ pager: pager });
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || this.pagenation.page;

        // default page size is 10
        // pageSize = pageSize || this.props.config.pagenation.pageSize;
        pageSize = pageSize || this.pagenation.pageSize;

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
            if (currentPage <= halfPages) {
                startPage = 1;
                endPage = showPages;
            } else if (currentPage + halfPages >= totalPages) {
                startPage = totalPages - (showPages - 1);
                endPage = totalPages;
            } else {
                startPage = currentPage - (halfPages - 1);
                endPage = currentPage + halfPages;
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

    setPageSize(value) {
        this.pagenation = {
            ...this.pagenation,
            pageSize: value
        };
        this.setPage(1);
        this.saveSetting();
        this.props.onPageChange(this.pagenation.page);
    }

    selectPage(page) {
        this.setPage(page);
        // call change page function in parent component
        this.props.onPageChange();
    }

    render() {
        const pager = this.state.pager;
        if (!pager.pages) {
            return null;
        }

        if (pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return (
                <ul className="pagination">
                    <div className="page-item disabled ms-2">
                        <span className="page-link">
                            {pager.endIndex + 1}/{pager.totalItems}
                        </span>
                    </div>
                    <SelectPageSize
                        value={this.pagenation.pageSize}
                        onChangePageSize={(value) => this.setPageSize(value)}
                        name={this.props.name}
                    />
                </ul>
            );
        }

        return (
            <ul className="pagination">
                <li
                    className={classNames({
                        "page-item": true,
                        disabled: pager.currentPage === 1
                    })}
                >
                    <a
                        className="page-link"
                        onClick={() => this.selectPage(1)}
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
                        onClick={() => this.selectPage(pager.currentPage - 1)}
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
                            onClick={() => this.selectPage(page)}
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
                        onClick={() => this.selectPage(pager.currentPage + 1)}
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
                        onClick={() => this.selectPage(pager.totalPages)}
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
                    value={this.pagenation.pageSize}
                    onChangePageSize={(value) => this.setPageSize(value)}
                    name={this.props.name}
                />
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
    config: state.setting.config
});

const mapDispatchToProps = {
    updateSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
