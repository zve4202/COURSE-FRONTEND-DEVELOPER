import httpService from "./http.service";

const authService = {
    signUp: async (content) => {
        const { data } = await httpService.post("auth/signUp/", content);
        return data;
    },
    signIn: async (content) => {
        const { data } = await httpService.post("auth/signIn/", content);
        return data;
    },
    refresh: async (refreshToken) => {
        const { data } = await httpService.post("auth/token/", {
            refreshToken
        });
        return data;
    },
    getAuthUser: async () => {
        const { data } = await httpService.get("user/me/");
        return data;
    }
};
export default authService;
