import React, { useContext, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TodoContext } from '@/context/TodoContext'

const TodoInput = () => {
    const { addTodo } = useContext(TodoContext)
    const [todoInput, setTodoInput] = useState('')

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInput(event.target.value)
    }
    const addTodoHandler=()=>{
        addTodo({})
    }
    return (
        <>
            <div className='flex'>
                <Input value={todoInput} onChange={onChangeHandler} className='h-12 overflow-hidden rounded-none rounded-l-xl rounded-bl-xl bg-white' placeholder='Write a todo..' type='text' />
                <Button className='h-12 rounded-none rounded-br-xl rounded-tr-xl'>Add</Button>
            </div>
        </>
    )
}

export default TodoInput