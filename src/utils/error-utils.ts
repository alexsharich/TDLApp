import { setErrorAC, setStatusAC } from "../app-reducer"
import React from 'react'
import { Dispatch } from "redux"
import { ActionsType } from "../tests/tasks-reducer"
import { ResponseType } from '../api/todolistApi'

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setErrorAC({ error: data.messages[0] }))
    } else {
        dispatch(setErrorAC({ error: 'Some error occurred' }))
    }
    dispatch(setStatusAC({ statusRequest: 'failed' }))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setErrorAC({ error: error.message ? error.message : 'Some error occured' }))
    dispatch(setStatusAC({ statusRequest: 'failed' }))
}