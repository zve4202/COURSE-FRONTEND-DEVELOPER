import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import User from "./user";

const Users = ({ users, ...rest }) => {
  const handleDelete = (userId) => {
    rest.onDelete(userId);
  };

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              user={user}
              onDelete={handleDelete}
              {...rest}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
