import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { appReducer } from "./app-reducer";
import { authReducer } from "./login/login-Reducer";
import { tasksReducer } from "./tests/tasks-reducer";
import { todolistsReducer } from "./tests/todolist-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

//export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware))
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})