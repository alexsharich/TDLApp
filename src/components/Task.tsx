import React, { ChangeEvent, useCallback } from 'react'
import { TaskStatuses, TaskType } from '../api/todolistApi'
import { EditableSpan } from './EditableSpan'

type TaskPropsType = {
    removeTask: (id: string, todolistID: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChekboxClickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChangeTaskTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'taskIsDone' : ''}>
        <input type="checkbox"
            onChange={onChekboxClickHandler}
            checked={props.task.status === TaskStatuses.Completed} />
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler} />
        <button onClick={removeTaskHandler}>X</button>
    </li>
})