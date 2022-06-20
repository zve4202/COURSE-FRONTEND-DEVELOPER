import { TASK_UPDATED } from "./actionTypes";

export function taskReducer(state, action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id === action.payload.id);
      newArray[index] = { ...newArray[index], ...action.payload };
      return newArray;
    }
    default:
      return state;
  }
}
