import React, { useReducer, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer } from './tests/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './tests/tasks-reducer';

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

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ])

  let [tasksObj, dispatchToTaskReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'REACT', isDone: false },
      { id: v1(), title: 'JS', isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: 'book', isDone: true },
      { id: v1(), title: 'milk', isDone: true },
      { id: v1(), title: 'oil', isDone: true }
    ],
  })

  const removeTask = (id: string, todolistId: string) => {
    const action = removeTaskAC(id, todolistId)
    dispatchToTaskReducer(action)
  }
  const addTask = (newTitleTask: string, todolistId: string) => {
    const action = addTaskAC(newTitleTask, todolistId)
    dispatchToTaskReducer(action)
  }
  const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
    const action = changeTaskStatusAC(id, isDone, todolistId)
    dispatchToTaskReducer(action)
  }
  const changeTaskTitle = (id: string, newTaskTitle: string, todolistId: string) => {
    const action = changeTaskTitleAC(id, newTaskTitle, todolistId)
    dispatchToTaskReducer(action)
  }

  const removeTodolist = (todolistId: string) => {
    const action = RemoveTodolistAC(todolistId)
    dispatchToTaskReducer(action)
    dispatchToTodolistReducer(action)
  }
  const addTodolist = (newTodolistTitle: string) => {
    const action = AddTodolistAC(newTodolistTitle)
    dispatchToTodolistReducer(action)
    dispatchToTaskReducer
  }
  const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
    const action = ChangeTodolistTitleAC(id, newTodolistTitle)
    dispatchToTodolistReducer(action)
  }
  const changeFilter = (todolistId: string, value: FilterValueType) => {
    const action = ChangeTodolistFilterAC(todolistId, value)
    dispatchToTodolistReducer(action)
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => {

        let allTasksForTodolist = tasksObj[tl.id]
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
