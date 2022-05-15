import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/user";
import Users from "../components/users";

const UserSwith = () => {
    const params = useParams();
    const { userId } = params;
    if (userId) {
        return <UserPage userId={userId} />;
    }

    return <Users />;
};

export default UserSwith;
