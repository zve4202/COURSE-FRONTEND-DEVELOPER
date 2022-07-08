const TOKEN_KEY = "base-active";
//
const APP_KEY = "music-shop-";

export function setAccessToken({ accessToken }) {
    localStorage.setItem(APP_KEY + TOKEN_KEY, accessToken);
}
export function removeAccessToken() {
    localStorage.removeItem(APP_KEY + TOKEN_KEY);
}
export function getAccessToken() {
    return localStorage.getItem(APP_KEY + TOKEN_KEY);
}

export function getValue(key) {
    return localStorage.getItem(APP_KEY + key);
}
export function removeValue(key) {
    localStorage.removeItem(APP_KEY + key);
}

export function setValue(key, value) {
    localStorage.setItem(APP_KEY + key, value);
}

const localStorageService = {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    getValue,
    removeValue,
    setValue
};
export default localStorageService;
