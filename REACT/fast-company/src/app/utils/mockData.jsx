import professions from "../mockData/professions.json";
import users from "../mockData/users.json";
import qualities from "../mockData/qualities.json";
import { useEffect, useState } from "react";
import httpService from "../services/http.service";

const useMockData = () => {
    const satuses = {
        idle: "Not Started",
        pending: "In process",
        succsessed: "Redy",
        error: "Error ocured"
    };
    const [error, setError] = useState(null);
    const [satus, setSatus] = useState(satuses.idle);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = professions.length + users.length + qualities.length;
    const incCount = () => {
        setCount((prevState) => prevState + 1);
    };
    const updateProgress = () => {
        if (count !== 0 && satus === satuses.idle) {
            setSatus(satuses.pending);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) {
            setProgress(() => newProgress);
        }
        if (newProgress === 100) {
            setSatus(satuses.succsessed);
        }
    };
    useEffect(() => {
        updateProgress();
    }, [count]);

    async function initialize() {
        try {
            for (const prof of professions) {
                await httpService.put("profession/" + prof._id, prof);
                incCount();
            }
            for (const qual of qualities) {
                await httpService.put("quality/" + qual._id, qual);
                incCount();
            }
            for (const user of users) {
                await httpService.put("user/" + user._id, user);
                incCount();
            }
        } catch (error) {
            setError(error);
            setSatus(satuses.error);
        }
    }
    return { error, initialize, satus, progress };
};

export default useMockData;
