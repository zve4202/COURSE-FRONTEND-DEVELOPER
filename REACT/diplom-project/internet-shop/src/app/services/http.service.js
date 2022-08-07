import axios from "axios";
// import logger from "./log.service";
import configFile from "../config.json";
import { toast } from "react-toastify";
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    setTokens,
    getValue
} from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({ baseURL: configFile.apiEndpoint });

const checkParams = ({ params }) => {
    // console.log("params", params);

    if (params && params.paramsName) {
        try {
            const { paramsName } = params;
            delete params.paramsName;
            const key = String.prototype.concat("setting-", paramsName);
            // console.log("key", key);
            const { pagination, query, sort } = JSON.parse(getValue(key));
            // console.log({ pagination, query, sort });
            const newParams = {
                page: pagination.currentPage,
                limit: pagination.pageSize,
                ...sort,
                ...params
            };

            Object.keys(query).forEach((key) => {
                if (key !== "show") {
                    const value = query[key];
                    if (value) {
                        newParams[key] = value;
                    }
                }
            });
            // console.log({ newParams });
            return newParams;
        } catch (error) {
            console.log({ error: error.message });
        }
    }

    return params;
};

http.interceptors.request.use(
    async function (config) {
        if (config.params) {
            config.params = checkParams(config);
        }
        if (config.url.endsWith("/")) {
            config.url = config.url.slice(0, -1);
        }
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
                authorization: `Bearer ${token}`
            };
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
