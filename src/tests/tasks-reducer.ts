import { title } from "process";
import React from "react";
import { v1 } from "uuid";
import { TasksStateType, TodolistType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";


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
    status: boolean
    todolistId: string
}


type ActionsType = removeTaskAC
    | addTaskAC
    | changeTaskTitleAC
    | changeTaskStatusAC
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
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
            const tasks = stateCopy[action.todolistId]
            const newTask = { id: v1(), title: "juce", isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = { ...state }
            let todolistsTasks = state[action.todolistId]
            let task = todolistsTasks.find(f => f.id === action.taskId)
            if (task) {
                task.isDone = action.status
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = { ...state }
            let todolistsTasks = state[action.todolistId]
            let task = todolistsTasks.find(f => f.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return stateCopy
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
export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): changeTaskStatusAC => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId: taskId,
        status: status,
        todolistId: todolistId
    }
}