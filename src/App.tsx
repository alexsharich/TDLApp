import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key:string]:Array<TaskType>
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

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ])

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  const removeTask = (id: string, todolistID: string) => {
    let todolistTasks = tasksObj[todolistID]
    tasksObj[todolistID] = todolistTasks.filter(t => t.id !== id)
    setTasks({ ...tasksObj })
  }
  const addTask = (newTitleTask: string, todolistID: string) => {
    let newTask = {
      id: v1(),
      title: newTitleTask,
      isDone: false
    }
    let todolistTasks = tasksObj[todolistID]
    tasksObj[todolistID] = [newTask, ...todolistTasks]
    setTasks({ ...tasksObj })
  }
  const changeStatus = (id: string, isDone: boolean, todolistID: string) => {
    let todolistsTasks = tasksObj[todolistID]
    let task = todolistsTasks.find(f => f.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks({ ...tasksObj })
  }
  const changeTaskTitle = (id: string, newTaskTitle: string, todolistID: string) => {
    let todolistsTasks = tasksObj[todolistID]
    let task = todolistsTasks.find(f => f.id === id)
    if (task) {
      task.title = newTaskTitle
    }
    setTasks({ ...tasksObj })
  }



  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(t => t.id !== todolistID))
    delete tasksObj[todolistID]
    setTasks({ ...tasksObj })
  }
  const addTodolist = (newTodolistTitle: string) => {
    let newTodolist: TodolistType = {
      id: v1(),
      title: newTodolistTitle,
      filter: 'all'
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({
      ...tasksObj,
      [newTodolist.id]: []
    })
  }
  const changeTodolistTitle = (id: string, newTodolistTitle: string) => {
    let todolist = todolists.find(f => f.id === id)
    if (todolist) {
      todolist.title = newTodolistTitle
    }
    setTodolists([...todolists])
  }
  const changeFilter = (value: FilterValueType, todolistID: string) => {
    let todolist = todolists.find(t => t.id === todolistID)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
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
