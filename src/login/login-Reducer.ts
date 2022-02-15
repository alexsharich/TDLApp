import React from 'react'
import { Dispatch } from 'redux'
import { authAPI, LoginParamsType } from '../api/todolistApi'
import { setStatusAC } from '../app-reducer'
import { fetchTodolistsThunkCreator } from '../tests/todolist-reducer'
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils'

type InitialStateType = {
    isLoggedIn: boolean
}
type ActionsType = SetIsLoggedInActionType

type SetIsLoggedInActionType = {
    type: 'SET-IS-LOGGED-IN'
    value: boolean
}
const initialState: InitialStateType = {
    isLoggedIn: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return { ...state, isLoggedIn: action.value }
        }
        default:
            return state
    }
}

//Actions

export const setIsLoggedInActionCreator = (value: boolean): SetIsLoggedInActionType => {
    return {
        type: 'SET-IS-LOGGED-IN',
        value: value
    }
}

//Thunk

export const loginThunkCreator = (data: LoginParamsType) => {
    return (dispatch: any) => {
        dispatch(setStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInActionCreator(true))
                    dispatch(setStatusAC('succeeded'))
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
        dispatch(setStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInActionCreator(false))
                    dispatch(setStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}