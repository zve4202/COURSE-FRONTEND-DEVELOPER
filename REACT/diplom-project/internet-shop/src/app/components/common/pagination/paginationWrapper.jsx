import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { range } from "lodash";
import { updateSetting } from "../../../store/setting";
import Paginator from "./paginator";

class PaginationWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.name = this.props.name;
        this.config = this.props.config[this.name];
        this.pagination = this.config.pagination;
        this.state = {};
        this.saveSetting = this.saveSetting.bind(this);
        this.setPage = this.setPage.bind(this);
        this.getPager = this.getPager.bind(this);
        this.setPageSize = this.setPageSize.bind(this);
        this.selectPage = this.selectPage.bind(this);
    }

    componentDidMount() {
        if (this.props.totalDocs) {
            this.setPage(1);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.totalDocs !== prevProps.totalDocs) {
            this.setPage(1);
        }
    }

    saveSetting() {
        if (this.pagination) {
            this.props.updateSetting(this.name, {
                pagination: this.pagination
            });
        }
    }

    setPage(page) {
        const { totalDocs } = this.props;
        let pager = this.state;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(totalDocs, page, this.pagination.pageSize);

        this.pagination = {
            ...this.pagination,
            currentPage: page
        };
        this.saveSetting();

        this.setState(pager);
    }

    getPager(totalItems, currentPage, pageSize) {
        currentPage = currentPage || this.pagination.page;

        pageSize = pageSize || this.pagination.pageSize;

        const showPages = 10;
        const halfPages = showPages / 2;

        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage, endPage;
        if (totalPages <= showPages) {
            startPage = 1;
            endPage = totalPages;
        } else {
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

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        const pages = range(startPage, endPage + 1);

        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    setPageSize(value) {
        this.pagination = {
            ...this.pagination,
            pageSize: value
        };
        this.setPage(1);
        this.saveSetting();
        this.props.onChange();
    }

    selectPage(page) {
        this.setPage(page);
        this.props.onChange();
    }

    render() {
        const pager = this.state;
        if (!pager.pages) {
            return null;
        }

        return (
            <div>
                <Paginator
                    name={this.name}
                    pager={pager}
                    setPage={this.selectPage}
                    setPageSize={this.setPageSize}
                />
                {this.props.children}
                {pager.pages.length > 1 && (
                    <Paginator
                        name={this.name}
                        pager={pager}
                        setPage={this.selectPage}
                        setPageSize={this.setPageSize}
                    />
                )}
            </div>
        );
    }
}

PaginationWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    totalDocs: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object,
    updateSetting: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

PaginationWrapper.defaultProps = {
    initialPage: 1,
    pageSize: 10
};

const mapStateToProps = (state) => ({
    config: state.setting.config
});

const mapDispatchToProps = {
    updateSetting
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationWrapper);
