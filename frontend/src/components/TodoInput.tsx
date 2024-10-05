import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TodoContext } from '@/context/TodoContext'
import { z, ZodError } from "zod"
import { useCreateTodo } from "../api/TodoApi"

const todoSchema = z.object({
    todo: z.string().trim().min(1, { message: "Todo must not be empty" })
})
type Todo = z.infer<typeof todoSchema>

const TodoInput = () => {
    const { createTodo } = useCreateTodo()
    const { addTodo } = useContext(TodoContext)
    const [todoInput, setTodoInput] = useState<Todo>({ todo: "" })
    const [error, setError] = useState('')

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInput({ todo: event.target.value })
    }
    const addTodoHandler = (event: React.FormEvent) => {
        event.preventDefault()
        try {
            todoSchema.parse(todoInput)
            // For context api
            addTodo({ todo: todoInput.todo, checked: false })
            // For backend call
            createTodo({ todo: todoInput.todo })
            setError('')
            setTodoInput({ todo: '' })
        } catch (error) {
            if (error instanceof ZodError) {
                const errMessage = error.errors.map(err => err.message)
                setError(errMessage.join(','))
            }
            else {
                setError("An unexpected error occurred")
            }
        }
    }

    return (
        <>
            <div className='flex'>
                <div className='flex-1'>
                    <Input value={todoInput.todo} onChange={onChangeHandler} className='h-12 overflow-hidden rounded-none rounded-l-xl rounded-bl-xl bg-white' placeholder='Write a todo..' type='text' />
                    {error && <p className='ml-2 text-xs text-red-500'>*{error}</p>}
                </div>
                <Button onClick={addTodoHandler} className='h-12 rounded-none rounded-br-xl rounded-tr-xl'>Add</Button>
            </div>
        </>
    )
}

export default TodoInput