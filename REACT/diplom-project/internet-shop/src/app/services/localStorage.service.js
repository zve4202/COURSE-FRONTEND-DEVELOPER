const TOKEN_KEY = "base-active";
const BASKET_KEY = "basket-id";

export function setAccessToken({ accessToken }) {
    localStorage.setItem(TOKEN_KEY, accessToken);
}
export function removeAccessToken() {
    localStorage.removeItem(TOKEN_KEY);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function setBasket({ accessToken }) {
    localStorage.setItem(BASKET_KEY, accessToken);
}
export function removeBasket() {
    localStorage.removeItem(BASKET_KEY);
}
export function getBasket() {
    return localStorage.getItem(BASKET_KEY);
}

const localStorageService = {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setBasket,
    removeBasket,
    getBasket
};
export default localStorageService;
