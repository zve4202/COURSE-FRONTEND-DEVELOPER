import axios from "axios";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
    // baseURL: "https://identitytoolkit.googleapis.com/v1/",
    // params: {
    //     key: process.env.REACT_APP_FIREBASE_KEY
    // }
    baseURL: config.apiEndpoint + "auth/"
});

const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post("signUp/", payload);
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post("signInWithPassword", {
            email,
            password
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            refresh_token: localStorageService.getRefreshToken()
        });
        return data;
    }
};
export default authService;
