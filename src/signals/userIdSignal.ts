import { signal } from '@preact/signals-react'

export const userIdSignal = signal<string | undefined>(undefined)

export const setUserId = (id?: string) => {
  userIdSignal.value = id
}

export const getUserId = () => {
  return userIdSignal.value 
}
