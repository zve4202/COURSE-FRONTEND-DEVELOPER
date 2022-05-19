import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = (acton) => {
        switch (acton) {
            case "all":
                history.push("/users/");
                break;
            case "edit":
                history.push(`/users/${userId}/edit`);
                break;
            default:
                break;
        }
    };
    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <div>
                    <button
                        className="btn btn-secondary mx-2"
                        onClick={() => handleClick("all")}
                    >
                        Все пользователи
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => handleClick("edit")}
                    >
                        Изменить
                    </button>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
