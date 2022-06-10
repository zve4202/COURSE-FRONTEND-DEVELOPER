const TOKEN_KEY = "base-active";

export function setAccessToken({ accessToken }) {
    if (accessToken === null) localStorage.removeItem(TOKEN_KEY);
    else localStorage.setItem(TOKEN_KEY, accessToken);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

const localStorageService = {
    setAccessToken,
    getAccessToken
};
export default localStorageService;
