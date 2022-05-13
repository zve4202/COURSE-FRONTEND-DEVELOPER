import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, onSort, currentSort, ...rest }) => {
  const handleSort = (item) => {
    if (currentSort.iter === item) {
      onSort({
        ...currentSort,
        order: currentSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ iter: item, order: "asc" });
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th role="button" onClick={() => handleSort("name")} scope="col">
            Имя
          </th>
          <th scope="col">Качества</th>
          <th
            role="button"
            onClick={() => handleSort("profession.name")}
            scope="col"
          >
            Провфессия
          </th>
          <th
            role="button"
            onClick={() => handleSort("completedMeetings")}
            scope="col"
          >
            Встретился, раз
          </th>
          <th role="button" onClick={() => handleSort("rate")} scope="col">
            Оценка
          </th>
          <th role="button" onClick={() => handleSort("bookmark")} scope="col">
            Избранное
          </th>
          <th role="button" />
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user._id} {...rest} {...user} />
        ))}
      </tbody>
    </table>
  );
};
UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired
};

export default UserTable;
