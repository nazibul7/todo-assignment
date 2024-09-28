import { useCreateUser } from '@/api/UserApi'
import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Profile from './Profile'

const Home = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    const { createUser } = useCreateUser()
    const navigate = useNavigate()
    const hasCreatedUser = useRef(false)
    useEffect(() => {
        if (isAuthenticated && !hasCreatedUser.current) {
            createUser({ auth0Id: user?.sub as string, email: user?.email as string })
            hasCreatedUser.current = true
            navigate('/')
        }
    }, [isAuthenticated, user])
    return (
        <div className='min-h-screen flex justify-center items-center'>
            {isAuthenticated ?
                (
                    <Profile/>
                ) :
                (<div className='flex flex-col gap-3'>

                    <div className='font-bold'>
                        Login to create or access todos
                    </div>
                    <Button onClick={async () => await loginWithRedirect({
                        appState:{returnTo:'/login'}
                    })}>
                        Login
                    </Button>
                </div>
                )}
        </div>
    )
}

export default Home