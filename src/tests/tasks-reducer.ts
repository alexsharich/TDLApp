import React from "react";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, TodoTaskPriority } from "../api/todolistApi";
import { TasksStateType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType, todolistId1, todolistId2 } from "./todolist-reducer";

type removeTaskAC = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

type addTaskAC = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

type changeTaskTitleAC = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

type changeTaskStatusAC = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}

type ActionsType = removeTaskAC
    | addTaskAC
    | changeTaskTitleAC
    | changeTaskStatusAC
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType

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
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todolistId,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order:0,
                priority:TodoTaskPriority.Hi,
                completed:false
            }
            const tasks = stateCopy[action.todolistId]
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
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
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string, todolistId: string): removeTaskAC => {
    return {
        type: 'REMOVE-TASK',
        id: id,
        todolistId: todolistId
    }
}

export const addTaskAC = (newTodolistTitle: string, todolistId: string): addTaskAC => {
    return {
        type: 'ADD-TASK',
        title: newTodolistTitle,
        todolistId: todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAC => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId: taskId,
        title: title,
        todolistId: todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): changeTaskStatusAC => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId: taskId,
        status: status,
        todolistId: todolistId
    }
}