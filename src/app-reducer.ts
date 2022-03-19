import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import { Dispatch } from 'redux'
import { authAPI } from './api/todolistApi'
import { setIsLoggedInActionCreator } from './login/login-Reducer'

export type InitialStateType = {
    statusRequest: RequestStatusType
    error: string | null
    initialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type ActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC> | SetAppInitializedActionType

export type SetErrorActionType = {
    type: 'APP-SET-ERROR',
    error: string | null
}
export type SetStatusActionType = {
    type: 'APP-SET-STATUS',
    statusRequest: RequestStatusType
}
type SetAppInitializedActionType = {
    type: 'SET-APP-INITIALIZED'
    value: boolean
}

export const setAppInitializedThunkCreator = createAsyncThunk('app/setAppInitializedThunkCreator', async (param, { dispatch }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInActionCreator({ value: true }))
    }
    return
})



const slice = createSlice({
    name: 'app',
    initialState: {
        statusRequest: 'idle',
        error: null,
        initialized: false
    } as InitialStateType,
    reducers: {
        setErrorAC(state, action: PayloadAction<{ error: string | null }>) {

            state.error = action.payload.error
        },
        setStatusAC(state, action: PayloadAction<{ statusRequest: RequestStatusType }>) {
            state.statusRequest = action.payload.statusRequest
        },  
    },
    extraReducers: builder => {
        builder.addCase(setAppInitializedThunkCreator.fulfilled, (state) => {
            state.initialized = true
        })
    }
})
export const { setErrorAC, setStatusAC } = slice.actions
export const appReducer = slice.reducer


/* export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS': {
            return { ...state, statusRequest: action.statusRequest }
        }
        case 'APP-SET-ERROR': {
            return { ...state, error: action.error }
        }
        case 'SET-APP-INITIALIZED': {
            return { ...state, initialized: action.value }
        }
        default:
            return state
    }
} */

//Action

/* export const setErrorAC = (error: string | null): SetErrorActionType => {
    return {
        type: 'APP-SET-ERROR',
        error: error
    } as const
}
export const setStatusAC = (statusRequest: RequestStatusType): SetStatusActionType => {
    return {
        type: 'APP-SET-STATUS',
        statusRequest: statusRequest
    } as const
}
export const setAppInitializedAC = (value: boolean): SetAppInitializedActionType => {
    return {
        type: 'SET-APP-INITIALIZED',
        value: value
    }
} */

//Thunk

/* export const setAppInitializedThunkCreator = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInActionCreator({ value: true }))
                }
                dispatch(setAppInitializedAC({ initialized: true }))
            })
    }
} */
