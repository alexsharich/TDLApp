import { TaskStatuses, TodoTaskPriority } from "../api/todolistApi";
import { TasksStateType } from "../AppWithRedux";
import { addTaskAC, fetchTasksThunkCreator,   removeTaskThunkCreator,   tasksReducer, updateTaskAC } from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC, setTodolistsAC } from "./todolist-reducer";

test.skip('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const param = {id: '2', todolistId: 'todolistId2'} 
    const action = removeTaskThunkCreator.fulfilled(param,'',param);

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    });

});
test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const action = addTaskAC({
        task: {
            todoListId: 'todolistId2',
            title: 'juce',
            description: '',
            status: TaskStatuses.New,
            priority: TodoTaskPriority.Low,
            startDate: '',
            deadline: '',
            order: 0,
            completed: false,
            addedDate: '',
            id: 'id exist'
        }
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(0);
})
test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '', completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const action = updateTaskAC({ taskId: "2", model: { status: TaskStatuses.New }, todolistId: "todolistId2" });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy();
    expect(endState['todolistId1'][1].status).toBeTruthy();
});
test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const action = updateTaskAC({ taskId: "2", model: { title: 'happy' }, todolistId: "todolistId2" });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('happy');
    expect(endState['todolistId1'][1].title).toBe('JS');
});
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const action = addTodolistAC({
        todolist: {
            id: 'idtodlistIdfortest',
            addedDate: '',
            order: 0,
            title: 'new todolist'
        }
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test.skip('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0, addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };

    const action = removeTodolistAC({ todolistId: "todolistId2" });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
test('empty arrays should be added', () => {
    const action = setTodolistsAC({
        todolists: [
            {
                id: '1',
                title: 'title',
                order: 0,
                addedDate: '',
            },
            {
                id: '2',
                title: 'title2',
                order: 0,
                addedDate: '',
            }
        ]
    })

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});
test('tasks for todolists should be added ', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0, addedDate: ''
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: false,
                priority: TodoTaskPriority.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            }
        ]
    };
    const action = fetchTasksThunkCreator.fulfilled({ tasks: startState['todolistId1'], todolistId: 'todolistId1' },'requestId','todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action)




    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
});

