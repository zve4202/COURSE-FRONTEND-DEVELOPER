const TASK_UPDATED = "TASK_UPDATED";
const TASK_DELETED = "TASK_DELETED";

export function taskCompleted(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: TASK_UPDATED,
    payload: { id, title: `New Title for Task${id}` },
  };
}

export function taskDeleted(id) {
  return {
    type: TASK_DELETED,
    payload: { id },
  };
}

function taskReducer(state, action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const newArray = [...state];
      const index = newArray.findIndex((item) => item.id === action.payload.id);
      newArray[index] = { ...newArray[index], ...action.payload };
      return newArray;
    }
    case TASK_DELETED: {
      const newArray = state.filter((item) => item.id !== action.payload.id);
      return newArray;
    }
    default:
      return state;
  }
}

export default taskReducer;
