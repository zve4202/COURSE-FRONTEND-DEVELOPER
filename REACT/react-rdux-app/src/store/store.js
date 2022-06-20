import { legacy_createStore } from "redux";
import { taskReducer } from "./task/reducer";

const initialState = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: false },
  { id: 3, title: "Task 3", completed: false },
];

function configureStore() {
  return legacy_createStore(taskReducer, initialState);
}

export default configureStore;
