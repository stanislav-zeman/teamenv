import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useEnsureUser() {
  return useMutation(async () => {
    await axios
      .post('http://localhost:3001/api/users/auth')
      .then((res) => {
        console.log('success')
      })
      .catch((res) => {
        console.log(res)
      })
  })
}
