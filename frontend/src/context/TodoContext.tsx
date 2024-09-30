import React, { createContext, useState } from "react"

interface Todo {
    title: string,
    descriptions: string,
    checked: boolean
}
interface TodoContextType {
    todos: Todo[]
    addTodo: (todo: Todo) => void
    deleteTodo: (id: number) => void
    updateTodo: (id: number, updateTodo: Partial<Todo>) => void
}
export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => { },
    deleteTodo: () => { },
    updateTodo: () => { }
})

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([])
    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, todo])
    }
    const deleteTodo = (id: number) => {
        setTodos((prevTodo) => prevTodo.filter((todo, i) => i != id))
    }
    const updateTodo = (id: number, updateField: Partial<Todo>) => {
        setTodos((prevTodod) =>
            prevTodod.map((todo, i) => (
                i == id ? { ...todo, updateField } : todo
            ))
        )
    }
    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

