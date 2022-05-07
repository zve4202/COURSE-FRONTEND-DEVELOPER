import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    
    const handleDelete = (userId) => {
        setUsers(users.filter((user)=> user._id !== userId));
    }
    
    const sklon = (number, txt) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    const handlePhrase = (number) => {         
        const bg_name = number === 0 ? "danger" : "primary";
        const class_name = `badge bg-${bg_name} fs-5`;
        const endWord = sklon(number, ["к", "ка", "к"]);
        return (
            <span className={class_name}>
                {number === 0 ? "Никто с тобой не тусанёт" : `${number} челове${endWord} тусуется с тобой сегодня`}
            </span> 
        );
    }

    const getQualities = (qualities) => {
        return qualities.map(quality => {
            const class_name = `badge bg-${quality.color} m-1`;
            return (
                <span 
                    key={quality._id}
                    className={class_name}>
                    {quality.name}
                </span>    
            );
        })
    }

    const handleUserRow = (user) => {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>{getQualities(user.qualities)}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user._id)}
                        >delete</button>
                </td>
            </tr>
        );
    }

    if (users.length === 0){
        return handlePhrase(0);
    }
    
    return (
        <>
            {handlePhrase(users.length)}
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { users.map((user) => handleUserRow(user)) }
                </tbody>
            </table>
        </>
    )
}

export default Users;