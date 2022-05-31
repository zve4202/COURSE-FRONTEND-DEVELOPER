import httpService from "./http.service";
const userEndpoint = "profession/";

const professionService = {
    update: async (id, content) => {
        const { data } = await httpService.put(userEndpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(userEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(userEndpoint + id);
        return data;
    }
};
export default professionService;