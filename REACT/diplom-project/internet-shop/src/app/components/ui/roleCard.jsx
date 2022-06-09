import React from "react";
import Role from "./roles";
import PropTypes from "prop-types";

const RoleCard = ({ roleId }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <p className="card-text">
                    <Role roleId={roleId} />
                </p>
            </div>
        </div>
    );
};
RoleCard.propTypes = {
    roleId: PropTypes.string
};

export default RoleCard;
