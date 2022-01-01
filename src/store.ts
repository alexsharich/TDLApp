import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./tests/tasks-reducer";
import { todolistsReducer } from "./tests/todolist-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)