import { createSlice } from "@reduxjs/toolkit";

import basketService from "../services/basket.service";
import { getValue, setValue } from "../services/localStorage.service";

const BASKET_KEY = "basket-id";
// docs = ["1","2" ...]
const initialState = {
    basket: {
        _id: null,
        userId: null,
        docs: [],
        totalQty: 0,
        totalPrice: 0
    },
    isLoading: true,
    error: null
};

const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        requested(state) {
            state.isLoading = true;
            state.error = null;
        },
        resived(state, action) {
            state.basket = action.payload;
            state.isLoading = false;
        },
        add(state, action) {
            const { docs } = state.basket;
            const index = docs.findIndex((doc) => doc.id === action.payload.id);
            if (index < 0) {
                docs.push(action.payload);
            } else {
                docs[index] = action.payload;
            }
            const totals = { totalQty: 0, totalPrice: 0 };
            docs.forEach((item) => {
                const { qty, price } = item;
                totals.totalQty += qty;
                totals.totalPrice += qty * price;
            });
            state.basket = { ...state.basket, docs, ...totals };
        },
        remove(state, action) {
            const { docs } = state.basket;
            const newdocs = docs.filter(
                (item) => item.id !== action.payload.id
            );
            const totals = { totalQty: 0, totalPrice: 0 };
            newdocs.forEach((item) => {
                const { qty, price } = item;
                totals.totalQty += qty;
                totals.totalPrice += qty * price;
            });
            state.basket = { ...state.basket, docs: newdocs, ...totals };
        },
        clear(state, action) {
            const docs = [];
            const totals = { totalQty: 0, totalPrice: 0 };
            state.basket = { ...state.basket, docs, ...totals };
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { add, remove, clear, resived, requested, requestFailed } =
    basketSlice.actions;

export const loadBasket = () => async (dispatch) => {
    dispatch(requested());
    try {
        const basketId = getValue(BASKET_KEY);
        if (basketId) {
            const { content } = await basketService.get(basketId);
            dispatch(resived(content));
        } else {
            const { content } = await basketService.create({
                ...initialState.basket
            });
            setValue(content._id);
            dispatch(resived(content));
        }
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const addBasket = (payload) => async (dispatch, getState) => {
    try {
        dispatch(add(payload));
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket.id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeBasket = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        dispatch(remove(id));
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket.id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearBasket = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        dispatch(clear());
        const { basket } = getState().basket;
        dispatch(requested());
        const { content } = await basketService.update(basket.id, basket);
        dispatch(resived(content));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getBasket = () => (state) => state.basket.basket;

export const getBasketLoading = () => (state) => state.basket.isLoading;
export const getBasketError = () => (state) => state.basket.error;

export default basketSlice;
