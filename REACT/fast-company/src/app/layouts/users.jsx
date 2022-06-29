import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { getDataLoaded, getLoggedUser, loadUsersList } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUser = useSelector(getLoggedUser());
    const dataLoaded = useSelector(getDataLoaded());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataLoaded) dispatch(loadUsersList());
    }, []);
    if (!dataLoaded) return "Loading...";
    return (
        <>
            {userId ? (
                edit ? (
                    userId === currentUser._id ? (
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
