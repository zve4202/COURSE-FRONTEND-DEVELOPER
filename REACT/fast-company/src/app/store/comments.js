import { createAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        commentDeleted: (state, action) => {
            if (Array.isArray(state.entities)) {
                state.entities = state.entities.filter(
                    (c) => c._id !== action.payload
                );
            }
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentDeleted
} = actions;

const createRequested = createAction("comments/createRequested");
const createRequestFailed = createAction("comments/createRequestFailed");

const deleteRequested = createAction("comments/deleteRequested");
const deleteRequestFailed = createAction("comments/deleteRequestFailed");

export const createComment = (payload) => async (dispatch) => {
    const comment = {
        _id: nanoid(),
        ...payload,
        created_at: Date.now()
    };

    dispatch(createRequested());
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(createRequestFailed(error.message));
    }
};

export const removeComment = (id) => async (dispatch) => {
    dispatch(deleteRequested());
    try {
        const { content } = await commentService.removeComment(id);
        if (content === null) {
            dispatch(commentDeleted(id));
        }
    } catch (error) {
        dispatch(deleteRequestFailed(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
