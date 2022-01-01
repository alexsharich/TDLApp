import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './tests/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tests/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  let todolistId1 = v1();
  let todolistId2 = v1();





  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId)
    dispatch(action)
  }
  const addTask = (newTitleTask: string, todolistId: string) => {
    const action = addTaskAC(newTitleTask, todolistId)
    dispatch(action)
  }
  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(id, isDone, todolistId)
    dispatch(action)
  }
  const changeTaskTitle = (id: string, newTaskTitle: string, todolistId: string) => {
    const action = changeTaskTitleAC(id, newTaskTitle, todolistId)
    dispatch(action)
  }

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId)
    dispatch(action)
    dispatch(action)
  }
  const addTodolist = (newTodolistTitle: string) => {
    const action = AddTodolistAC(newTodolistTitle)
    dispatch(action)
    dispatch(action)
  }
  const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
    const action = ChangeTodolistTitleAC(id, newTodolistTitle)
    dispatch(action)
  }
  const changeFilter = (todolistId: string, value: FilterValueType) => {
    const action = ChangeTodolistFilterAC(todolistId, value)
    dispatch(action)
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => {

        let allTasksForTodolist = tasks[tl.id]
        let tasksForTodolist = allTasksForTodolist

        if (tl.filter === 'active') {
          tasksForTodolist = allTasksForTodolist.filter(f => f.isDone === false)
        }
        if (tl.filter === 'completed') {
          tasksForTodolist = allTasksForTodolist.filter(f => f.isDone === true)
        }
        return (
          <Todolist key={tl.id}
            id={tl.id}
            title={tl.title}
            task={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist} />
        )
      })}

    </div>
  );
}

export default App;
