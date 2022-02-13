import React, { useCallback, useEffect, useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { addTodolistThunkCreator, changeTodolistFilterAC, changeTodolistTitleAC, changetodolistTitleThunkCreator, fetchTodolistsThunkCreator, FilterValueType, removeTodolistAC, removeTodolistThunkCreator, TodolistsDomainType } from './tests/todolist-reducer';
import { addTaskThunkCreator, changeTaskTitleAC, removeTaskThunkCreator, updateTaskThunkCreator } from './tests/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { TaskStatuses, TaskType } from './api/todolistApi';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistsDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

  useEffect(() => {
    dispatch(fetchTodolistsThunkCreator())
  }, [])

  let todolistId1 = v1();
  let todolistId2 = v1();

  const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskThunkCreator(id, todolistId))
  }, [dispatch])
  const addTask = useCallback((todolistId: string, title: string) => {
    const action = addTaskThunkCreator(todolistId, title)
    dispatch(action)
  }, [dispatch])
  const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
    dispatch(updateTaskThunkCreator(taskId, { status }, todolistId))
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    dispatch(updateTaskThunkCreator(id, { title: newTitle }, todolistId))
  }, [dispatch])

  const removeTodolist = useCallback((todolistId: string) => {
    const thunk = removeTodolistThunkCreator(todolistId)
    dispatch(thunk)
    // dispatch(action)
  }, [dispatch])
  const addTodolist = useCallback((newTodolistTitle: string) => {
    dispatch(addTodolistThunkCreator(newTodolistTitle))

  }, [dispatch])
  const changeTodolistTitle = useCallback((id: string, newTodolistTitle: string) => {
    dispatch(changetodolistTitleThunkCreator(id, newTodolistTitle))
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

export default AppWithRedux

