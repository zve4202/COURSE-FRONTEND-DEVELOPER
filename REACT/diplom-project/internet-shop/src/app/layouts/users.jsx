import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import { getAuth, getAdmin } from "../store/auth";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUser = useSelector(getAuth());
    const isAdmin = useSelector(getAdmin());
    return (
        <>
            {userId ? (
                edit ? (
                    userId === currentUser._id || isAdmin ? (
                        <EditUserPage />
                    ) : (
                        <Redirect to={`/users/${currentUser._id}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
