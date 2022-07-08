import { createSlice } from "@reduxjs/toolkit";

import basketService from "../services/basket.service";
import localStorageService from "../services/localStorage.service";

const BASKET_KEY = "basket-id";
// entities = ["1","2" ...]
const initialState = { _id: null, entities: [], isLoading: true, error: null };

const usersSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        resived(state, action) {
            const { _id, entities } = action.payload;
            state._id = _id;
            state.entities = entities;
            state.isLoading = false;
        },
        add(state, action) {
            state.entities.push(action.payload);
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (item) => item !== action.payload
            );
        },
        clear(state, action) {
            state.entities = [];
        },
        requested(state) {
            state = initialState;
        },
        requestFailed(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const { actions, reducer: basketReducer } = usersSlice;
const { add, remove, clear, resived, requested, requestFailed } = actions;

export const loadBasket = () => async (dispatch) => {
    dispatch(requested());
    try {
        const basketId = localStorageService.getBasket();
        if (basketId) {
            const { content } = await basketService.get(basketId);
            dispatch(resived(content));
        } else {
            const { content } = await basketService.create({ entities: [] });
            dispatch(resived(content));
        }
        dispatch(resived({ ...getState() }));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const addBasket = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        // const { content } = await basketService.update(basket.id, basket);
        // dispatch(update(content));
        dispatch(add(id));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const removeBasket = (id) => async (dispatch, getState) => {
    dispatch(requested());
    try {
        // const { content } = await basketService.update(basket.id, basket);
        // dispatch(update(content));
        dispatch(remove(id));
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const clearBasket = () => async (dispatch, getState) => {
    dispatch(requested());
    try {
        // const { content } = await basketService.update(basket.id, basket);
        // dispatch(update(content));
        dispatch(clear());
    } catch (error) {
        dispatch(requestFailed(error.message));
    }
};

export const getBasket = () => (state) => ({
    _id: state.basket._id,
    entities: state.basket.entities
});
export const getBasketLoading = () => (state) => state.basket.isLoading;
export const getBasketError = () => (state) => state.basket.error;

export default basketReducer;
