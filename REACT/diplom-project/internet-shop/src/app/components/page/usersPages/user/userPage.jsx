import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import UserCard from "./userCard";
import { getUser, loadUsers } from "../../../../store/users";
import { loadRoles } from "../../../../store/roles";
import WorkScreen from "../../../ui/workScreen";

const UserPage = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));
    useEffect(() => {
        if (!user) {
            dispatch(loadRoles());
            dispatch(loadUsers());
        }
    }, []);
    return (
        <WorkScreen>
            <div className="row gutters-sm">
                {user ? (
                    <>
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                        </div>
                        <div className="col-md-8">
                            Orders
                            {/* <Orders /> */}
                        </div>
                    </>
                ) : (
                    <span>Загрузка...</span>
                )}
            </div>
        </WorkScreen>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
