import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateSetting } from "../../../store/setting";
import _ from "lodash";
import Paginator from "./paginator";

const PaginationWrapper = ({ name, totalDocs, onChange, children }) => {
    const pagination = useSelector(
        (state) => state.setting.config[name].pagination
    );
    const { currentPage, pageSize } = pagination;

    const [state, setState] = useState({
        totalDocs,
        pageSize,
        currentPage
    });
    console.log("PaginationWrapper first state", state);

    useEffect(() => {
        if (totalDocs !== state.totalDocs || pageSize !== state.pageSize) {
            setPage(1);
        } else if (currentPage !== state.currentPage) {
            setState({
                ...getState()
            });
        }
    }, [totalDocs, currentPage, pageSize]);

    const dispatch = useDispatch();

    function saveSetting(value) {
        dispatch(
            updateSetting(name, {
                pagination: value
            })
        );
    }

    function setPage(page) {
        if (page < 1 || page > state.totalPages) {
            return;
        }

        const newstate = {
            ...getState(),
            currentPage: page
        };

        saveSetting({ ...pagination, currentPage: page });

        setState(newstate);
    }

    function setPageSize(value) {
        const newstate = {
            ...getState(),
            pageSize: value
        };

        saveSetting({ ...pagination, pageSize: value });

        setState(newstate);

        onChange();
    }

    function selectPage(page) {
        setPage(page);
        onChange();
    }

    function getState() {
        const showPages = 10;
        const halfPages = showPages / 2;

        const totalPages = Math.ceil(totalDocs / pageSize);

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
        const endIndex = Math.min(startIndex + pageSize - 1, totalDocs - 1);

        const pages = _.range(startPage, endPage + 1);

        return {
            totalDocs,
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

    return (
        <div>
            <Paginator
                name={name}
                pager={state}
                setPage={selectPage}
                setPageSize={setPageSize}
            />
            {children}
            <Paginator
                name={name}
                pager={state}
                setPage={selectPage}
                setPageSize={setPageSize}
            />
        </div>
    );
};

PaginationWrapper.propTypes = {
    name: PropTypes.string.isRequired,
    totalDocs: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default PaginationWrapper;
