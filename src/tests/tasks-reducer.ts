import React from "react";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, todolistAPI, TodoTaskPriority, UpdateTaskType } from "../api/todolistApi";
import { setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType } from "../app-reducer";

import { TasksStateType } from "../AppWithRedux";
import { AppRootStateType } from "../store";
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
type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
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
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
    | SetErrorActionType
    | SetStatusActionType

const initialState: TasksStateType = {
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriority
    startDate?: string
    deadLine?: string
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
        case 'UPDATE-TASK': {

            let todolistsTasks = state[action.todolistId]
            let newTasksArray = todolistsTasks.map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
            state[action.todolistId] = newTasksArray
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
            stateCopy[action.todolist.id] = []
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
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {
        type: 'UPDATE-TASK',
        taskId: taskId,
        model: model,
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
        dispatch(setStatusAC('loading'))
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setStatusAC('succeeded'))
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
        dispatch(setStatusAC('loading'))
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('Some error occurred'))
                    }
                    dispatch(setStatusAC('failed'))
                }
            })
    }
}
export const updateTaskThunkCreator = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found')
            return
        }

        const APImodel: UpdateTaskType = {
            deadLine: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel
        }
        todolistAPI.updateTask(todolistId, taskId, APImodel)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
            })
    }
}