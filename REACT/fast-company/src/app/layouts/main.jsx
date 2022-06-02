import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, satus, progress } = useMockData();
    const handleClick = () => {
        initialize();
    };

    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
                <li>Status: {satus}</li>
                <li>Progress: {progress} %</li>
                {error && <li>{error}</li>}
            </ul>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
