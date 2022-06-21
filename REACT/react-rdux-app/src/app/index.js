import React, { useEffect, useState } from "react";
import configureStore from "../store/store";
import { completeTask, changeTitle, removeTask, getTasks } from "../store/task";

export const store = configureStore();
const App = () => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.dispatch(getTasks());
        store.subscribe(() => setState(store.getState()));
    }, []);

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
                            onClick={() => store.dispatch(completeTask(el.id))}
                        >
                            Complete
                        </button>
                        <button
                            className="btn btn-outline-dark me-1"
                            onClick={() => store.dispatch(changeTitle(el.id))}
                        >
                            Change title
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => store.dispatch(removeTask(el.id))}
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
