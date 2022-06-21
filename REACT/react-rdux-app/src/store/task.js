import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: false },
];

// const update = createAction("TASK_UPDATED");
// const remove = createAction("TASK_REMOVED");

// export function taskCompleted(id) {
//   return update({ id, completed: true });
// }

// export function titleChanged(id) {
//   return update({ id, title: `New Title for Task${id}` });
// }

// export function taskDeleted(id) {
//   return remove({ id });
// }

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    update(state, action) {
      const index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = { ...state[index], ...action.payload };
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

const { actions, reducer: taskReducer } = taskSlice;
const { update, remove } = actions;

// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const index = state.findIndex((item) => item.id === action.payload.id);
//       state[index] = { ...state[index], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((item) => item.id !== action.payload.id);
//     });
// });

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `New Title for Task${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export default taskReducer;
