import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from "react";
import { FilterValueType, TaskType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (newTitleTask: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newValue: string) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newValue: string) => props.changeTodolistTitle(props.id, newValue)
    const addTask = useCallback((newTaskTitle: string) => props.addTask(newTaskTitle, props.id), [props.addTask, props.id])

    let tasksForTodolist = props.task

    if (props.filter === 'active') {
        tasksForTodolist = props.task.filter(f => f.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.task.filter(f => f.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} /><button onClick={removeTodolistHandler}>X</button></h3>
            <AddItemForm addItem={addTask} />
            <div>
                {props.task.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChekboxClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTaskTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? 'taskIsDone' : ''}>
                        <input type="checkbox"
                            onChange={onChekboxClickHandler}
                            checked={t.isDone} />
                        <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler} />
                        <button onClick={removeTaskHandler}>X</button>
                    </li>
                })
                }
            </div>
            <div>
                <button className={props.filter === 'all' ? 'activeButton' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'activeButton' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'activeButton' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
})

