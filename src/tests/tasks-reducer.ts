import React from "react";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, todolistAPI, TodoTaskPriority } from "../api/todolistApi";
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType, setTodolistsAC, todolistId1, todolistId2 } from "./todolist-reducer";

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todolistId: string
}
type ActionsType = removeTaskActionType
    | addTaskActionType
    | changeTaskTitleActionType
    | changeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType

const initialState: TasksStateType = {
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = { ...state }
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.id)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const stateCopy = { ...state }
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {

            let todolistsTasks = state[action.todolistId]
            state[action.todolistId] = todolistsTasks.map(t => t.id === action.taskId
                ? { ...t, isDone: action.status }
                : t)
            return ({ ...state })
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistsTasks = state[action.todolistId]
            state[action.todolistId] = todolistsTasks.map(t => t.id === action.taskId
                ? { ...t, title: action.title }
                : t)
            return ({ ...state })
        }
        case 'ADD-TODOLIST': {
            const stateCopy = { ...state }
            stateCopy[action.id] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = { ...state }
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = { ...state }
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = { ...state }
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

//Actions
export const removeTaskAC = (id: string, todolistId: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        id: id,
        todolistId: todolistId
    }
}
export const addTaskAC = (task: TaskType): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        task: task
    }
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId: taskId,
        title: title,
        todolistId: todolistId
    }
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId: taskId,
        status: status,
        todolistId: todolistId
    }
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {
        type: 'SET-TASKS',
        tasks: tasks,
        todolistId: todolistId
    }
}

//Thunks
export const fetchTasksThunkCreator = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskThunkCreator = (id: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(id, todolistId)
            .then(res => {
                const action = removeTaskAC(id, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskThunkCreator = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}