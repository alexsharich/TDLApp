import { TaskStatuses, TodoTaskPriority } from "../api/todolistApi";
import { TasksStateType } from "../AppWithRedux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, setTasksAC, tasksReducer } from "./tasks-reducer";
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

    const action = removeTaskAC("2", "todolistId2");

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
test.skip('correct task should be added to correct array', () => {
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

    const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(false);
})
test.skip('status of specified task should be changed', () => {
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

    const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy();
    expect(endState['todolistId1'][1].status).toBeTruthy();
});
test.skip('title of specified task should be changed', () => {
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

    const action = changeTaskTitleAC("2", 'happy', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('happy');
    expect(endState['todolistId1'][1].title).toBe('JS');
});
test.skip('new array should be added when new todolist is added', () => {
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

    const action = addTodolistAC("new todolist");

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

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
test('empty arrays should be added', () => {
    const action = setTodolistsAC([
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
    ])

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
    const action = setTasksAC(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': [],
    }, action)




    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
});

