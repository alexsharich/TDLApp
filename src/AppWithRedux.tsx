import React, { useCallback, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValueType, removeTodolistAC, TodolistsDomainType, todolistsReducer } from './tests/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './tests/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { TaskStatuses, TaskType } from './api/todolistApi';

/* export type TaskType = {
  id: string
  title: string
  isDone: boolean
} */

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

 /* type TodolistType = {
  id: string
  title: string
  filter: FilterValueType
} */

//export type FilterValueType = 'all' | 'active' | 'completed'

function AppWithRedux() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistsDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  let todolistId1 = v1();
  let todolistId2 = v1();

  const removeTask = useCallback((id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId)
    dispatch(action)
  }, [dispatch])
  const addTask = useCallback((newTitleTask: string, todolistId: string) => {
    const action = addTaskAC(newTitleTask, todolistId)
    dispatch(action)
  }, [dispatch])
  const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
    const action = changeTaskStatusAC(id, status, todolistId)
    dispatch(action)
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTaskTitle: string, todolistId: string) => {
    const action = changeTaskTitleAC(id, newTaskTitle, todolistId)
    dispatch(action)
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
    dispatch(action)
  }, [dispatch])
  const addTodolist = useCallback((newTodolistTitle: string) => {
    const action = addTodolistAC(newTodolistTitle)
    dispatch(action)
  }, [dispatch])
  const changeTodolistTitle = useCallback((id: string, newTodolistTitle: string) => {
    const action = changeTodolistTitleAC(id, newTodolistTitle)
    dispatch(action)
  }, [dispatch])
  const changeFilter = useCallback((todolistId: string, value: FilterValueType) => {
    const action = changeTodolistFilterAC(todolistId, value)
    dispatch(action)
  }, [dispatch])


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => {

        let allTasksForTodolist = tasks[tl.id]
        let tasksForTodolist = allTasksForTodolist

        return (
          <Todolist key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist} />
        )
      })
      }
    </div>
  );
}

export default AppWithRedux;
