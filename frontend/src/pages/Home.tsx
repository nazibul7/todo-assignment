import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Home = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
    // const loginHandler=
    return (
        <div>
            {isAuthenticated ? (
                <>Welcome {user?.name}
                    <button onClick={() => logout()}>Logout</button></>
            ) : (<>
                <button onClick={async () => await loginWithRedirect()}>Login</button>
            </>)}
        </div>
    )
}

export default Home