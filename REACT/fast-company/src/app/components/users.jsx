import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./gropList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const pageSize = 8;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleItemSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const filtredUsers = selectedProf
    ? allUsers.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : allUsers;
  const count = filtredUsers.length;

  const sortedUsers = _.orderBy(filtredUsers, [sortBy.iter], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  const clearFiltr = () => {
    setSelectedProf();
  };
  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column frex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            /* items={Object.keys(professions).map((prof) => professions[prof])} */
            onItemSelect={handleItemSelect}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFiltr}>
            Сбросить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <UserTable
            users={userCrop}
            onSort={handleSort}
            currentSort={sortBy}
            {...rest}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
Users.propTypes = {
  users: PropTypes.array.isRequired
};
export default Users;
