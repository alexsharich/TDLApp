import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'REACT', isDone: false },
    { id: 3, title: 'JS', isDone: true }
  ])

  let [filter, setFilter] = useState<FilterValueType>('all')

  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(f => f.isDone === false)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(f => f.isDone === true)
  }

  const removeTask = (id: number) => {
    let filteredTask = tasks.filter(f => f.id != id)
    setTasks(filteredTask)
  }

  const changeFilter = (value: FilterValueType) => {
    setFilter(value)
  }

  return (
    <div className="App">
      <Todolist title={'What to learn'}
        task={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter} />
    </div>
  );
}

export default App;
