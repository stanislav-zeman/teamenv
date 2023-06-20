import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import environment from "@/utils/envMetadata";

export function useEnsureUser() {
  return useMutation(async () => {
    await axios
      .post(`${environment}/api/users/auth`)
      .then((res) => {
        console.log('success')
      })
      .catch((res) => {
        console.log(res)
      })
  })
}
