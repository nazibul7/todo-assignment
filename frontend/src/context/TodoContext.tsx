import React, { createContext, useState } from "react"

interface PropType {
    children: React.ReactNode
}
interface Todo {
    id?:number
    todo: string,
    checked: boolean
}
interface TodoContextType {
    todos: Todo[]
    addTodo: (todo: Todo) => void
    deleteTodo: (id: number) => void
    updateTodo: (id: number, updateTodo: Partial<Todo>) => void
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    toogleChecked:(id:number)=>void
}
export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    deleteTodo: () => { },
    updateTodo: () => { },
    setTodos: () => { },
    toogleChecked:()=>{}
})

export const TodoProvider = ({ children }: PropType) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, todo])
    }
    const deleteTodo = (id: number) => {
        setTodos((prevTodo) => prevTodo.filter((_, i) => i != id))
    }
    const updateTodo = (id: number, updateField: Partial<Todo>) => {
        setTodos((prevTodod) =>
            prevTodod.map((todo, i) => (
                i == id ? { ...todo, ...updateField } : todo
            ))
        )
    }
    const toogleChecked = (id: number) => {
        setTodos((prevTodos) => {
            return prevTodos.map(t => t.id == id ? { ...t, checked: !t.checked } : t)
        })
    }
    return (
        <TodoContext.Provider value={{ todos,setTodos, addTodo, deleteTodo, updateTodo,toogleChecked }}>
            {children}
        </TodoContext.Provider>
    )
}

