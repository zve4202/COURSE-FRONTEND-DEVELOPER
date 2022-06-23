import httpService from "./http.service";

const authService = {
    signUp: async (content) => {
        const { data } = await httpService.post("auth/signup/", content);
        return data;
    },
    signIn: async (content) => {
        const { data } = await httpService.post("auth/signin/", content);
        return data;
    },
    getAuthUser: async () => {
        const { data } = await httpService.get("user/me/");
        return data;
    }
};
export default authService;
