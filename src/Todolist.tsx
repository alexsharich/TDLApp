import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValueType, TaskType } from "./App";

type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (newTitleTask: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler} />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={'errorMessage'}>{error}</div>}
            </div>
            <div>
                {props.task.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onchekboxClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id} className={t.isDone ? 'taskIsDone' : ''}>
                        <input type="checkbox"
                            onChange={onchekboxClickHandler}
                            checked={t.isDone} />
                        <span>{t.title}</span>
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

