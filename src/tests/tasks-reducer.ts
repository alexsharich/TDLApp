import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, todolistAPI, TodoTaskPriority, UpdateTaskModelType } from "../api/todolistApi";
import { setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType } from "../app-reducer";

import { TasksStateType } from "../AppWithRedux";
import { AppRootStateType } from "../store";
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils";
import { addTodolistAC, AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType, SetTodolistActionType, setTodolistsAC, todolistId1, todolistId2 } from "./todolist-reducer";

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
type addTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}
/* type UpdateTaskTitleActionType = {
    type: 'UPDATE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
type UpdateTaskStatusActionType = {
    type: 'UPDATE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    model: UpdateDomainTaskModelType 
    todolistId: string
} */
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
export type ActionsType = removeTaskActionType
    | addTaskActionType
    /*   | UpdateTaskTitleActionType
      | UpdateTaskStatusActionType */
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType
    | SetErrorActionType
    | SetStatusActionType

const initialState: TasksStateType = {
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriority
    startDate?: string
    deadLine?: string
    completed?: boolean
}

export const fetchTasksThunkCreator = createAsyncThunk('taskReducer/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({ statusRequest: 'loading' }))
    const res = await todolistAPI.getTasks(todolistId)
    thunkAPI.dispatch(setStatusAC({ statusRequest: 'succeeded' }))
    return { tasks: res.data.items, todolistId }

})
export const removeTaskThunkCreator = createAsyncThunk('taskReducer/removeThunkCreator', async (param: { id: string, todolistId: string }, thunkAPI) => {
    const res = await todolistAPI.deleteTask(param.id, param.todolistId)
    return { id: param.id, todolistId: param.todolistId }
})
export const addTaskThunkCreator = createAsyncThunk('taskReducer/addTaskThunkCreator', async (param: { todolistId: string, title: string }, { dispatch, rejectWithValue }) => {
    dispatch(setStatusAC({ statusRequest: 'loading' }))
    const res = await todolistAPI.createTask(param.todolistId, param.title)
    try {
        if (res.data.resultCode === 0) {
            dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            return res.data.data.item
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
})


const slice = createSlice({
    name: 'taskReducer',
    initialState: initialState,
    reducers: {
        /* removeTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        }, */
        /* addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        }, */
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = { ...tasks[index], ...action.payload.model }
            }
        },
        /* setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        }, */
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
        builder.addCase(fetchTasksThunkCreator.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        });
        builder.addCase(removeTaskThunkCreator.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.id)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        });
        builder.addCase(addTaskThunkCreator.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        });
    }

})
export const tasksReducer = slice.reducer
export const { /* removeTaskAC, */ /* addTaskAC, */ updateTaskAC, /* setTasksAC */ } = slice.actions
/* export const tasksReducer = slice.reducer
export const { removeTaskAC, addTaskAC, updateTaskAC, setTasksAC } = slice.actions

export const tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
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
            state[action.todolistId] = todolistsTasks.map(t => t.id === action.taskId ? { ...t, ...action.model } : t)
            return ({ ...state })
        }
        case addTodolistAC.type: {
            const stateCopy = { ...state }
            stateCopy[action.payload.todolist.id] = []
            return stateCopy
        }
        case removeTodolistAC.type: {
            const stateCopy = { ...state }
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }
        case setTodolistsAC.type: {
            const copyState = { ...state }
            action.payload.todolists.forEach((tl: any) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = { ...state }
            copyState[action.todolistId] = action.tasks
            return copyState
        } */

//////////////////////
/* case 'UPDATE-TASK-STATUS': {

    let todolistsTasks = state[action.todolistId]
    let newTasksArray = todolistsTasks.map(t => t.id === action.taskId ? { ...t, status: action.status } : t)
    state[action.todolistId] = newTasksArray
    return ({ ...state })
}
case 'UPDATE-TASK-TITLE': {
    let todolistsTasks = state[action.todolistId]
    state[action.todolistId] = todolistsTasks.map(t => t.id === action.taskId ? { ...t, title: action.title } : t)
    return ({ ...state })
} */

/////////////////////
/*         default:
            return state
    }
} */

//Actions
/* export const removeTaskAC = (id: string, todolistId: string): removeTaskActionType => {
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
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {
        type: 'UPDATE-TASK',
        taskId: taskId,
        model,
        todolistId: todolistId
    } as const
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {
        type: 'SET-TASKS',
        tasks: tasks,
        todolistId: todolistId
    }
} */
//export const updateTaskTitleAC = (taskId: string, title: string, todolistId: string): UpdateTaskTitleActionType => {
//  return {
//      type: 'UPDATE-TASK-TITLE',
//      taskId: taskId,
//      title: title,
//      todolistId: todolistId
//  }
//}
//export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskStatusActionType => {
//return {
//    type: 'UPDATE-TASK-STATUS',
//    taskId: taskId,
//    model,
//    todolistId: todolistId
//}
//}


//Thunks
/* export const fetchTasksThunkCreator = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        todolistAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
                dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            })
    }
} */
/* export const removeTaskThunkCreator = (id: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(id, todolistId)
            .then(res => {
                const action = removeTaskAC({ id, todolistId })
                dispatch(action)
            })
    }
} */
/* export const addTaskThunkCreator = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC({ task })
                    dispatch(action)
                    dispatch(setStatusAC({ statusRequest: 'succeeded' }))
                } else {
                    handleServerAppError(res.data, dispatch) */
/*  if (res.data.messages.length) {
     dispatch(setErrorAC(res.data.messages[0]))
 } else {
     dispatch(setErrorAC('Some error occurred'))
 }
 dispatch(setStatusAC('failed')) */
/*     }
})
.catch(error => {
    handleServerNetworkError(error, dispatch) */
/*  dispatch(setErrorAC(error.message))
 dispatch(setStatusAC('failed')) */
/*             })
    }
} */
/* export const updateTaskStatusThunkCreator = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadLine: task.deadline,
                status: status
            })
                .then(res => {
                    dispatch(updateTaskAC(taskId, status, todolistId))
                })
        }

    }
}
export const updateTaskTitleThunkCreator = (taskId: string, title: string, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks;
        const tasksForCurrentTodolist = allTasksFromState[todolistId]
        const task = tasksForCurrentTodolist.find(t => t.id === taskId)
        if (task) {
            todolistAPI.updateTask(todolistId, taskId, {
                title: title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadLine: task.deadline,
                status: task.status
            })
                .then(res => {
                    dispatch(updateTaskTitleAC(taskId, title, todolistId))
                })
        }

    }
} */
export const updateTaskThunkCreator = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('Task not found')
            return
        }

        const APImodel: UpdateTaskModelType = {
            deadLine: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            completed: task.completed,
            ...model
        }
        todolistAPI.updateTask(todolistId, taskId, APImodel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({ taskId, model, todolistId }))
                } else {
                    handleServerAppError(res.data, dispatch)
                    /*  if (res.data.messages.length) {
                         dispatch(setErrorAC(res.data.messages[0]))
                     } else {
                         dispatch(setErrorAC('Some error occurred'))
                     }
                     dispatch(setStatusAC('failed')) */
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                /*  dispatch(setErrorAC(error.message))
                 dispatch(setStatusAC('failed')) */
            })
    }
}