import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import WorkScreenWithSearch from "../../ui/workScreenWithSearch";
import { useRole } from "../../../hooks/useRoles";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    // const [roles, setProfession] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const { users } = useUser();
    const { roles } = useRole();
    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    // useEffect(() => {
    //     api.roles.fetchAll().then((data) => setProfession(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRole, searchQuery]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

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
    if (users) {
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
            >
                <div className="card mt-2 p-3">
                    <div className="d-flex">
                        {roles && (
                            <div className="d-flex flex-column flex-shrink-0 me-3">
                                <GroupList
                                    selectedItem={selectedRole}
                                    items={roles}
                                    onItemSelect={handleRoleSelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={clearFilter}
                                >
                                    Очистить
                                </button>
                            </div>
                        )}
                        <div className="d-flex flex-column w-100">
                            <div className="card mb-3 bg-light">
                                <div className="card-body">
                                    <strong>Пользователи</strong>
                                </div>
                            </div>
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex flex-column">
                                        {count > 0 && (
                                            <UserTable
                                                users={usersCrop}
                                                onSort={handleSort}
                                                selectedSort={sortBy}
                                                onDelete={handleDelete}
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
                    </div>
                </div>
            </WorkScreenWithSearch>
        );
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
