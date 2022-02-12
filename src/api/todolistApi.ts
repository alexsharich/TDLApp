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
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolis(title: string) {
        return instance.post<CreateTodolistResponseType>(`todo-lists/`, { title: 'todolist in API' })
    },
    removeTodolis(id: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<UpdateTodolistType>(`todo-lists/${id}`, { title: 'updated title' })
    },

}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {} 
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}