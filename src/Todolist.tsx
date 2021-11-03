import React from "react";
import { FilterValueType, TaskType } from "./App";

type TodolistPropsType = {
    title: string
    task: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" />
                <button>+</button>
            </div>
            <div>
                {props.task.map(t => <li>
                    <input type="checkbox" checked={t.isDone} />
                    <span>{t.title}</span>
                    <button onClick={() => { props.removeTask(t.id) }}>X</button>
                </li>)
                }
            </div>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

