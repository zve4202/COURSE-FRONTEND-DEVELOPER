import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import SettingButton from "../common/settingButton";
import Avatar from "./avatar";
import RateComponent from "../common/rateComponent";

const UserCard = ({ user }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="card mb-3">
            <div className="card-body">
                <SettingButton onClick={handleClick} />
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <Avatar />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <RateComponent rate={user.rate} />
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
