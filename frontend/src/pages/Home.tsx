import { Button } from '@/components/ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'

const Home = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    useEffect(()=>{
        const saveUserData=async()=>{}
    },[])
    return (
        <div className='min-h-screen flex justify-center items-center'>
            {isAuthenticated ?
                (
                    <>Welcome {user?.name}
                        <button onClick={() => logout()}>Logout</button></>
                ) :
                (<div className='flex flex-col gap-3'>
                    <div className='font-bold'>
                        Login to create or access todos
                    </div>
                    <Button onClick={async () => await loginWithRedirect()}>
                        Login
                    </Button>
                </div>
                )}
        </div>
    )
}

export default Home