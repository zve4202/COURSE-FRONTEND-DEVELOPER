import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getErrors } from "../store/errors";
import configureStore from "../store/store";
import {
    completeTask,
    changeTitle,
    removeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    addTask
} from "../store/task";

export const store = configureStore();
const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getErrors());

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    if (isLoading) {
        return <h1 className="bg-info text-primary text-center">Loading...</h1>;
    }
    if (error) {
        return <h3 className="bg-danger text-white text-center">{error}</h3>;
    }

    return (
        <div className="container">
            <div>
                <h1 className="bg-primary text-white text-center">App</h1>
                <button
                    className="btn btn-dark mt-2"
                    onClick={() => dispatch(addTask())}
                >
                    Add Task
                </button>
                <hr />
            </div>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{el.completed ? "Completed" : "not Completed"}</p>
                        <button
                            className="btn btn-outline-primary me-1"
                            onClick={() => dispatch(completeTask(el.id))}
                        >
                            Complete
                        </button>
                        <button
                            className="btn btn-outline-dark me-1"
                            onClick={() => dispatch(changeTitle(el.id))}
                        >
                            Change title
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => dispatch(removeTask(el.id))}
                        >
                            Delete
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
