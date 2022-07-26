import axios from "axios";
// import logger from "./log.service";
import configFile from "../config.json";
import { toast } from "react-toastify";
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    setTokens
} from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({ baseURL: configFile.apiEndpoint });

http.interceptors.request.use(
    async function (config) {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            const expiresDate = getTokenExpiresDate();
            if (expiresDate < Date.now()) {
                const data = await authService.refresh(refreshToken);
                if (data) {
                    setTokens(data);
                }
            }
        }
        const token = getAccessToken();
        if (token) {
            config.headers = {
                ...config.headers,
                authorization: "Bearer " + token
            };
        }
        console.log(token);
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        return res;
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error(error.message);
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    patch: http.patch,
    delete: http.delete
};
export default httpService;
