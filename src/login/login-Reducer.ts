import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import React from 'react'
import { Dispatch } from 'redux'
import { authAPI, FieldErrorType, LoginParamsType } from '../api/todolistApi'
import { setStatusAC } from '../app-reducer'
import { fetchTodolistsThunkCreator } from '../tests/todolist-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

/* type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = SetIsLoggedInActionType

type SetIsLoggedInActionType = {
    type: 'SET-IS-LOGGED-IN'
    value: boolean
} */

export const loginThunkCreator = createAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/loginThunkCreator', async (param, thunkAPI) => {
    thunkAPI.dispatch(setStatusAC({ statusRequest: 'loading' }))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {

            thunkAPI.dispatch(setStatusAC({ statusRequest: 'succeeded' }))
            return { isLoggedIn: true }
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({ errors: res.data.messages, fieldsErrors: res.data.fieldsErrors })
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined })
    }
})


const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInActionCreator(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(loginThunkCreator.fulfilled, (state, action) => {
            if (action.payload) {
                state.isLoggedIn = action.payload.isLoggedIn
            }
        })
    }
})

export const authReducer = slice.reducer
export const { setIsLoggedInActionCreator } = slice.actions

/* export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return { ...state, isLoggedIn: action.value }
        }
        default:
            return state
    }
} */

//Actions

/* export const setIsLoggedInActionCreator = (value: boolean): SetIsLoggedInActionType => {
    return {
        type: 'SET-IS-LOGGED-IN',
        value: value
    }
}
 */
//Thunk

/* export const loginThunkCreator = (data: LoginParamsType) => {
    return (dispatch: any) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInActionCreator({ value: true }))
                    dispatch(setStatusAC({ statusRequest: 'succeeded' }))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
} */
export const logoutThunkCreator = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({ statusRequest: 'loading' }))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInActionCreator({ value: false }))
                    dispatch(setStatusAC({ statusRequest: 'succeeded' }))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}