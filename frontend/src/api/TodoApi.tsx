import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useAuth0 } from "@auth0/auth0-react"

interface TodoType {
    todo: string,
    checked?: boolean
}
// const { getAccessTokenSilently } = useAuth0()
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useGetTodo = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getTodo = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await axios.get(`${backendUrl}/api/v1/todos`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response.data
        } catch (error) {
            throw new Error("Failed to fetch todos")
        }
    }
    const { data: fetchTodos, isLoading, error } = useQuery("fetchTodos", getTodo)
    return { fetchTodos, isLoading, error }
}

export const useCreateTodo = () => {
    const { getAccessTokenSilently } = useAuth0()
    const queryClient=useQueryClient()
    const addTodo = async (todo: TodoType) => {
        try {
            const accessToken = await getAccessTokenSilently()
            const todoPayload = {
                todo: todo.todo
            }
            await axios.post(`${backendUrl}/api/v1/todo/create`,
                todoPayload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': "application/json"
                }
            })
        } catch (error) {
            throw new Error("Failed to create todo")
        }
    }
    const { mutateAsync: createTodo, isLoading } = useMutation(addTodo,{
        onSuccess:()=>{
            queryClient.invalidateQueries('fetchTodos')
        }
    })
    return { createTodo, isLoading }
}

export const useUpdateTodod = () => {
    const { getAccessTokenSilently } = useAuth0()
    const queryClient=useQueryClient()
    const upTodo = async ({ id, todo }: { id: number, todo: Partial<TodoType> }) => {
        try {
            const accessToken = await getAccessTokenSilently()
            await axios.put(`${backendUrl}/api/v1/todo/${id}`, todo, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            throw new Error("Error while updating todo")
        }
    }
    const { mutateAsync: updateTodoBE, isLoading } = useMutation(upTodo,{
        onSuccess:()=>{
            queryClient.invalidateQueries('fetchTodos')
        }
    }
)
    return { updateTodoBE, isLoading }
}

export const useDeleteTodo = () => {
    const { getAccessTokenSilently } = useAuth0()
    const queryClient=useQueryClient()
    const dTodo = async (id: number) => {
        try {
            const accessToken =await getAccessTokenSilently()
            const response = await axios.delete(`${backendUrl}/api/v1/todo/${id}`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
        } catch (error) {
            throw new Error("Error while deleting todo")
        }
    }
    const { mutateAsync: deleteTodo, isLoading } = useMutation(dTodo,{
        onSuccess:()=>{
            queryClient.invalidateQueries('fetchTodos')
        }
    })
    return { deleteTodo, isLoading }
}