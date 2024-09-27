import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"

const backendUrl = import.meta.env.VITE_BACKEND_URL
const { getAccessTokenSilently, user } = useAuth0()

export const createUser = async () => {
    const accessToken = await getAccessTokenSilently()
    const userPayload = {

    }
    const res = await axios.post(`${backendUrl}`, userPayload, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': "application/json"
        }
    }

    )
}