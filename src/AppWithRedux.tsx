import React, { useCallback, useEffect } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import { addTodolistThunkCreator, changeTodolistFilterAC, changetodolistTitleThunkCreator, fetchTodolistsThunkCreator, FilterValueType, removeTodolistThunkCreator, TodolistsDomainType } from './tests/todolist-reducer';
import { addTaskThunkCreator, removeTaskThunkCreator, updateTaskThunkCreator } from './tests/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { TaskStatuses, TaskType } from './api/todolistApi';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { Menu } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { RequestStatusType } from './app-reducer';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistsDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const statusRequest = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
    //dispatch(updateTaskStatusThunkCreator(taskId, status, todolistId))
    dispatch(updateTaskThunkCreator(taskId, { status }, todolistId))
  }, [dispatch])
  const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
    //dispatch(updateTaskTitleThunkCreator(id, title, todolistId))
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

  const error = useSelector<AppRootStateType, string | null>(state => state.app.error)

  const isOpen = error !== null

  return (
    <div className="App">
      <AppBar position='static' >
        <Snackbar open={isOpen} autoHideDuration={3000} >
          <Alert severity="error" >
            {error}
          </Alert>
        </Snackbar>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='menu'>
            <Menu />
          </IconButton>
          <Typography variant='h6'>
            TODOLIST
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
        {statusRequest === 'loading' && <LinearProgress color="secondary" />}
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {

              let allTasksForTodolist = tasks[tl.id]
              let tasksForTodolist = allTasksForTodolist

              return (
                <Grid item>
                  <Paper style={{ padding: '10px' }}>
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
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>

    </div >
  );
}

export default AppWithRedux

