import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./gropList";
import api from "../api";

const Users = ({ users, ...rest }) => {
  const count = users.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();

  useEffect(() => {
    console.log("send request");
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    console.log("professions");
  }, [professions]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleItemSelected = (psrams) => {
    console.log(psrams);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {professions && (
        <GroupList items={professions} onItemSelected={handleItemSelected} />
      )}
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Провфессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {userCrop.map((user) => (
              <User key={user._id} {...rest} {...user} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};
Users.propTypes = {
  users: PropTypes.array.isRequired
};
export default Users;
