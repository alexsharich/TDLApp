import { v1 } from 'uuid';
import { TodolistType } from '../api/todolistApi';
import { RequestStatusType } from '../app-reducer';


import { addTodolistAC, changeEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValueType, removeTodolistAC, setTodolistsAC, TodolistsDomainType, todolistsReducer } from './todolist-reducer';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]
    const action = {
        type: 'REMOVE-TODOLIST',
        id: todolistId1
    } as const;

    const endState = todolistsReducer(startState, removeTodolistAC({ todolistId: todolistId1 }))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]
    const todolist: TodolistType = {
        title: 'New Todolist',
        order: 0,
        addedDate: '',
        id: 'werwerwer'
    }
    const endState = todolistsReducer(startState, addTodolistAC({ todolist: todolist }))

    expect(endState[0].filter).toBe('all')
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    } as const;

    const endState = todolistsReducer(startState, changeTodolistTitleAC({ todolistId: todolistId2, newTodolistTitle: newTodolistTitle }));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValueType = "completed";

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    } as const;

    const endState = todolistsReducer(startState, changeTodolistFilterAC({ todolistId: todolistId2, newFilter: newFilter }));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test('Todolists should be set to the state', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]

    const action = setTodolistsAC({ todolists: startState })

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
test('correct entity status  should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newStatus: RequestStatusType = "loading";

    const startState: Array<TodolistsDomainType> = [
        {
            id: todolistId1,
            title: "What to learn",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }
    ]



    const endState = todolistsReducer(startState, changeEntityStatusAC({ todolistId: todolistId2, status: newStatus }));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});
