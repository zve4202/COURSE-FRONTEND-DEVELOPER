import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put
};

export default httpService;
