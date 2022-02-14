import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { Delete } from "@material-ui/icons";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TaskStatuses, TaskType } from "./api/todolistApi";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import { Task } from "./components/Task";
import { fetchTasksThunkCreator } from "./tests/tasks-reducer";
import { FilterValueType, TodolistsDomainType } from "./tests/todolist-reducer";

type TodolistPropsType = {
    todolist: TodolistsDomainType
    
    tasks: Array<TaskType>

    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitleTask: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newValue: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'all'), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'active'), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, 'completed'), [props.changeFilter, props.todolist.id])

    const removeTodolistHandler = () => props.removeTodolist(props.todolist.id)
    const changeTodolistTitle = useCallback((newValue: string) => props.changeTodolistTitle(props.todolist.id, newValue), [props.todolist.id, props.changeTodolistTitle])
    const addTask = useCallback((newTaskTitle: string) => props.addTask(props.todolist.id, newTaskTitle), [props.todolist.id, props.addTask])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksThunkCreator(props.todolist.id))
    }, [])

    let tasksForTodolist = props.tasks

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className='todolistBlock'>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} />
                <IconButton onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}  disabled={props.todolist.entityStatus === 'loading'} />
            <div>
                {tasksForTodolist.map(t => <Task key={t.id}
                    task={t}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.todolist.id}
                />)}
            </div>
            <div className="filterButtonsBlock">
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
                <Button color={'primary'} variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button color={'secondary'} variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

