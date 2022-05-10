import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({ user, ...rest }) => {
  const getQualities = (qualities) => {
    return qualities.map((quality) => (
      <Quality key={quality._id} {...quality} />
    ));
  };

  return (
    <tr>
      <td>{user.name}</td>
      <td>{getQualities(user.qualities)}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>{<Bookmark {...user} {...rest} />}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => rest.onDelete(user._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
