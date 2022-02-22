import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskType, todolistAPI, TodolistType } from "../api/todolistApi";
import { RequestStatusType, SetErrorActionType, setStatusAC, SetStatusActionType } from "../app-reducer";
import { handleServerNetworkError } from "../utils/error-utils";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type ChangeEntityActionType = {
    type: 'CHANGE-ENTITY-STATUS',
    id: string,
    status: RequestStatusType
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType
    | SetStatusActionType
    | SetErrorActionType
    | ChangeEntityActionType

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistsDomainType> = [
    /* { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' } */
]
export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistsDomainType = TodolistType & {
    filter: FilterValueType,
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: 'todolistReduser',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, newTodolistTitle: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.newTodolistTitle
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ todolistId: string, newFilter: FilterValueType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].filter = action.payload.newFilter
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
            return action.payload.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        },
        changeEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.status
        },
    }
})
export const { removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, setTodolistsAC, changeEntityStatusAC } = slice.actions
export const todolistsReducer = slice.reducer

/* export const todolistsReducer = (state: Array<TodolistsDomainType> = initialState, action: ActionsType): Array<TodolistsDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistsDomainType = {
                ...action.todolist,
                filter: 'all',
                entityStatus: 'idle'
            }
            return [newTodolist, ...state,]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(f => f.id === action.todolistId)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(t => t.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => {
                return {
                    ...tl,
                    filter: 'all',
                    entityStatus: 'idle'
                }
            })
        }
        case 'CHANGE-ENTITY-STATUS': {
            return state.map(t => t.id === action.todolistId ? { ...t, entityStatus: action.status } : t)
        }
        default:
            return state
    }
} */

//Actions
/* export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        todolistId: todolistId
    }
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        todolist: todolist
    }
}
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        todolistId: todolistId,
        title: newTodolistTitle
    }
}
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValueType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId,
        filter: newFilter
    }
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
    return {
        type: 'SET-TODOLISTS',
        todolists: todolists
    }
}
export const changeEntityStatusAC = (id: string, status: RequestStatusType): ChangeEntityActionType => {
    return {
        type: 'CHANGE-ENTITY-STATUS',
        id: id,
        status: status
    }
} */

//Thunks
export const fetchTodolistsThunkCreator = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        todolistAPI.getTodolists()
            .then(res => {
                const action = setTodolistsAC({ todolists: res.data })
                dispatch(action)
                dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistThunkCreator = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        dispatch(changeEntityStatusAC({ todolistId, status: 'loading' }))
        todolistAPI.removeTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC({ todolistId: todolistId }))
                dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            })

    }
}
export const addTodolistThunkCreator = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        todolistAPI.createTodolis(title)
            .then(res => {
                dispatch(addTodolistAC({ todolist: res.data.data.item }))
                dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            })
    }
}
export const changetodolistTitleThunkCreator = (todolistId: string, newTodolistTitle: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, newTodolistTitle)
            .then(res => {
                dispatch(changeTodolistTitleAC({ todolistId, newTodolistTitle }))
            })
    }
}