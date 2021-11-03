import React from "react";
import { TaskType } from "./App";

type TodolistPropsType = {
    title: string
    task: Array<TaskType>
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
                <li><input type="checkbox" checked={props.task[0].isDone} /><span>{props.task[0].title}</span></li>
                <li><input type="checkbox" checked={props.task[1].isDone} /><span>{props.task[1].title}</span></li>
                <li><input type="checkbox" checked={props.task[2].isDone} /><span>{props.task[2].title}</span></li>
            </div>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}