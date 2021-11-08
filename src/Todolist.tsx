import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType, TaskType } from "./App";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";

type TodolistPropsType = {
    id: string
    title: string
    task: Array<TaskType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValueType, todolistID: string) => void
    addTask: (newTitleTask: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newValue: string) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const changeTodolistTitle = (newValue: string) => props.changeTodolistTitle(props.id, newValue)
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} /><button onClick={removeTodolistHandler}>X</button></h3>
            <AddItemForm addItem={(newTaskTitle) => props.addTask(newTaskTitle, props.id)} />
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
}

