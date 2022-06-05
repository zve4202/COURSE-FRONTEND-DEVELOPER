import React from "react";
// import { useParams } from "react-router-dom";
// import EditUserPage from "../components/page/editUserPage";
import UsersListPage from "../components/page/usersListPage";
import { RoleProvider } from "../hooks/useRoles";
import { UserProvider } from "../hooks/useUsers";

const Users = () => {
    // const params = useParams();
    // const { userId } = params;
    return (
        <UserProvider>
            <RoleProvider>
                <UsersListPage />
                {/* {userId ? <EditUserPage /> : <UsersListPage />} */}
            </RoleProvider>
        </UserProvider>
    );
};

export default Users;
