import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
// import Orders from "../../ui/userOrders";
import { useUser } from "../../../hooks/useUsers";
import WorkScreen from "../../ui/workScreen";

const UserPage = ({ userId }) => {
    const { users, getUser } = useUser();
    const [user, setUser] = useState(null);
    useEffect(() => {
        setUser(getUser(userId));
    }, [users]);
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