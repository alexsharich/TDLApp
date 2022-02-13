import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '44d5e153-6a8e-4009-97fa-dc87b2117b60'
    }
})
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TaskType>>('todo-lists')
    },
    createTodolis(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, { title: 'todolist in API' })
    },
    removeTodolis(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title: 'updated title' })
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, { taskTitle: taskTitle })
    },
    deleteTask( taskId: string,todolistId: string,) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }

}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: D
}
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type GetTasksResponse = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriority
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriority
    startDate: string
    deadLine: string
}