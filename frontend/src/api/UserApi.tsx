import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useMutation } from "react-query"

const backendUrl = import.meta.env.VITE_BACKEND_URL

type PropsData = {
    auth0Id: string,
    email: string
}
export const useCreateUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createUserRequest = async (userdata: PropsData) => {
        try {
            const accessToken = await getAccessTokenSilently()
            const userPayload = {
                auth0Id: userdata.auth0Id,
                email: userdata.email
            }
            const res = await axios.post(`${backendUrl}/api/v1/user/save-user`, userPayload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': "application/json"
                }
            }
            )
        } catch (error) {
            throw new Error("Failed to create user")
        }
    }
    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest)
    return { createUser, isLoading, isError, isSuccess }
}