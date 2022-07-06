import axios from "axios";
// import logger from "./log.service";
import configFile from "../config.json";
import { toast } from "react-toastify";
import { getAccessToken } from "./localStorage.service";

const http = axios.create({ baseURL: configFile.apiEndpoint });

http.interceptors.request.use(
    function (config) {
        const token = getAccessToken();
        if (token) {
            config.headers = { ...config.headers, authorization: token };
        }
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
            console.log(error);
            toast.error("Somthing was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};
export default httpService;
