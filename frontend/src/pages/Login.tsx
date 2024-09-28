import { useCreateUser } from '../api/UserApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { isAuthenticated, user } = useAuth0()
    const { createUser, isLoading } = useCreateUser()
    const navigate = useNavigate()
    const hasCreatedUser = useRef(false)
    useEffect(() => {
        if (isAuthenticated && !hasCreatedUser.current) {
            createUser({ auth0Id: user?.sub as string, email: user?.email as string })
            hasCreatedUser.current = true
            navigate('/')
        }
    }, [isAuthenticated, user])
    if (isLoading) return <>Loading...</>
}

export default Login