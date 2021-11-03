import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

const task1 = [
  { id: 1, title: 'HTML&CSS', isDone: true },
  { id: 2, title: 'REACT', isDone: false },
  { id: 3, title: 'JS', isDone: true }
]
const task2 = [
  { id: 1, title: 'Milk', isDone: true },
  { id: 2, title: 'Bread', isDone: true },
  { id: 3, title: 'Fish', isDone: true }

]

function App() {
  return (
    <div className="App">
      <Todolist title={'What to learn'} task={task1} />
      <Todolist title={'What to buy'} task={task2} />
    </div>
  );
}

export default App;
