import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '44d5e153-6a8e-4009-97fa-dc87b2117b60'
    }
})
export const todolistAPI = {
    getTodos() {
        return instance.get('todo-lists')
    },
    createTodolis(title: string) {
        return instance.post(`todo-lists/`, { title: 'todolist in API' })
    },
    removeTodolis(id: string) {
        return instance.delete(`todo-lists/${id}`)
    },
    updateTodolis(id: string, title: string) {
        return instance.put(`todo-lists/${id}`, { title: 'updated title' })
    },

}
