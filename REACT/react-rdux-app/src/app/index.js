import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import configureStore from "../store/store";
import { completeTask, changeTitle, removeTask, getTasks } from "../store/task";

export const store = configureStore();
const App = () => {
    const state = useSelector((state) => state.tasks.entities);
    const isLoading = useSelector((state) => state.tasks.isLoading);
    const error = useSelector((state) => state.errors.entities[0]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    if (isLoading) {
        return <h1 className="bg-info text-primary text-center">Loading...</h1>;
    }
    if (error) {
        return <h3 className="bg-danger text-white text-center">{error}</h3>;
    }

    return (
        <div className="container">
            <h1 className="bg-primary text-white text-center">App</h1>
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
