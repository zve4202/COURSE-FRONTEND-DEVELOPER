import { createAction } from "@reduxjs/toolkit";

const update = createAction("TASK_UPDATED");
const remove = createAction("TASK_REMOVED");

export function taskCompleted(id) {
  return update({ id, completed: true });
}

export function titleChanged(id) {
  return update({ id, title: `New Title for Task${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

function taskReducer(state, action) {
  switch (action.type) {
    case update.type: {
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id === action.payload.id);
      newArray[index] = { ...newArray[index], ...action.payload };
      return newArray;
    }
    case remove.type: {
      const newArray = state.filter((item) => item.id !== action.payload.id);
      return newArray;
    }
    default:
      return state;
  }
}

export default taskReducer;
