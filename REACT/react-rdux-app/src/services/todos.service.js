import httpService from "./http.service";

const todoEndpoint = "todos/";
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todoEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        });
        return data;
    },
    addTask: async (task) => {
        const { data } = await httpService.put(todoEndpoint + task.id, task);
        return data;
    }
};

export default todosService;
