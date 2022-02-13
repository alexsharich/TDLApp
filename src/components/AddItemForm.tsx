import IconButton from "@material-ui/core/IconButton/IconButton";
import TextField from "@material-ui/core/TextField/TextField";
import { ControlPoint } from "@material-ui/icons";
import React, { ChangeEvent, useState, KeyboardEvent } from "react";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTaskHandler = () => {
        addTask()
    }
    return (
        <div>
            {/* <input className={error ? 'error' : ''}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler} /> */}
            <TextField error={!!error}
                variant={'outlined'}
                label={'Type value'}
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error} />
            <IconButton onClick={addTaskHandler}
                color={'primary'}>
                <ControlPoint />
            </IconButton>
        </div>
    )
})