import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import React from 'react'
import { Dispatch } from 'redux'
import { authAPI, LoginParamsType } from '../api/todolistApi'
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
const initialState/* : InitialStateType */ = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInActionCreator(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
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

export const loginThunkCreator = (data: LoginParamsType) => {
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
}
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