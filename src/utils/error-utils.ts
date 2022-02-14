import { setErrorAC, setStatusAC } from "../app-reducer"
import React from 'react'
/* 
import { ResponseType } from '../api/todolistApi'
import { ActionsType } from "../tests/tasks-reducer"
import { Dispatch } from "redux"

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<ActionsType>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<ActionsType>) => {
    dispatch(setErrorAC(error.message ? error.message : 'Some error occured'))
    dispatch(setStatusAC('failed'))
} */