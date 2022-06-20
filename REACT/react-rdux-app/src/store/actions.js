import * as action from "./actionTypes";

export function taskCompleted(id) {
  return {
    type: action.TASK_UPDATED,
    payload: { id, completed: true },
  };
}

export function titleChanged(id) {
  return {
    type: action.TASK_UPDATED,
    payload: { id, title: `New Title for Task${id}` },
  };
}

export function taskDeleted(id) {
  return {
    type: action.TASK_DELETED,
    payload: { id },
  };
}
