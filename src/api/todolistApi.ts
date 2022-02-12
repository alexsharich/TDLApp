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
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/`, { title: 'todolist in API' })
    },
    removeTodolis(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, { title: 'updated title' })
    },

}
type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: D
}
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
