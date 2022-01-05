import React, { useCallback } from "react";
import { FilterValueType, TaskType } from "./AppWithRedux";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Task } from "./components/Task";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (newTitleTask: string, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTodolistTitle: (id: string, newValue: string) => void
    removeTodolist: (todolistID: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])

    const removeTodolistHandler = () => props.removeTodolist(props.id)
    const changeTodolistTitle = useCallback((newValue: string) => props.changeTodolistTitle(props.id, newValue), [props.changeTodolistTitle, props.id])
    const addTask = useCallback((newTaskTitle: string) => props.addTask(newTaskTitle, props.id), [props.addTask, props.id])

    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle} /><button onClick={removeTodolistHandler}>X</button></h3>
            <AddItemForm addItem={addTask} />
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                    task={t}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.id}
                />)}
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

