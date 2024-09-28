import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useState } from 'react'

const Profile = () => {
    const { user, logout } = useAuth0()
    const [todoInput, setTodoInput] = useState('')
    
    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInput(event.target.value)
    }
    return (
        <div className='w-full flex-none self-start p-4'>
            <div className='flex justify-between items-center py-4'>
                <div className='text-xl font-bold'>Welcome, {user?.name}</div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
            <div className='flex'>
                <Input value={todoInput} onChange={onChangeHandler} className='h-12 overflow-hidden rounded-none rounded-l-xl rounded-bl-xl bg-white' placeholder='Write a todo..' type='text' />
                <Button className='h-12 rounded-none rounded-br-xl rounded-tr-xl'>Add</Button>
            </div>
        </div>
    )
}

export default Profile