import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'

type PropType = {
    children: React.ReactNode
}
const Auth0ProviderNavigate = ({ children }: PropType) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENTID
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE
    return (
        <Auth0Provider domain={domain} clientId={clientId} authorizationParams={{
            redirect_uri: redirectURI,
            audience: audience
        }}>
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderNavigate