import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'REACT', isDone: false },
    { id: v1(), title: 'JS', isDone: true }
  ])

  let [filter, setFilter] = useState<FilterValueType>('all')

  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(f => f.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(f => f.isDone === true)
  }

  const removeTask = (id: string) => {
    let filteredTask = tasks.filter(f => f.id != id)
    setTasks(filteredTask)
  }

  const changeFilter = (value: FilterValueType) => {
    setFilter(value)
  }

  const addTask = (newTitleTask: string) => {
    let newTask = {
      id: v1(),
      title: newTitleTask,
      isDone: false
    }
    setTasks([newTask, ...tasks])
  }

  const changeStatus = (id: string, isDone: boolean) => {
    let task = tasks.find(f => f.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist title={'What to learn'}
        task={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter} />
    </div>
  );
}

export default App;
