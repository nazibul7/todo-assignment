import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import TodoInput from "../components/TodoInput"
import TodoList from "../components/TodoList"

const Header = () => {
    const { user, logout } = useAuth0()
    return (
        <div className='w-full flex-none self-start p-4'>
            <div className='flex justify-between items-center py-4'>
                <div className='text-xl font-bold'>Welcome, {user?.name}</div>
                <Button onClick={() => logout()}>Logout</Button>
            </div>
            <div>
                <TodoInput />
            </div>
            <div className="my-4 h-px bg-gray-400"></div>
            <div>
                <TodoList />
            </div>
        </div>
    )
}

export default Header