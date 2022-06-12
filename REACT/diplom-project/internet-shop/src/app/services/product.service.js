import httpService from "./http.service";
const endPoint = "product/";

const categoryService = {
    update: async (id, content) => {
        const { data } = await httpService.put(endPoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(endPoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(endPoint);
        return data;
    },
    fetchAllEx: async () => {
        const { data } = await httpService.get(endPoint + "ex/");
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(endPoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(endPoint + id);
        return data;
    }
};
export default categoryService;
