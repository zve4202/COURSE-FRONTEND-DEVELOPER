import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    
    const handleDelete = (userId) => {
        setUsers(users.filter((user)=> user._id !== userId));
    }
    
    const sklonenie = (number, txt) => {
        const cases = [2, 0, 1, 1, 1, 2];
        return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    const handlePhrase = (number) => {
        
        const clasess = (number === 0 ? "badge bg-danger" : "badge bg-primary") + " badge-sm p-2";
        return (
            <span className={clasess}>
                {number === 0 ? "Никто с тобой не тусанёт" : `${number} челове${sklonenie(number, ["к", "ка", "к"])} тусуется с тобой сегодня`}
            </span> 
        );
    }

    const handleUserRow = (user) => {
        return (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td></td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
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