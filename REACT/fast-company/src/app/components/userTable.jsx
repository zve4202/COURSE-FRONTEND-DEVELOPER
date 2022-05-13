import React from "react";
import PropTypes from "prop-types";
import User from "./user";

const UserTable = ({ users, onSort, ...rest }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th role="button" onClick={() => onSort("name")} scope="col">
            Имя
          </th>
          <th role="button" scope="col">
            Качества
          </th>
          <th
            role="button"
            onClick={() => onSort("profession.name")}
            scope="col"
          >
            Провфессия
          </th>
          <th
            role="button"
            onClick={() => onSort("completedMeetings")}
            scope="col"
          >
            Встретился, раз
          </th>
          <th role="button" onClick={() => onSort("rate")} scope="col">
            Оценка
          </th>
          <th role="button" onClick={() => onSort("bookmark")} scope="col">
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
  onSort: PropTypes.func.isRequired
};

export default UserTable;
