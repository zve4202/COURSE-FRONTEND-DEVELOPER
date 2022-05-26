import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
import { UserLayout } from "../../common/wrappers";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    console.log(user);

    if (user) {
        return (
            <UserLayout>
                <div className="col-md-4 mb-3">
                    <UserCard user={user} />
                    <QualitiesCard data={user.qualities} />
                    <MeetingsCard value={user.completedMeetings} />
                </div>
                <div className="col-md-8">
                    <Comments />
                </div>
            </UserLayout>
        );
    } else {
        return (
            <UserLayout>
                <div className="card">
                    <div className="card-body">
                        {/* <div className="card-body align-items-center text-center"> */}
                        <h5>Loading...</h5>
                    </div>
                </div>
            </UserLayout>
        );
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
