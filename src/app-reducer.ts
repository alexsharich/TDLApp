import React from 'react'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type ActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>
export type SetErrorActionType = {
    type: 'APP-SET-ERROR',
    error: string | null
}
export type SetStatusActionType = {
    type: 'APP-SET-STATUS',
    status: RequestStatusType
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return { ...state, status: action.status }
        case 'APP-SET-ERROR':
            return { ...state, error: action.error }

        default:
            return state
    }
}

export const setErrorAC = (error: string | null): SetErrorActionType => {
    return {
        type: 'APP-SET-ERROR',
        error: error
    } as const
}
export const setStatusAC = (status: RequestStatusType): SetStatusActionType => {
    return {
        type: 'APP-SET-STATUS',
        status: status
    } as const
}