import React from "react";
import Roles from "./roles";
import PropTypes from "prop-types";

const RolesCard = ({ data }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <p className="card-text">
                    <Roles roles={data} />
                </p>
            </div>
        </div>
    );
};
RolesCard.propTypes = {
    data: PropTypes.array
};

export default RolesCard;
