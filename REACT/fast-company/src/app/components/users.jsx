import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./gropList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./userTable";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const pageSize = 2;

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
    console.log(item);
  };

  const filtredUsers = selectedProf
    ? allUsers.filter((user) => user.profession === selectedProf)
    : allUsers;
  const count = filtredUsers.length;

  const userCrop = paginate(filtredUsers, currentPage, pageSize);

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
          <UserTable users={userCrop} onSort={handleSort} {...rest} />
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
