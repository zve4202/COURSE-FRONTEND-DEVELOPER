import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { pageSize } from "../../../config.json";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";
import WorkScreen from "../../ui/workScreen";
import {
    getUsers,
    getUsersError,
    getUsersLoading,
    loadUsers
} from "../../../store/users";
import { getRoles, loadRoles } from "../../../store/roles";

const UsersListPage = () => {
    const dispatch = useDispatch();
    const users = useSelector(getUsers());
    const roles = useSelector(getRoles());

    const isLoading = useSelector(getUsersLoading());
    const error = useSelector(getUsersError());

    useEffect(() => {
        dispatch(loadRoles());
        dispatch(loadUsers());
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRole, searchQuery]);

    const handleRoleSelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedRole(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedRole(undefined);
        setSearchQuery(target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    if (isLoading) {
        return (
            <WorkScreen>
                <span className="text-center">Звгрузка...</span>
            </WorkScreen>
        );
    }
    if (users.length > 0) {
        const filteredUsers = searchQuery
            ? users.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedRole
            ? users.filter((user) => user.role === selectedRole._id)
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedRole();
        };

        return (
            <WorkScreenWithSearch
                searchValue={searchQuery}
                onSearch={handleSearchQuery}
                clearFilter={clearFilter}
            >
                <div className="mt-2">
                    <div className="d-flex">
                        {roles && (
                            <div className="d-flex flex-column flex-shrink-0 me-3">
                                <GroupList
                                    selectedItem={selectedRole}
                                    items={roles}
                                    onItemSelect={handleRoleSelect}
                                />
                            </div>
                        )}
                        <div className="d-flex flex-column w-100 h-100">
                            <div className="card mb-3 bg-light">
                                <div className="card-body">
                                    <strong>Пользователи</strong>
                                </div>
                            </div>
                            <div className="h-100">
                                {count > 0 && (
                                    <UserTable
                                        users={usersCrop}
                                        onSort={handleSort}
                                        selectedSort={sortBy}
                                    />
                                )}
                                <div className="d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={count}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </WorkScreenWithSearch>
        );
    }
    if (error) {
        return (
            <WorkScreen>
                <span className="text-center text-danger">{error}</span>
            </WorkScreen>
        );
    }
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
