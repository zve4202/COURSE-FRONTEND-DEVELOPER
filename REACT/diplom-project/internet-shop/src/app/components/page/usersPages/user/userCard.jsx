import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Role from "../role";

const UserCard = ({ user }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                    </div>
                    <div className="mt-3">
                        <h6>{user.email}</h6>
                    </div>
                    <Role roleId={user.role} />
                </div>
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={handleClick}
                >
                    <i className="bi bi-gear"></i>
                </button>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
