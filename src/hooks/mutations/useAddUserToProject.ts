import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useAddUserToProject = (projectId: string) => {
    return useMutation(async () => 
        await axios.post()
    )
}