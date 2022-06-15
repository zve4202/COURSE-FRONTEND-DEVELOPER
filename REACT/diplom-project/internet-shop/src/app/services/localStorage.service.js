const TOKEN_KEY = "base-active";

export function setAccessToken({ accessToken }) {
    localStorage.setItem(TOKEN_KEY, accessToken);
}
export function removeAccessToken() {
    localStorage.removeItem(TOKEN_KEY);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

const localStorageService = {
    setAccessToken,
    getAccessToken,
    removeAccessToken
};
export default localStorageService;
